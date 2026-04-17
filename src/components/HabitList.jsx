import HabitItem from "./HabitItem"

function HabitList({ habits, handleToggleHabit, handleDeleteHabit, handleEditHabit, filter, today }) {
  if (habits.length === 0) {
    let emptyMessage = "Aucune habitude à afficher."

    if (filter === "today") {
      emptyMessage = "Aucune habitude prévue aujourd’hui."
    }

    if (filter === "done") {
      emptyMessage = "Aucune habitude terminée."
    }

    if (filter === "todo") {
      emptyMessage = "Aucune habitude à faire."
    }

    return <p className="empty-message">{emptyMessage}</p>
  }

  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <HabitItem
            key={habit.id}
            habit={habit}
            handleToggleHabit={handleToggleHabit}
            handleDeleteHabit={handleDeleteHabit}
            handleEditHabit={handleEditHabit}
            today={today}
            />
      ))}
    </ul>
  )
}

export default HabitList