import React from 'react'
import InputField from './InputField'

const PostDate = ({handleChange}) => {

    const today = new Date();

    const yesterDay = new Date(today - 24 * 60 * 60 * 1000);
    const yesterWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
    const yesterMonth = new Date(today - 30 * 24 * 60 * 60 * 1000);

    const yesterDate = yesterDay.toISOString().slice(0,10);
    const yesterWeekDate = yesterWeek.toISOString().slice(0,10);
    const yesterMonthDate = yesterMonth.toISOString().slice(0,10);
  return (
    <div className='p-2'>
        <h4 className='text-md font-md mb-3 font-bold'>Date of Posting</h4>
        <div className=''>
            <div className='relative mb-3 ml-3'>
                <label className='block relative cursor-pointer mb-2 select-none'>
                    <input className='absolute cursor-pointer top-1/2 transform -translate-y-1/2 ' type="radio" name='test' id='test' value="" onChange={handleChange} />
                    <span className="ml-8 relative bottom-1 text-sm">All</span>
                </label>
                <InputField handleChange={handleChange} value={yesterDate} title="Last 24 hours" name="test"/>
                <InputField handleChange={handleChange} value={yesterWeekDate} title="Last week" name="test"/>
                <InputField handleChange={handleChange} value={yesterMonthDate} title="Last month" name="test"/>
            </div>
        </div>
    </div>
  )
}

export default PostDate