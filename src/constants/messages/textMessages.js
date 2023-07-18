const textMessages = {
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
  recommendSceneTitle: `Here you can find places of interest and attractions, or see upcoming holidays and events in the specified city`,
  taskListTitle: `Below you can see a list of all your tasks.
Click on one of them to change the task, delete it, or set a notification.`,
  emptyTaskList: 'There are no tasks yet',
  taskNotificationSceneTitle: 'Set notification taskId',
  taskOverview: (task) => `
${task.title}

${task.content}
  `,
  weatherOverview: (weatherInfo) => `
Weather in <b>${weatherInfo.name}</b>:
main: <em><b>${weatherInfo.weather[0].main}</b></em>
description: <b>${weatherInfo.weather[0].description}</b>

temperature: <b>${weatherInfo.main.temp}°C</b>
feels like: <b>${weatherInfo.main.feels_like}°C</b>
humidity: <b>${weatherInfo.main.humidity}%</b>
  `,
  taskSceneTitle:
    'Select one of the options below to view your tasks or add another one',
  weatherSceneTitle:
    'Here you can get in the specified city or subscribe to daily weather notifications',
};

export { textMessages };
