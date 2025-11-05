import React from 'react'
import AddNewStudent from './components/AddNewStudent'

const Student = () => {
  return (
    <div>
      <h2 className='flex justify-between items-center font-bold text-2xl p-4 border'> 
        Students <AddNewStudent/>
      </h2>
    </div>
  )
}

export default Student