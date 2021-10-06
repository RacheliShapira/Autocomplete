import xlsxFile from "./products.csv";
import { useState, useEffect } from "react";
import "./App.css";
import Papa from "papaparse";

import SearchBar from "./SearchBar.js";
import ShowResults from "./ShowResults.js";

function App() {
  const [searchKey, setSearchKey] = useState();
  const [results, setResults] = useState([]);

  const searchOptions = (e) => {
    setSearchKey(e.target.value.toLowerCase());
    console.log("setSearchKey", e.target.value);
  };

  const checkImage = (src) => {
    var image = new Image();
    image.src = src;
    if (image.width > 0) {
      return src;
    }
  };



  const submitButton = () => {
    console.log("submitted", searchKey);
    setResults([]); //emptying  the results array for the new search
    Papa.parse(xlsxFile, {
      download: true,
      complete: function (papaResults) {
        const db = papaResults.data;
        db.map((x, index) => {
          //filtering  the headers from results
          if (index > 0) {
            var productTitle = db[index][0].toLowerCase();
            //if the key that was search appears in the title
            if (productTitle.search(searchKey) >= 0) {
              // console.log(index, "mpapaResults", db[index]);
              setResults((results) => [...results, db[index]]);
            }
          }
        });
      },
    });
  };

  return (
    <div className="App">
      <SearchBar searchOptions={searchOptions} submitButton={submitButton} />
      <ShowResults results={results} checkImage={checkImage} />
    </div>
  );
}

export default App;
