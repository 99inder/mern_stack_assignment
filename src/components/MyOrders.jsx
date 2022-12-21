import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../redux";

const MyOrders = ({ showAlert }) => {

    const user = localStorage.getItem('authToken');
    const navigate = useNavigate();

    const { fetchOrders, cancelOrder } = bindActionCreators(actionCreators, useDispatch());
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        fetchOrders();
        // eslint-disable-next-line
    }, [])

    const ordersState = useSelector(state => state.myOrdersReducer);

    const cancel = (id) => {
        cancelOrder(id);
        showAlert(`Order: ${id} | Cancelled Successfully`, "success");
    }

    return (

        <div className="accordion" id="accordionExample" >
            {
                ordersState.length !== 0 ? ordersState.map((e, index) => {
                    return (
                        <div className="accordion-item" key={e._id}>
                            <div className="accordion-header" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls="collapseOne">
                                    <strong>Order Id:</strong><span className='mx-2'>{e._id}</span>
                                </button>
                            </div>

                            <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="left">
                                            <div className="total-quantity"><strong>Total Quantity: </strong>{e.total_qty}</div>
                                            <div className="total-price"><strong>Total Price: </strong>₹{e.total_price}</div>
                                        </div>
                                        <div className="right d-flex gap-4">
                                            <div className="shipinfo">
                                                <div className="phone"><strong>Contact No.: </strong>{e.shipinfo.phone}</div>
                                                <div className="address"><strong>Delivery Address: </strong>{e.shipinfo.address}</div>
                                            </div>
                                            <button className="btn btn-danger" onClick={() => cancel(e._id)}>Cancel</button>
                                        </div>
                                    </div>
                                    <div className="items">
                                        {
                                            e.orderinfo.map((e, index) => {
                                                return (
                                                    <div key={e.id} className="my-4">
                                                        <hr />
                                                        <div>
                                                            <strong>Item {index + 1}</strong>
                                                        </div>
                                                        <hr />
                                                        <div className="details d-flex justify-content-between">
                                                            <div>
                                                                <div>
                                                                    <span className='fw-semibold'>Product id: </span>{e.id}
                                                                </div>
                                                                <div>
                                                                    <span className='fw-semibold'>Name: </span>{e.name}
                                                                </div>
                                                                <div>
                                                                    <span className='fw-semibold'>Quantity: </span>{e.qty}
                                                                </div>
                                                                <div>
                                                                    <span className='fw-semibold'>Price: </span>₹{e.price}
                                                                </div>
                                                                <div>
                                                                    <span className='fw-semibold'>Sub-total: </span>₹{e.price * e.qty}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 col-lg-2 col-xl-2 d-none d-md-block d-lg-block">
                                                                <img
                                                                    src={e.image}
                                                                    className="img-fluid rounded-3" alt="product" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) :
                    <div className="h-100 d-flex justify-content-center align-items-center">
                        <p className='fs-3'>You Have No Active Orders</p>
                    </div>
            }
        </div>

    )
}

export default MyOrders