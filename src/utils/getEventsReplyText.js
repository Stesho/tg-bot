const getEventsReplyText = (events) => {
  return events.reduce(
    (message, event) => `
${message}
name: <b>${event.name}</b>
date: <em>${event.date}</em>
`,
    '',
  );
};

export default getEventsReplyText;
