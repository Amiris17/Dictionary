import React, { useState } from "react";
import "./index.css"; // Import your updated CSS

function App() {
  const [word, setWord] = useState(""); // State to hold the searched word
  const [definition, setDefinition] = useState(""); // State to hold the word's definition
  const [synonyms, setSynonyms] = useState([]); // State to hold synonyms
  const [loading, setLoading] = useState(false); // State to track loading status

  function fetchData() {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    // Set loading to true first to trigger a re-render with the spinner
    setLoading(true);
    setDefinition(''); // Clear definition to ensure smooth loading state
    setSynonyms([]); // Clear synonyms

    setTimeout(() => {
      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Word not found");
          }
          return res.json();
        })
        .then((data) => {
          // Delay to ensure spinner stays for at least 1 second
          setTimeout(() => {
            setDefinition(data[0].meanings[0].definitions[0].definition);
            setSynonyms(data[0].meanings[0].synonyms);
            setLoading(false); // Set loading to false after data is fetched
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            setDefinition("Error: " + error.message);
            setSynonyms([]);
            setLoading(false); // Set loading to false after the delay
          }, 1000);
        });
    }, 300); // Slight delay before fetch
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Dictionary</h1>

      <div className="search-container">
        <input
          className="search-input"
          placeholder="Enter a word..."
          onChange={(event) => setWord(event.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              fetchData();
            }
          }}
        />
        <button className="search-button" type="button" onClick={fetchData}>
          Search
        </button>
      </div>

      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="result-container">
        {definition && <p className="definition"><strong>Definition:</strong> {definition}</p>}
        {synonyms.length > 0 && (
          <div className="synonyms">
            <p><strong>Synonym(s):</strong></p>
            <ul>
              {synonyms.map((synonym, idx) => (
                <li key={idx}>{synonym}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
