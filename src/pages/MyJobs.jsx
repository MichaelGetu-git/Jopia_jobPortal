import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MyJobs = () => {

    const [jobs, setJobs] = useState([]);
    const [searchJob, setSearchJob] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(()=> {
      setIsLoading(true);
      fetch(`http://localhost:5000/myJobs/michaelgetu21@gmail.com`)
        .then(result => result.json())
        .then(data => {
          setJobs(data)
          setIsLoading(false);
        })
    }, [searchJob]);

    const handleSearchJob = () => {
        const filteredJob = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(searchJob.toLowerCase()) !== -1);

        setJobs(filteredJob);
        setIsLoading(false);
    }

    const indexOfLastItem = currPage * itemsPerPage;
    const indexofFirstItem = indexOfLastItem - itemsPerPage;
    const currJobs = jobs.slice(indexofFirstItem, indexOfLastItem);

    const nextPage = () => {
      if(indexOfLastItem < jobs.length) {
        setCurrPage(currJobs + 1)
      }
    }

    const previousPage = () => {
      if (currPage > 1) {
        setCurrPage(currPage - 1)
      }
    }

    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/job/${id}`, {
          method: "DELETE"
        })
          .then(result => result.json)
          .then(data => {
            if(res.acknowledged === true) {
              alert("Job Posted Successfully!")
            }
          })
    }

    return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-bar rounded:md mt-10'>
        <div>
        <h1 className='font-bold text-center mx-auto p-4'>All Jobs</h1>
          <div className='flex justify-center mt-4'>
            <input type="text" name='search_bar' id='search_bar' className='py-2 pl-3 border border-gray-100 rounded:sm focus:outline-none lg:w-8/12 mb-4 w-full'
              onChange={(event)=> setSearchJob(event.target.value)}
            />
            <button className='bg-blue text-white font-bold px-5 py-2 rounded-sm mb-4 cursor:pointer'
              onClick={handleSearchJob}>
                Search
            </button>
        </div>
          </div>
        <section class= " w-[100%] py-1 bg-blueGray-50 ml-0">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-2">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-blueGray-700">All Jobs</h3>
                </div>
                <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to = '/postJobs'><button class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Post a new Job</button></Link>
                </div>
              </div>
            </div>

            <div class="block w-full overflow-x-auto">
              <table class="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Job Number
                                </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  TITLE
                                </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Company Name
                                </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Salary
                                </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Edit
                                </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Delete
                                </th>
                  </tr>
                </thead> 
                {
                  isLoading ? (<div className='flex items-center justify-center h-20'>
                                        <p>Loading....</p>
                                </div>): (  <tbody> 
                  {
                    jobs.map((jobs,index) => (
                      <tr key={index}>
                      <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {index + 1}
                      </th>
                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {jobs.jobTitle}
                      </td>
                      <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {jobs.companyName}
                      </td>
                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        ${jobs.minPrice} - ${jobs.maxPrice}
                      </td>
                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button className='py-1.5 px-5 border border-solid-5 rounded:sm text-blue font-bold'><Link to={`/edit-job/${jobs?._id}`}>Edit</Link></button>
                      </td>
                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button 
                          className='py-1.5 px-5 bg-red-500 rounded:sm text-white font-semibold'
                          onClick={()=> handleDelete(jobs._id)}>
                            Delete
                        </button>
                      </td>
                    </tr>
  
                    ))
                  }
                 
                </tbody>
)
                }

              </table>
            </div>
          </div>
        </div>
        <div className='flex justify-center mx-auto p-5 '>
                { currPage > 1 && (<button className='py-2 px-5 border-solid-2 text-blue' onClick={previousPage}>Prev</button>)}
                { indexOfLastItem < jobs.length && ( <button className='py-2 px-5 border-solid-2 text-blue' onClick={nextPage}>Next</button>)}
        </div>
        </section>
    </div>
  )
}

export default MyJobs