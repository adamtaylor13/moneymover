export function getCurrentYearAndMonthFromUrl() {
  const url = new URL(window.location.href);
  const pathParts = url.pathname.split("/");
  const year = parseInt(pathParts[pathParts.length - 2]);
  const month = parseInt(pathParts[pathParts.length - 1]);
  if (isNaN(year) || isNaN(month)) {
    throw new Error(
      `Unable to parse year and month from url: ${window.location.href}`
    );
  }
  return { year, month };
}
