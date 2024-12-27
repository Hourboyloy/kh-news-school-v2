// utils/formatDate.js
export const formatDate = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);

  // Khmer month names
  const khmerMonths = [
    "មករា", // January
    "កុម្ភៈ", // February
    "មីនា", // March
    "មេសា", // April
    "ឧសភា", // May
    "មិថុនា", // June
    "កក្កដា", // July
    "សីហា", // August
    "កញ្ញា", // September
    "តុលា", // October
    "វិច្ឆិកា", // November
    "ធ្នូ", // December
  ];

  // Format time (hh:mm)
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `ម៉ោង ${hours}:${minutes}`;

  // Check if the date is today
  const isToday =
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  if (isToday) {
    return `ថ្ងៃនេះ ${time}`;
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    yesterday.getDate() === date.getDate() &&
    yesterday.getMonth() === date.getMonth() &&
    yesterday.getFullYear() === date.getFullYear();

  if (isYesterday) {
    return `ម្សិលមិញ ${time}`;
  }

  // For other dates (e.g., 2 days ago)
  const timeDifferenceInMillis = now - date;
  const days = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60 * 24));

  if (days < 7) {
    return `${days} ថ្ងៃមុន ${time}`;
  }

  // Fallback: Show full date and time with Khmer month names
  const day = date.getDate();
  const month = khmerMonths[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return `${formattedDate} ${time}`;
};
