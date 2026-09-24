export const renderTodayWorkout = (workout) => {
  let exercisesHtml = '';
  workout.exercises.forEach(ex => {
    exercisesHtml += `
      <div class="flex items-center justify-between" style="padding: var(--spacing-3) 0; border-bottom: 1px solid var(--white-5);">
        <span class="text-primary">${ex.name}</span>
        <span class="text-secondary text-sm">${ex.sets} &times; ${ex.reps}</span>
      </div>
    `;
  });

  return `
    <div class="surface-secondary p-6 rounded-lg js-stagger-card" style="height: 100%; display: flex; flex-direction: column;">
      <h3 class="text-xl font-display mb-4 flex items-center justify-between">
        Today's Workout
        <span class="text-sm text-tertiary" style="font-family: var(--font-body);">${workout.exercises.length} exercises</span>
      </h3>
      <div class="flex-col mb-6" style="flex-grow: 1;">
        ${exercisesHtml}
      </div>
      <a href="#/workout" class="btn btn-primary magnetic-btn" style="text-align: center; display: block; text-decoration: none;">START WORKOUT</a>
    </div>
  `;
};
