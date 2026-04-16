import { useEffect, useState } from "react"
import HabitForm from "./components/HabitForm"
import HabitList from "./components/HabitList"

function App() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits")

    if (savedHabits) {
      return JSON.parse(savedHabits)
    }

    return [
      { id: 1, title: "Boire de l’eau", done: false, days: [] },
      { id: 2, title: "Faire du sport", done: false, days: ["lundi", "mercredi", "vendredi"] },
      { id: 3, title: "Lire 20 min", done: false, days: [] },
      { id: 4, title: "Méditer", done: false, days: ["mardi", "jeudi", "dimanche"] }
    ]
  })

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long"
  })

  const [newHabit, setNewHabit] = useState("")
  const [filter, setFilter] = useState("today")
  const [selectedDays, setSelectedDays] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  const weekDays = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche"
  ]

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits])

  function handleToggleDay(day) {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day))
      return
    }

    setSelectedDays([...selectedDays, day])
  }
  function normalizeText(text) {
    return text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  function handleAddHabit() {
    const trimmedHabit = newHabit.trim()

    if (trimmedHabit === "") {
      setErrorMessage("Veuillez saisir une habitude.")
      return
    }

    const normalizedNewHabit = normalizeText(trimmedHabit)

    const habitAlreadyExists = habits.some(
      (habit) => normalizeText(habit.title) === normalizedNewHabit
    )

    if (habitAlreadyExists) {
      setErrorMessage("Cette habitude existe déjà.")
      return
    }

    const habitToAdd = {
      id: Date.now(),
      title: trimmedHabit,
      done: false,
      days: [...selectedDays]
    }

    setHabits([...habits, habitToAdd])
    setNewHabit("")
    setSelectedDays([])
    setErrorMessage("")
  }

  function handleDeleteHabit(idToDelete) {
    const updatedHabits = habits.filter((habit) => habit.id !== idToDelete)
    setHabits(updatedHabits)
  }

  function handleToggleHabit(idToToggle) {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === idToToggle) {
        return {
          ...habit,
          done: !habit.done
        }
      }

      return habit
    })

    setHabits(updatedHabits)
  }

  const completedHabits = habits.filter((habit) => habit.done).length
  const totalHabits = habits.length

  const filteredHabits = habits.filter((habit) => {
    if (filter === "done") return habit.done
    if (filter === "todo") return !habit.done

    if (filter === "today") {
      if (!habit.days || habit.days.length === 0) {
        return true
      }

      return habit.days.includes(today)
    }

    return true
  })

  return (
    <main className="app">
      <div className="container">
        <h1 className="app-title">Habit Tracker</h1>

        <p className="today-label">Aujourd’hui : {today}</p>

        <p className="habit-counter">
          {completedHabits} habitude{completedHabits > 1 ? "s" : ""} terminée
          {completedHabits > 1 ? "s" : ""} sur {totalHabits}
        </p>

        <div className="filters">
          <button
            className={filter === "today" ? "btn btn-filter active" : "btn btn-filter"}
            onClick={() => setFilter("today")}
          >
            Aujourd’hui
          </button>

          <button
            className={filter === "all" ? "btn btn-filter active" : "btn btn-filter"}
            onClick={() => setFilter("all")}
          >
            Toutes
          </button>

          <button
            className={filter === "todo" ? "btn btn-filter active" : "btn btn-filter"}
            onClick={() => setFilter("todo")}
          >
            À faire
          </button>

          <button
            className={filter === "done" ? "btn btn-filter active" : "btn btn-filter"}
            onClick={() => setFilter("done")}
          >
            Terminées
          </button>
        </div>

        <HabitForm
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          handleAddHabit={handleAddHabit}
          weekDays={weekDays}
          selectedDays={selectedDays}
          handleToggleDay={handleToggleDay}
          errorMessage={errorMessage}
        />

       <HabitList
        habits={filteredHabits}
        handleToggleHabit={handleToggleHabit}
        handleDeleteHabit={handleDeleteHabit}
        filter={filter}
      />
      </div>
    </main>
  )
}

export default App