import { useEffect, useState } from "react"
import HabitForm from "./components/HabitForm"
import HabitList from "./components/HabitList"
import {
  fetchHabits,
  createHabit,
  toggleHabit,
  deleteHabit,
  updateHabit
} from "./services/habitService"

import LoginForm from "./components/LoginForm"
import { getToken, loginUser, removeToken } from "./services/auth"

function App() {
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState("")
  const [filter, setFilter] = useState("today")
  const [selectedDays, setSelectedDays] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [authError, setAuthError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())
  const [editingHabitId, setEditingHabitId] = useState(null)
  const [selectedFilterDay, setSelectedFilterDay] = useState("")

  const today = new Date()
    .toLocaleDateString("fr-FR", { weekday: "long" })
    .toLowerCase()

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
    if (isLoggedIn) {
      loadHabits()
    }
  }, [isLoggedIn])

  function handleEditHabit(habit) {
    setNewHabit(habit.title)
    setSelectedDays(habit.days || [])
    setEditingHabitId(habit.id)
    setErrorMessage("")
  }

  async function handleLogin(credentials) {
    try {
      await loginUser(credentials)
      setIsLoggedIn(true)
      setAuthError("")
      setErrorMessage("")
    } catch (error) {
      setAuthError("Connexion impossible. Vérifie tes identifiants.")
      console.error(error)
    }
  }

  function handleLogout() {
    removeToken()
    setIsLoggedIn(false)
    setHabits([])
    setNewHabit("")
    setSelectedDays([])
    setEditingHabitId(null)
  }

 async function loadHabits() {
    try {
      const data = await fetchHabits()
      setHabits(Array.isArray(data) ? data : [])
      setErrorMessage("")
    } catch (error) {
      setHabits([])
      setErrorMessage("Impossible de charger les habitudes.")
      console.error(error)
    }
  }

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


  async function handleAddHabit() {
    const trimmedHabit = newHabit.trim()

    if (trimmedHabit === "") {
      setErrorMessage("Veuillez saisir une habitude.")
      return
    }

    const normalizedNewHabit = normalizeText(trimmedHabit)

    const habitAlreadyExists = habits.some(
      (habit) =>
        normalizeText(habit.title) === normalizedNewHabit &&
        habit.id !== editingHabitId
    )

    if (habitAlreadyExists) {
      setErrorMessage("Cette habitude existe déjà.")
      return
    }

    try {
      if (editingHabitId) {
        await updateHabit(editingHabitId, {
          title: trimmedHabit,
          days: [...selectedDays]
        })
      } else {
        await createHabit({
          title: trimmedHabit,
          days: [...selectedDays]
        })
      }

      await loadHabits()
      setNewHabit("")
      setSelectedDays([])
      setEditingHabitId(null)
      setErrorMessage("")
    } catch (error) {
      setErrorMessage(
        editingHabitId
          ? "Impossible de modifier l’habitude."
          : "Impossible de créer l’habitude."
      )
      console.error(error)
    }
  }

 async function handleDeleteHabit(idToDelete) {
  try {
    await deleteHabit(idToDelete)
    await loadHabits()

    if (editingHabitId === idToDelete) {
      setNewHabit("")
      setSelectedDays([])
      setEditingHabitId(null)
    }

    setErrorMessage("")
  } catch (error) {
    setErrorMessage("Impossible de supprimer l’habitude.")
    console.error(error)
  }
}
  
  async function handleToggleHabit(idToToggle) {
    try {
      await toggleHabit(idToToggle)
      await loadHabits()
      setErrorMessage("")
    } catch (error) {
      setErrorMessage("Impossible de modifier l’habitude.")
      console.error(error)
    }
  }

  const completedHabits = Array.isArray(habits)
  ? habits.filter((habit) => habit.done).length
  : 0
  const totalHabits = Array.isArray(habits) ? habits.length : 0

  const filteredHabits = Array.isArray(habits)
    ? habits.filter((habit) => {
        if (filter === "done") return habit.done
        if (filter === "todo") return !habit.done

        if (filter === "today") {
          if (!habit.days || habit.days.length === 0) {
            return true
          }

          return habit.days.includes(today)
        }

        if (filter === "day") {
          if (!habit.days || habit.days.length === 0) {
            return true
          }

          return habit.days.includes(selectedFilterDay)
        }

        return true
      })
    : []

    return (
    <main className="app">
      <div className="container">
        <h1 className="app-title">Habit Tracker</h1>

        {!isLoggedIn ? (
          <LoginForm handleLogin={handleLogin} authError={authError} />
        ) : (
          <>
            <div className="app-topbar">
              <div>
                <p className="today-label">Aujourd’hui : {today}</p>
                <p className="habit-counter">
                  {completedHabits} habitude{completedHabits > 1 ? "s" : ""} terminée
                  {completedHabits > 1 ? "s" : ""} sur {totalHabits}
                </p>
              </div>

              <button className="btn btn-logout" onClick={handleLogout}>
                Déconnexion
              </button>
            </div>

            <div className="filters">
              <button
                className={filter === "today" ? "btn btn-filter active" : "btn btn-filter"}
                onClick={() => {setFilter("today") 
                  setSelectedFilterDay("")
                }}
              >
                Aujourd’hui
              </button>

              <button
                className={filter === "all" ? "btn btn-filter active" : "btn btn-filter"}
                onClick={() => {setFilter("all")
                  setSelectedFilterDay("")
                }}
              >
                Toutes
              </button>

              <button
                className={filter === "todo" ? "btn btn-filter active" : "btn btn-filter"}
                onClick={() => {setFilter("todo")
                  setSelectedFilterDay("")
                }}
              >
                À faire
              </button>

              <button
                className={filter === "done" ? "btn btn-filter active" : "btn btn-filter"}
                onClick={() => {setFilter("done")
                  setSelectedFilterDay("")
                }}
              >
                Terminées
              </button>
            </div>
            <p className="section-label">Consulter par jour</p>

            <div className="day-filters">
              {weekDays.map((day) => (
                <button
                  key={day}
                  className={selectedFilterDay === day ? "btn btn-day-filter active" : "btn btn-filter"}
                  onClick={() => {
                    setFilter("day")
                    setSelectedFilterDay(day)
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            <HabitForm
              newHabit={newHabit}
              setNewHabit={setNewHabit}
              handleAddHabit={handleAddHabit}
              weekDays={weekDays}
              selectedDays={selectedDays}
              handleToggleDay={handleToggleDay}
              errorMessage={errorMessage}
              editingHabitId={editingHabitId}
            />

            <HabitList
              habits={filteredHabits}
              handleToggleHabit={handleToggleHabit}
              handleDeleteHabit={handleDeleteHabit}
              handleEditHabit={handleEditHabit}
              filter={filter}
              today={today}
            />
          </>
        )}
      </div>
    </main>
  )
}

export default App