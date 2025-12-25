export function timeAgo(dateString) {
  if (!dateString) return "Recently posted";

  const posted = new Date(dateString);
  if (isNaN(posted.getTime())) return "Recently posted";

  const now = new Date();
  const diffInSeconds = Math.floor((now - posted) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

/* NEW BADGE LOGIC */
export function isNewJob(dateString) {
  if (!dateString) return false;

  const posted = new Date(dateString);
  if (isNaN(posted.getTime())) return false;

  const now = new Date();
  const diffInHours = (now - posted) / (1000 * 60 * 60);

  return diffInHours <= 24;
}
