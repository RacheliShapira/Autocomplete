import ResultCard from "./ResultCard.js";

const ShowResults = ({ results, checkImage }) => {
  return (
    <div className="showResults">
      {results.map((result, index) => (
        <div className="resultCard" key={index}>
          <ResultCard
            title={results[index][0]}
            gtin={results[index][1]}
            gender={results[index][2]}
            sale_price={results[index][3]}
            price={results[index][4]}
            image_link={checkImage(results[index][5])}
            additional_image_link={checkImage(results[index][6])}
          />
        </div>
      ))}
    </div>
  );
};

export default ShowResults;
