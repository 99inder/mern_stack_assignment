import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../redux";
import { useSelector } from "react-redux";

const Checkout = ({showAlert}) => {

    const { cart, total_item, total_price } = useSelector(state => state.cartReducer);

    const { placeOrder, clearCart } = bindActionCreators(actionCreators, useDispatch());

    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('authToken');

        if (!user) {
            navigate('/cart');
        }
        // eslint-disable-next-line
    }, [])

    const [shipInfo, setShipInfo] = useState({ phone: '', address: '' });
    const onChange = (e) => {
        setShipInfo({ ...shipInfo, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        placeOrder(cart, shipInfo, total_item, total_price);
        setShipInfo({ phone: '', address: '' });
        clearCart();
        showAlert("Order Placed Successfully", "success");
        navigate('/');
    }
    return (
        <form onSubmit={handleClick}>
            <div className="h-100 d-flex justify-content-center align-items-center">
            <p className='fs-3'>Order Checkout</p>
        </div>
            {/* <!-- Number input --> */}
            <div className="form-outline mb-4">
                <input type="text" id="form6Example6" pattern="\d*" className="form-control" name='phone' value={shipInfo.phone} onChange={onChange} minLength={8} maxLength={10} required />
                <label className="form-label" htmlFor="form6Example6">Phone</label>
            </div>

            {/* <!-- Message input --> */}
            <div className="form-outline mb-4">
                <textarea className="form-control" id="form6Example7" rows="4" name='address' value={shipInfo.address} onChange={onChange} minLength={8} maxLength={50} required></textarea>
                <label className="form-label" htmlFor="form6Example7">Address</label>
            </div>

            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-primary btn-block mb-4">Place order</button>
        </form>
    )
}

export default Checkout