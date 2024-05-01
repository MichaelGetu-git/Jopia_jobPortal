import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';


const appliedJobs = () => {

    const [appliedJobs, setAppliedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currPage, setCurrPage] = useState(1);
    const {currentUser} = useAuth();
    const userId = currentUser ? currentUser.uid : null;
    const itemsPerPage = 5;
   
   
    useEffect(()=> {
        const token = localStorage.getItem('firebaseToken');
  
        if(!token) {
          setError("No authentication token found");
          setIsLoading(false);
        };
  
        fetch(`http://localhost:5000/appliedJobs/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
          }
        })
        .then(response => {
          if(!response.ok) {
            throw new Error("Response Error");
          }
          return response.json();
        })
  
        .then(data=> {
          setAppliedJobs(data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
    }, [userId]);

    const indexOfLastItem = currPage * itemsPerPage;
    const indexofFirstItem = indexOfLastItem - itemsPerPage;
    const currJobs = appliedJobs.slice(indexofFirstItem, indexOfLastItem);

    const nextPage = () => {
      if(indexOfLastItem < appliedJobs.length) {
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
          .then(response => response.json())
          .then(data => {
            if(data.acknowledged === true) {
              alert("Job Posted Successfully!")
            }
          })
    }

    console.log(appliedJobs);

  return (
    <div>
         <section class= " w-[100%] py-1 bg-blueGray-50 ml-0">
        <div class="w-full xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-2">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-blueGray-700">Applied Jobs</h3>
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
                    Array.isArray(appliedJobs) && appliedJobs.map((appliedJob,index) => (
                      <tr key={index}>
                      <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {index + 1}
                      </th>
                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {appliedJob.jobTitle}
                      </td>
                      <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {appliedJob.companyName}
                      </td>
                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        ${appliedJob.minPrice} - ${appliedJob.maxPrice}
                      </td>
                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button className='py-1.5 px-5 border border-solid-5 rounded:sm text-blue font-bold'><Link to={`/edit-job/${appliedJob?._id}`}>Edit</Link></button>
                      </td>
                      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button 
                          className='py-1.5 px-5 bg-red-500 rounded:sm text-white font-semibold'
                          onClick={()=> handleDelete(appliedJob._id)}>
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
                { indexOfLastItem < appliedJobs.length && ( <button className='py-2 px-5 border-solid-2 text-blue' onClick={nextPage}>Next</button>)}
        </div>
        </section>
    </div>
  )
}

export default appliedJobs