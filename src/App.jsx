import { useState } from "react"

function App() {
  const [habits, setHabits] = useState([
    { title: "Boire de l’eau", done: false },
    { title: "Faire du sport", done: false },
    { title: "Lire 10 min", done: false },
    { title: "Méditer" , done: false }
  ])

  const [newHabit, setNewHabit] = useState("")

  function handleAddHabit() {
    if (newHabit.trim() === "") {
      return
    }

    const habitToAdd = {
      title: newHabit,
      done: false
    }

    setHabits([...habits, habitToAdd])
    setNewHabit("")
  }

  function handleDeleteHabit(indexToDelete) {
    const updatedHabits = habits.filter((_, index) => index !== indexToDelete)
    setHabits(updatedHabits)
  }

  function handleToggleHabit(indexToToggle) {
    const updatedHabits = habits.map((habit, index) => {
      if (index === indexToToggle) {
        return {
          ...habit,
          done: !habit.done
        }
      }

      return habit
    })

    setHabits(updatedHabits)
  }

  return (
    <div>
      <h1>Habit Tracker</h1>

      <input
        type="text"
        placeholder="Ajouter une habitude"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
      />

      <button onClick={handleAddHabit}>Ajouter</button>

      <ul>
        {habits.map((habit, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={habit.done}
              onChange={() => handleToggleHabit(index)}
            />

            <span
              style={{
                textDecoration: habit.done ? "line-through" : "none",
                color: habit.done ? "gray" : "black"
              }}
            >
              {habit.title}
            </span>

            <button onClick={() => handleDeleteHabit(index)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App