export function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
