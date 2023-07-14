const messages = {
  greeting: (username) => `Welcome, ${username}`,
  help: `
⏩ /start - Greeting

❓ /help - Bot features description

⛅ /weather - Current weather in the specified city

🐱 /cat - Image of a random cat

🐶 /dog - Image of a random dog

📓 /tasks - Managing my tasks

❗ /recommend - Recommend places, events, attractions
  `,
  askCity: 'Enter the name of the city',
  askTitle: 'Enter a title',
  askContent: 'Enter the text of the content',
  askTime: 'Enter the time in the format hh:mm (e.g. 15:30)',
  askFieldForUpdate: 'Select the field you want to change',
  recommendSceneTitle: `Here you can find places of interest and attractions, or see upcoming holidays and events in the specified city`,
  recommendEvents: '📆 Recommend events',
  recommendPlaces: '🗼 Recommend places',
  taskAddedSuccessfully: 'Task was successfully added ✅',
  taskListTitle: `Below you can see a list of all your tasks.
Click on one of them to change the task, delete it, or set a notification.`,
  emptyTaskList: 'There are no tasks yet',
  notificationCreatedSuccessfully: (hours, minutes) =>
    `You are successfully set notification at ${hours}:${minutes} ✅`,
  taskNotificationSceneTitle: 'Set notification taskId',
  taskOptionsSceneTitle:
    'Click one of the buttons to set a notification, edit a task, delete a task, or return to the previous menu',
  backButton: '⬅ Back',
  taskSetNotification: '📌 Set notification',
  taskEdit: '✏ Edit task',
  taskDelete: '❌ Delete task',
  taskDeletedSuccessfully: 'Task successfully deleted ✅',
  taskSceneTitle:
    'Select one of the options below to view your tasks or add another one',
  taskShow: '⬇ Show my tasks',
  taskAdd: '➕ Add new task',
  taskEditTitle: '✏ Edit Title',
  taskEditContent: '✏ Edit Content',
  emptyMessage: '❗ Empty message. Try again',
  taskUpdatedSuccessfully: 'Task successfully updated ✅',
  serverError: '❗ Server error. Try again later',
  weatherSceneTitle:
    'Here you can get in the specified city or subscribe to daily weather notifications',
  weatherRequest: '⛅ Get weather from city',
  weatherSubscribe: '📌 Subscribe to weather notifications',
  weatherUnsubscribe: '❌ Unsubscribe from weather notifications',
  cityNotFound: '❗ City not found. Try again later',
  invalidTime: '❗ Invalid time',
  userSubscribedSuccessfully: 'You are successfully subscribe ✅',
  loading: 'Loading...',
};

export default messages;