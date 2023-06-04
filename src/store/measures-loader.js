import { measuresActions } from "./measures";

//Function for fetching the data from API (fetch API)
export function fetchDataFromApi() {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.openaq.org/v1/measurements?date_from=2023-05-30T00%3A00%3A00%2B00%3A00&date_to=2023-06-01T16%3A40%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=de&order_by=datetime"
      );
      const data = await response.json();
      return data;
    };

    const measuresFromApi = await fetchData();

    const measures = [];

    for (const key in measuresFromApi.results) {
      measures.push({
        id: key,
        location: measuresFromApi.results[key].location,
        value: measuresFromApi.results[key].value,
        date: measuresFromApi.results[key].date,
        unit: measuresFromApi.results[key].unit,
      });
    }

    dispatch(
      measuresActions.storeData({
        measures: measures || [],
      })
    );
  };
}
