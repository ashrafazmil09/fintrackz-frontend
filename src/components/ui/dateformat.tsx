type FormatMode = "date" | "time" | "datetime";

/**
 * Format a date string into a human-readable format.
 *
 * @param dateStr - ISO date string or Date string
 * @param mode - "date" => dd/mm/yyyy
 *               "time" => HH:MM
 *               "datetime" => dd/mm/yyyy HH:MM
 */
export const formatDate = (
  dateStr?: string | null,
  mode: FormatMode = "date",
) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  switch (mode) {
    case "time":
      return `${hours}:${minutes}`;
    case "datetime":
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    case "date":
    default:
      return `${day}/${month}/${year}`;
  }
};
