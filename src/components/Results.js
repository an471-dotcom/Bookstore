import {Card,Rate} from 'antd'
import {Link} from 'react-router-dom'
import "./Results.css";
import {books} from "../books.js"
const Results = ({category,rating,priceMin,priceMax})=>{
    const bookCategory = books[category].filter(x => x.rating >= rating).filter(x => x.inr > priceMin).filter(x => x.inr <= priceMax);
    console.log(bookCategory);
    return (
        <>
        {bookCategory.map((e,i) => {
          return (
            <Card>
            <div style={{ display: "flex" ,gap:"20px"}}>
              <img src={e.image} alt={i} width="200px" ></img>
              <div>
                <h2 className="title">
                  {e.name}
                </h2>
                <Rate allowHalf value={e.rating} disabled={true}></Rate>
                <h2> ₹{e.inr}</h2>
                <p>
                  by {e.author}
                </p>
                <Link to="/product" state={e} className="login">
                Got to Product Page
              </Link>
              </div>
            </div>
          </Card>
          );
        })}
        </>
    )
}
export default Results;