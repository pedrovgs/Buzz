import moment from "moment";

export function formatTimestamp(timestamp) {
  const jsDate = new Date(timestamp);
  return moment(jsDate).format("MMM Do YYYY");
}
