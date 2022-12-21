import React from 'react'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../redux";

const Card = (props) => {
    const { product, showAlert } = props;

    const dispatch = useDispatch();
    const { addToCart } = bindActionCreators(actionCreators, dispatch);

    const handleClick = () => {
        addToCart(product);
        showAlert("Product added to cart Successfully", "success");
    }

    return (
        <div className="card" style={{ "width": "20rem"}}>
            <img src={product.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.desc}</p>
                <p className="card-text fw-semibold">Price: <span style={{color: "#0cad0c"}}>₹{product.price}/-</span></p>
                <button className="btn btn-primary rounded-circle" onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
            </div>
        </div>
    )
}

export default Card