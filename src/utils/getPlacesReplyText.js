const getPlacesReplyText = (places) => {
  const googleMapLink = `https://maps.google.com/?q=`;

  return places.reduce((message, place) => {
    const kind = place.kinds.split(',')[0].replace('_', ' ');

    return `
${message}
▫ name: <b>${place.name}</b>
▫ kind: <em>${kind}</em>
🌍 <a href="${googleMapLink}${place.point.lat},${place.point.lon}">Look on the map</a>
    `;
  }, '');
};

export { getPlacesReplyText };
