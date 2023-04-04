import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label className='block text-[30px] font-inter font-extrabold text-[#ffffff]'>
          {labelName}
        </label>
        {isSurpriseMe && (
          <button type='button' onClick={handleSurpriseMe} className='font-extrabold text-[20px] font-inter border border-[#0096c7] py-1 px-2 rounded-[5px] text-[#0096c7] outline'>
            SURPRISE ME !
          </button>
        )}
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required className=' font-inter font-extrabold bg-transparent border border-[#0096c7] text-[#0096c7] text-[19px] rounded-lg focus:ring-[#0096c7] focus:border-[#0096c7] outline block w-full p-3'/>
    </div>
  )
}

export default FormField
