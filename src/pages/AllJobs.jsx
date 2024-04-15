import React, {useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Jobs from '../components/Jobs';
import JobCard from '../components/JobCard';
import SideBar from '../components/SideBar';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const AllJobs = ({query, handleInputChange}) => {

  const[allQuery, setAllQuery] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const[selectedAllCategory, setSelectedAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobNumPerPage  = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const allHandleInputChange = (event) => {
    setAllQuery(event.target.value);
    console.log(event.target.value);
  };

  /**
   * http://localhost:5000/all-jobs
   */
  useEffect(()=> {
    setIsLoading(true);
    fetch("jobs.json").then(res =>res.json()).then(data => {
      setAllJobs(data);
      setIsLoading(false);
    })
  }, []);

  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedAllCategory(categoryParam);
    }
  }, [location.search]);


  
  useEffect(() => {
    // Update job count when category changes
    if (selectedAllCategory) {
      const categoryCount = allJobs.filter(
        ({ jobType }) => jobType.toLowerCase() === selectedAllCategory.toLowerCase()
      ).length;
      navigate(`/allJobs?category=${selectedAllCategory}&jobCount=${categoryCount}`);
    }
  }, [selectedAllCategory]);

  const filteredJobCatag = (jobs, selected) => {
    let filteredCatag = jobs;

    if (selected.length > 0) {
      filteredCatag = filteredCatag.filter(({jobType}) => (
        jobType.toLowerCase() === selected.toLowerCase() 
      ));
    }
    return filteredCatag.map((data, i) => <JobCard key = {i} data = {data}/>);
  };
  
  const filteredjobCategory = filteredJobCatag(allJobs, selectedAllCategory);

 
  const handleCatagChange = (category) => {
    setSelectedAllCategory(category);
    setCurrentPage(1); // Reset page number when category changes
      navigate(`/allJobs?category=${category}`);
  };
  
  const handleCatagClick = (category) => {
    setSelectedAllCategory(category);
  };

  const searchedAllJobs = (allQuery) => {
    return allJobs.filter((job) =>job.jobTitle.toLowerCase().indexOf(allQuery.toLowerCase()) !== -1);
  }

   const handleChange = (event) => {
      setSelectedAllCategory(event.target.value)
   }

   const handleClick = (event) => {
      setSelectedAllCategory(event.target.value)
   }

   const PageSize = () => {
      const startIndex = (currentPage-1) * jobNumPerPage;
      const endIndex = startIndex + jobNumPerPage;
      return {startIndex, endIndex};
   }

   const nextpage = ()=> {
    if(currentPage < Math.ceil(searchedAllJobs(allQuery).length / jobNumPerPage)) {
      setCurrentPage(currentPage + 1);
    }
   }

   const previousPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage -1);
    }
   }
   
  const filteredData = (allJobs, selected, allQuery) => {
    let filteredJobs = allJobs;

    if(allQuery) {
      filteredJobs = searchedAllJobs(allQuery);
    }

    if(selected.length >0) {
      filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate})=> (
          jobLocation.toLowerCase() === selected.toLowerCase()  ||
          maxPrice.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) === parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() == selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          new Date(postingDate) >= new Date(selected)
      ));

    }
    const {startIndex, endIndex } = PageSize();
    filteredJobs =  filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <JobCard key = {i} data = {data}/>);
  }

  const result = filteredData(allJobs,selectedAllCategory, allQuery);
  
  
  return (
    <div>
      <div className='flex justify-center pb-8 pt-8'>
        <h1 className='sm:text-3xl lg:text-5xl md:text-4xl font-bold'>
          <span>Find the jobs</span>
          <span className='text-moto'> you desire</span>
        </h1>
      </div>
      <SearchBar query={allQuery} handleInputChange={allHandleInputChange} />
      <div className='bg-bar md:grid grid-cols-4 gap-6 lg:px-24 px-1 py-12'>
        <div className='bg-white p-3 rounded'>
          <SideBar handleChange={handleChange} handleClick={handleClick}/>
        </div>
        <div className='bg-white col-span-2 bg-white p-4 rounded'>
          <div>
            <nav className='flex justify-between p-1 pb-0'>
              <Link to="#" className='md:text-3xl sm:text-1xl lg:text-2xl sm:mt-3 font-bold'>
                <span className='text-primary'>Jobs</span>
              </Link>
              <div className='flex'>
                <h3 className='font-bold lg:mt-3 text-moto'>{result.length} Jobs</h3>          
              </div>
            </nav>
          </div> 
          {isLoading ? (
            <p>Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result}/>
          ) : (
            <div className='p-5 ml-2'>
              <h3 className='font-bold'>No Jobs Found</h3>
              <p>There are no jobs matching the current criteria.</p>
            </div>
          )}
          {result.length > 0 && (
            <div className='flex justify-center mx-auto p-5 '>
              <button onClick={previousPage} className='px-5 py-1 border border-moto rounded mr-3 bg-moto text-white font-bold' disabled={currentPage === 1}>Prev</button>
              <button>page {currentPage} of {Math.ceil(searchedAllJobs(allQuery).length / jobNumPerPage)}</button>
              <button onClick={nextpage} disabled={currentPage === Math.ceil(searchedAllJobs(allQuery).length / jobNumPerPage) || result.length < jobNumPerPage} className='px-5 py-1 border border-moto rounded ml-3 bg-moto text-white font-bold'>Next</button>
          </div>
          )}
          {selectedAllCategory && (
            <div>
              <h2>Showing jobs in category: {selectedAllCategory}</h2>
              {filteredjobCategory.length > 0 ? (
                <Jobs result={filteredjobCategory} />
              ) : (
                <div className='p-5 ml-2'>
                  <h3 className='font-bold'>No Jobs Found</h3>
                  <p>There are no jobs in this category.</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className='bg-white p-4 rounded'>Right</div>
      </div>
    </div>
  );
  
}

export default AllJobs
