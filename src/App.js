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
    setSearchKey(e.target.value);
    console.log("setSearchKey", e.target.value);
  };

  const submitButton = () => {
    console.log("submitted", searchKey);
    Papa.parse(xlsxFile, {
      download: true,
      complete: function (papaResults) {
        const db = papaResults.data;
        db.map((x, i) => {
          var productTitle = db[i][0];
          //if the key that was search appears in the title
          if (productTitle.search(searchKey) >= 0) {
            console.log(i, "mpapaResults", db[i][0]);
          }
        });
      },
    });
  };

  return (
    <div className="App">
      <SearchBar searchOptions={searchOptions} submitButton={submitButton} />
      <ShowResults />
    </div>
  );
}

export default App;
