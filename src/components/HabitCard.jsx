import React from 'react'

const HabitCard = ({title,streak}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2" >  🔥 Streak:<span className="font-bold"></span>{streak}</p>
        <button className="mt-4 bg-purple-600 text-white px-3 py-1 rounded">Mark as Done</button>
      </div>
    </div>
  )
}

export default HabitCard
