import React from 'react'

const HabitCard = ({title,streak,resetStreak,markDone,deleteHabit}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      
      <div >
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="text-gray-600 mt-2" >  🔥 Streak:<span className="font-bold"></span>{streak}</p>
        <button onClick={markDone} className="mt-4 bg-purple-600 text-white px-3 py-1 rounded">Done</button>
        <button onClick={resetStreak} className="mt-4 bg-purple-600 text-white px-3 py-1 rounded">Reset</button>
        <button onClick={deleteHabit} className="mt-4 bg-purple-600 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  )
}

export default HabitCard
