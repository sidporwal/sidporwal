import { useEffect, useState } from "react";
import { fetchUserAccessToken, fetchSearchTextOutput, debounce } from "./utils";
import "./App.css";

function App() {
  const [loadinguserAccessToken, setLoadingUserAccessToken] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchUserAccessToken({ setLoadingUserAccessToken });
  }, []);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    fetchSearchTextOutput({ text: e.target.value, setStockData });
  };

  const token = localStorage.getItem("token");

  return (
    <div className="App">
      {loadinguserAccessToken && <p>We are fetching User Token</p>}
      {!loadinguserAccessToken && token && (
        <input
          type="text"
          id="search"
          name="search"
          value={searchText}
          onChange={handleSearchTextChange}
        ></input>
      )}
      <ul>
        {stockData?.map((data, index) => (
          <li className="data" key={data[0]}>
            <span>#</span>
            <p>name: {data[0]}</p>
            <p>HIGH: {data[1]}</p>
            <p>LOW: {data[2]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
