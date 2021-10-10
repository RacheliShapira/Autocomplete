const ResultCard = (props) => {
  //checking if there is a there is a sale, if there is not -isSale will be 0 and no sale price will appear
  let isSale = parseFloat(props.sale_price) - parseFloat(props.price);
  return (
    <div className="productCard">
      <div className="title">
        <h3> {props.title}</h3>
      </div>
      <div className="cardInfo">
        <div className="productImg">
          <img src={props.image_link} />
          <img src={props.additional_image_link} />
        </div>
        <div className="productInfo">
          <p style={{ float: "left" }}>Price:</p>
          <p
            style={
              isSale
                ? { textDecoration: "line-through" }
                : { visibility: "hidden" }
            }
          >
            {props.price}
          </p>
          <p style={{ color: "brown" }}>
            {isSale ? "SALE!  " + props.sale_price : props.price}
          </p>

          <p style={{ fontSize: "small" }}> {props.gender}</p>
          <p className="sNumber"> {props.gtin}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
