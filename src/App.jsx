import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    fetch("/api/motogp-standings")
      .then((response) => response.json())
      .then((data) => setStandings(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <></>;
}

export default App;
