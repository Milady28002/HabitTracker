function HabitItem({ habit, handleToggleHabit, handleDeleteHabit }) {
  const hasAllDays = habit.days && habit.days.length === 7

  return (
    <li className="habit-item">
      <div className="habit-main">
        <label className="habit-content">
          <input
            className="habit-checkbox"
            type="checkbox"
            checked={habit.done}
            onChange={() => handleToggleHabit(habit.id)}
          />

          <span className={habit.done ? "habit-text done" : "habit-text"}>
            {habit.title}
          </span>
        </label>

        <p className="habit-days">
          {!habit.days || habit.days.length === 0
            ? "Tous les jours"
            : hasAllDays
            ? "Tous les jours"
            : habit.days.join(" • ")}
        </p>
      </div>

      <button
        className="btn btn-delete"
        onClick={() => handleDeleteHabit(habit.id)}
      >
        Supprimer
      </button>
    </li>
  )
}

export default HabitItem