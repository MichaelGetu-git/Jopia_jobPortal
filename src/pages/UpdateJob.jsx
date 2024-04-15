import {React, useState} from 'react'
import {useParams, useLoaderData, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form' 
import CreatableSelect from 'react-select/creatable'

const UpdateJob = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const {_id, jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, 
        postingDate, experienceLevel, companyLogo, employmentType,jobType, description, postedBy, skills} = useLoaderData();

        const [jobData, setJobData] = useState(null);
   
        const [selectedSkill, setSelectedSkill] = useState(null);
        const {
           register,
           handleSubmit,
           reset,
           formState: { errors},
        } = useForm ();
     
      
        const onSubmit = (data) => {
         data.skills = selectedSkill;
         fetch(`http://localhost:5000/update-job/${id}`, {
           method: "PATCH",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify(data)
         }).then(result => result.json()).then((res)=> {
           console.log(res);
           if(res.acknowledged === true) {
             alert("Job updated Successfully!")
             
           }
           reset();
         }) 
       };
     
        const skillOptions = [ 
           {value: "C++", label: "C++"},
           {value: "Java", label: "Java"},
           {value: "HTML", label: "HTML"},
           {value: "CSS", label: "CSS"},
           {value: "JavaScript", label: "JavaScript"},
           {value: "React", label: "React"},
           {value: "Python", label: "Python"},
           {value: "Mysql", label: "Mysql"},
         
        ]
     
  return (
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-10 flex justify-center'>
      <div className='bg-bar py-10 px-4 lg:px-16 w-[80%] rounded:sm'>
      <div className='flex justify-center lg:text-4xl sm:text-2xl md:text-3xl font-bold mx-auto mb-8'><h1 className=''>Update Job</h1></div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Title</label>
              <input type="text" defaultValue={jobTitle} {...register("jobTitle")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Company Name</label>
              <input type="text" defaultValue={companyName} {...register("companyName")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Minimum Salary</label>
              <input type="num" defaultValue={minPrice} {...register("minPrice")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>maximum Salary</label>
              <input type="text" defaultValue={maxPrice} {...register("maxPrice")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Salary Type</label>
              <select {...register("salaryType")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'>
                  <option value={salaryType}>{salaryType}</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Monthly">Montly</option>
                  <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Location</label>
              <input type="text" defaultValue={jobLocation} {...register("jobLocation")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Posting Date</label>
              <input type="date" defaultValue={postingDate} {...register("postingDate")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Experience Level</label>
              <select {...register("experienceLevel")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'>
                  <option value={experienceLevel}>{experienceLevel}</option>
                  <option value="Any experience">Any experience</option>
                  <option value="Internship">Internship</option>
                  <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>Required Skill Sets</label>
              <CreatableSelect
              className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6' 
                  defaultValue={skills} 
                  onChange={setSelectedSkill} 
                  options = {skillOptions} 
                  isMulti
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Company Logo</label>
              <input type="url" defaultValue={companyLogo} {...register("companyLogo")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg font-semibold'>Employment Type</label>
              <select {...register("employmentType")} className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'>
                  <option value={employmentType}>{employmentType}</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Full-time">Full-time</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Type</label>
              <input type="text" defaultValue={jobType} {...register("jobType")}
              className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>Description</label>
              <textarea className='w-full pl-3 pl-3 py-1.5 focus:outline-none placeholder:text-gray-400' 
                    {...register("description")} rows={6}
                  placeholder= "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."
                  defaultValue={description}>
              </textarea>
            </div>
          </div>
          
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='lg:w-full w-full'>
              <label className='block mb-2 text-lg font-semibold'>Job Poster</label>
              <input type="email" defaultValue={postedBy} {...register("postedBy")}
              className='block w-full  flex-1 border-1 bg-white py-1.5 pl-3 text-gray-800 placeholder:text-grey-400
              focus:outline-none sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <input className='block mt-12 px-5 py-2 bg-blue text-white text-white rounded:sm cursor-pointer' type='submit'/>
        </form>
      </div>
    </div>
  );
}

export default UpdateJob