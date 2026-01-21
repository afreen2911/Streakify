import { useState, useEffect } from "react";

export default function Dashboard() {
  // ================= GLOBAL STREAK STATE =================
  const [streaks, setStreaks] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0,

    lastDailyReset: null,
    lastWeeklyReset: null,
    lastMonthlyReset: null,
  });

  // ================= HABITS =================
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");

  // ================= DATE HELPERS =================
  function todayString() {
    return new Date().toISOString().split("T")[0];
  }

  function getWeekKey(date = new Date()) {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstDay) / 86400000);
    return Math.ceil((days + firstDay.getDay() + 1) / 7);
  }

  function getMonthKey(date = new Date()) {
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }

  // ================= RESET CHECK =================
  function checkAndResetStreaks() {
    const now = new Date();
    const today = todayString();
    const currentWeek = getWeekKey(now);
    const currentMonth = getMonthKey(now);

    setStreaks((prev) => {
      let updated = { ...prev };

      // Daily reset
      if (prev.lastDailyReset !== today) {
        updated.daily = 0;
        updated.lastDailyReset = today;
      }

      // Weekly reset (Sunday)
      if (now.getDay() === 0 && prev.lastWeeklyReset !== currentWeek) {
        updated.weekly = 0;
        updated.lastWeeklyReset = currentWeek;
      }

      // Monthly reset (1st day)
      if (now.getDate() === 1 && prev.lastMonthlyReset !== currentMonth) {
        updated.monthly = 0;
        updated.lastMonthlyReset = currentMonth;
      }

      return updated;
    });
  }

  // Run reset check on load
  useEffect(() => {
    checkAndResetStreaks();
  }, []);

  // ================= ADD HABIT =================
  function addHabit() {
    if (!habitName.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: habitName,
      lastCompletedDate: null,
    };

    setHabits([...habits, newHabit]);
    setHabitName("");
  }

  // ================= DONE LOGIC =================
  function markDone(id) {
    checkAndResetStreaks();
    const today = todayString();
    let alreadyDone = false;

    const updatedHabits = habits.map((habit) => {
      if (habit.id !== id) return habit;

      if (habit.lastCompletedDate === today) {
        alreadyDone = true;
        return habit;
      }

      return {
        ...habit,
        lastCompletedDate: today,
      };
    });

    if (alreadyDone) {
      alert("Already marked done today!");
      return;
    }

    setHabits(updatedHabits);

    setStreaks((prev) => ({
      ...prev,
      daily: prev.daily + 1,
      weekly: prev.weekly + 1,
      monthly: prev.monthly + 1,
      total: prev.total + 1,
    }));
  }

  // ================= RENAME HABIT =================
  function renameHabit(id) {
    const newName = prompt("Enter new habit name:");
    if (!newName || !newName.trim()) return;

    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, name: newName.trim() }
          : habit
      )
    );
  }

  // ================= DELETE HABIT =================
  function deleteHabit(id) {
    setHabits(habits.filter((habit) => habit.id !== id));
  }

  function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/";
}

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">

        <div className="flex items-center justify-between mb-8">
  <h1 className="text-2xl font-bold text-gray-800">
    Dashboard
  </h1>

  <button
    onClick={handleLogout}
    className="bg-purple-700 hover:bg-gray-900 text-white px-4 py-2 rounded transition"
  >
    Logout
  </button>
</div>

        {/* ===== STREAK SUMMARY ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-purple-200 border border-gray-200 p-5 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-black-500">Daily Streak</p>
            <h2 className="text-2xl font-bold text-black-600">
              {streaks.daily}
            </h2>
          </div>

          <div className="bg-purple-200 border-gray-200 p-5 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-black-500">Weekly Streak</p>
            <h2 className="text-2xl font-bold text-black-600">
              {streaks.weekly}
            </h2>
          </div>

          <div className="bg-purple-200 border border-gray-200 p-5 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-black-500">Monthly Streak</p>
            <h2 className="text-2xl font-bold text-black-600">
              {streaks.monthly}
            </h2>
          </div>

          <div className="bg-purple-200 border border-grey-200 p-5 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-black-500">Total Streak</p>
            <h2 className="text-2xl font-bold text-black-600">
              {streaks.total}
            </h2>
          </div>
        </div>

        {/* ===== ADD HABIT ===== */}
        <div className="bg-purple-100 border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-semibold mb-4 text-gray-800">
            Add Habit
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Habit name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={addHabit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* ===== HABITS LIST ===== */}
        <div className="space-y-4">
          {habits.length === 0 ? (
            <p className="text-gray-1000">
              No habits added yet.
            </p>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  {habit.name}
                </h3>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => markDone(habit.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition"
                  >
                    Done
                  </button>

                  <button
                    onClick={() => renameHabit(habit.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition"
                  >
                    Rename
                  </button>

                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
