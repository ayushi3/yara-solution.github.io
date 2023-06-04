import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "./store/measures-loader";
import UI from "./components/UI";

function App() {
  //For performing actions in reducer in central hub, Redux
  const dispatch = useDispatch();

  //For fetching the data only once from fetch API
  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, [dispatch]);

  return (
    <div className="App">
      <UI />
    </div>
  );
}

export default App;
