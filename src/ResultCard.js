
const ResultCard= (props)=>{
    return (
        <div className="resultCard">
          <p> {props.title}</p>
          <p> {props.gtin}</p>
          <p> {props.gender}</p>
          <p> {props.price}</p>
          <p> {props.sale_price}</p>
         
          
        </div>
      );
}

export default ResultCard