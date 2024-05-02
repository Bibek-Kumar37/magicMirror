export function getFormattedDate(month, day) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[month - 1]}, ${day}<sup>th</sup>`;
}