// props to update the number of completed tasks out of the total number of tasks
function TaskHero({ tasks_completed, total_tasks }) {
  return (
    <section className="taskhero_section">
      <div>
        <p>Manage Your Tasks</p>
      </div>
      <div>
        {tasks_completed}/{total_tasks}
      </div>
    </section>
  );
}
export default TaskHero;