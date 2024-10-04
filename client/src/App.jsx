import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [riderData, setRiderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentStandings = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "http://localhost:8080/api/current-motogp-standings"
    );
    setRiderData(data.standings);
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentStandings();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        riderData.map((rider) => (
          <div key={uuidv4()}>
            <h1>
              {rider.riderNumber} {rider.riderName}
            </h1>
            <img src={rider.picture} alt={rider.riderName}></img>
            <p>Points: {rider.points}</p>
            <p>Team: {rider.team}</p>
            <p></p>
          </div>
        ))
      )}
    </>
  );
}

export default App;
