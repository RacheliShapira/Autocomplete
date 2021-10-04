
import xlsxFile from './products.csv';
import { useState, useEffect  } from 'react';
import './App.css';
import Papa from "papaparse";

function App() {
  const [searchKey, setSearchKey] = useState();
  const [results, setResults] = useState();



const searchOptions= (e)=>{
  setSearchKey(e.target.value)
  console.log("setSearchKey",e.target.value);
}

const submitButton= ()=>{console.log("submitted",searchKey);
  Papa.parse(xlsxFile, {
    download: true,
    complete: function(papaResults) {
      const db=papaResults.data;
      db.map((x,i)=>{
        var productTitle=db[i][0]
        if (productTitle.search(searchKey)>=0) { //if the key that was search appears in the title
          console.log(i,"mpapaResults",db[i][0]);
        }
      
      })
     
    }
  });
}


  return (
    <div className="App">
      <div className="searchBar">
        <h2>I am looking for:</h2>
        <input type="text" onChange={searchOptions} />
        <button type="submit" onClick={submitButton}>
          Search
        </button>
      </div>
      <div className="showResults">

      </div>
     



    </div>
  );
}

export default App;
