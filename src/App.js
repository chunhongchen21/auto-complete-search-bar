import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const REST_API = "https://dummyjson.com/recipes/search?q=";
  const [value, setValue] = useState("");
  const [recipt, setRecipt] = useState([]);

  // store in a cache
  const [cache, setCache] = useState({});
  // I want to store the results which has already got in an object,
  // Which would be an array of key-value pair

  async function fetchData() {
    if (cache[value]) {
      console.log("CACHE RETURNED");
      setRecipt(cache[value]);
      return;
    }
    console.log(`API CALL ${value}`);
    const res = await fetch(`${REST_API}${value}`);
    const recipes = await res.json();
    setRecipt(recipes.recipes);
    setCache((prev) => ({
      ...prev,
      [value]: recipes.recipes,
    }));
  }
  useEffect(() => {
    // debouncer
    const timer = setTimeout(() => fetchData(), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return (
    <div className="App">
      <h1>Hello auto complete search bar!</h1>
      <div className="search-box">
        <input
          className="input-box"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        {recipt && (
          <div className="results-container">
            {recipt.map((r) => (
              <span className="results-item" key={r.id}>
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
