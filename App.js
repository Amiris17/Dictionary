
import React, { useState} from "react";
//import axios from "axios";
import "./index.css";

//fetch ("https://api.dictionaryapi.dev/api/v2/entries/en/<>")
//.then((res)=> res.json())
//.then((data)=>{
//console.log(data);
//});

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [synonyms, setSynonyms] = useState([]);
 
  //const [wotd, setWOTD] = useState("");
  // const [antonym,setAntonym]=useState('');

  //Axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello").then((res)=>{
  //console.log(res.data);
  const dictionary = "Mir's Dictionary";
  // const options = {
  //   method: "GET",
  //   url: "https://wordoftheday2.p.rapidapi.com/words/2020-03-24",
  //   headers: {
  //     "X-RapidAPI-Key": "eaaca8c204mshdb3053270083268p1aaf7bjsnf626cd295d86",
  //     "X-RapidAPI-Host": "wordoftheday2.p.rapidapi.com",
  //   },
  // };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //     setWOTD(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  //}

  function fetchData() {
    var Combine = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    //console.log(Combine);
    fetch(Combine).then((res) =>
      res.json().then((data) => {
        console.log(data[0]);
        setDefinition(data[0].meanings[0].definitions[0].definition);
        setSynonyms(data[0].meanings[0].synonyms);
        //console.log(data[0].meanings[0]) has no antonyms on API
      })
    );
  }

  return (
    <>
      <body>
        <div className="app">
          <h1> {dictionary}</h1>
        </div>
        <div className="Search">
          <input
            placeholder="Enter Word!"
            onChange={(event) => {
              setWord(event.target.value);
            }}
            onKeyPress={(e)=>{
              var key=e.keycode|| e.which;
              if (key===13)
              {fetchData()}
              //console.log("Works")
            }}
          ></input>
          <button type="button" onClick={fetchData}>
            Search
          </button>
          <br />
          <br />
          <p>Definition: {definition} </p>
          <p>
            {synonyms.map((synonym, idx) => {
              return <p>Synonym:{synonym}</p>;
            })}
          </p>
          You entered!!! : {word}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p> If there are no results, either the word you entered is incorrect or there are no definitions for this word currently! Thank you!</p>
      </body>
    </>
  );
}

export default App;
