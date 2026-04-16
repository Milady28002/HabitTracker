import { useRef } from "react"

function HabitForm({
  newHabit,
  setNewHabit,
  handleAddHabit,
  weekDays,
  selectedDays,
  handleToggleDay,
  errorMessage
}) {
  const inputRef = useRef(null)

  function handleAddHabitWithFocus() {
    handleAddHabit()
    inputRef.current.focus()
  }

  return (
    <div className="habit-form-wrapper">
      <div className="habit-form">
        <input
          ref={inputRef}
          className="habit-input"
          type="text"
          placeholder="Ajouter une habitude"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleAddHabitWithFocus()
            }
          }}
        />

        <button className="btn btn-add" onClick={handleAddHabitWithFocus}>
          Ajouter
        </button>
      </div>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <div className="days-selector">
        {weekDays.map((day) => (
          <label key={day} className="day-option">
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleToggleDay(day)}
            />
            <span>{day}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default HabitForm