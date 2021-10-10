import xlsxFile from "./products.csv";
import { useState } from "react";
import "./App.css";
import Papa from "papaparse";

import SearchBar from "./SearchBar.js";
import ShowResults from "./ShowResults.js";

function App() {
  // const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState();
  const [isAutocomplete, setIsAutocomplete] = useState(false);
  const [searchTitles, setSearchTitles] = useState([]);
  const [results, setResults] = useState([]);
  const [resultPages, setResultPages] = useState(0);
  const maxResultsPerPage=100;
  const [currentPage, setCurrentPage] = useState(1);
  

  const searchOptions = (e) => {
    console.log(" e.target.value", e.target.value);
    //reset isAutocomplete
    setIsAutocomplete(false);
    setSearchTitles([]);
    //make sure seacrh key isn't empty

    if (e.target.value.match(/^\s+$/) === null) {
      let input = e.target.value.toLowerCase();
      setSearchKey(input);
      //auto compleate
      Papa.parse(xlsxFile, {
        download: true,
        complete: function (papaResults) {
          papaResults.data.map((x, index) => {
            //pushing all the products titles to array for the search
            if (index > 0) {
              var title = papaResults.data[index][0].toLowerCase();
              if (title.startsWith(input)) {
                setIsAutocomplete(true);
                setSearchTitles((searchTitles) => [...searchTitles, title]);
              }
            }
          });
        },
      });
    }
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
    //reset isAutocomplete
    setIsAutocomplete(false);
    setResults([]); //emptying  the results array for the new search
    Papa.parse(xlsxFile, {
      download: true,
      complete: function (papaResults) {
        const db = papaResults.data;
        let resultsCount=0
        db.map((x, index) => {
          //filtering  the headers from results
          if (index > 0) {
            
            var productTitle = db[index][0].toLowerCase();
            //if the key that was search appears in the title
            if (productTitle.search(searchKey) >= 0) {
              resultsCount++
              // console.log(index, "mpapaResults", db[index]);
              setResults((results) => [...results, db[index]]);
            }
          }
        });
        console.log("!!count!!",resultsCount);
        console.log("ceil", Math.ceil(resultsCount/maxResultsPerPage));
        setResultPages(Math.ceil(resultsCount/maxResultsPerPage))
        
      },
    });
  };

  const WhatPage=(PageNum)=>{
    setCurrentPage(PageNum)
    console.log("PageNum * maxResultsPerPage ",currentPage, maxResultsPerPage, currentPage * maxResultsPerPage );
  }

  return (
    <div className="App">
      <SearchBar
        searchOptions={searchOptions}
        submitButton={submitButton}
        isAutocomplete={isAutocomplete}
        searchTitles={searchTitles}
      />
      <ShowResults results={results.slice(((currentPage * maxResultsPerPage )-maxResultsPerPage),(currentPage * maxResultsPerPage ))} checkImage={checkImage} resultPages={resultPages}/>
       <div className="paging"> {resultPages>1 && [...Array(resultPages)].map((e, i) =><p key={i} 
       onClick={() =>WhatPage(i+1)}
       style={
        currentPage===i+1
          ? { color: "rgb(161, 9, 161)" }
          : { color: "black" }
      }>Page {i+1 } </p> )}   </div>
    </div>
  );
}

export default App;
