const repliesMessages = {
  askCity: 'Enter the name of the city',
  askTitle: 'Enter a title',
  askContent: 'Enter the text of the content',
  askTime: 'Enter the time in the format hh:mm (e.g. 15:30)',
  askFieldForUpdate: 'Select the field you want to change',
  taskAddedSuccessfully: 'Task was successfully added ✅',
  notificationCreatedSuccessfully: (hours, minutes) =>
    `You are successfully set notification at ${hours}:${minutes} ✅`,
  taskDeletedSuccessfully: 'Task successfully deleted ✅',
  taskUpdatedSuccessfully: 'Task successfully updated ✅',
  userSubscribedSuccessfully: 'You are successfully subscribe ✅',
  loading: 'Loading...',
  invalidTime: '❗ Invalid time',
  unknownCommand: '❗ Unknown command',
  invalidTitle: '❗ Invalid title',
  invalidContent: '❗ Invalid content',
};

export default repliesMessages;
