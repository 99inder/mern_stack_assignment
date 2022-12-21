import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from "../redux"

const Cart = ({ showAlert }) => {
  const { cart, total_price } = useSelector(state => state.cartReducer);
  const { increment, decrement, remove, clearCart, cartTotal } = bindActionCreators(actionCreators, useDispatch());

  const navigate = useNavigate();
  const handleClick = () => {
    const user = localStorage.getItem('authToken');
    if (!user) {
      navigate('/login');
    }
    else {
      navigate('/checkout');
    }
  }

  const handleClear = () => {
    clearCart();
    showAlert("Cart Cleared Sucessfully", "success");
  }

  const handleRemoveItem = (id) => {
    remove(id);
    showAlert("Item Deleted Successfully", "success");
  }

  useEffect(() => {
    cartTotal();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {cart.length !== 0 ?
        <div className="h-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-10">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                </div>

                <ul className="card rounded-3 mb-4 d-none d-md-block d-lg-block">
                  <li className="row list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <div className="col-md-2 col-lg-2 col-xl-2 fw-semibold">Product</div>
                    <div className="col-md-3 col-lg-3 col-xl-2 fw-semibold">Name</div>
                    <div className="col-md-3 col-lg-3 col-xl-2 fw-semibold">Quantity</div>
                    <div className="col-md-3 col-lg-2 col-xl-3 offset-lg-1 fw-semibold">Price</div>
                  </li>
                </ul>
                {
                  cart && cart.map(elem => (
                    <div key={elem.id} className="card rounded-3 mb-4">
                      <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={elem.image}
                              className="img-fluid rounded-3" alt="product" />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <div className="d-flex flex-column">
                              <p className="lead fw-normal mb-2">{elem.name}</p>
                              <p className="lead fst-italic mb-2" style={{fontSize: "1rem"}}>{elem.desc}</p>
                            </div>
                          </div>

                          {/* //Quantity */}
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button className='btn btn-primary btn-sm' onClick={() => decrement(elem.id)}>-</button>

                            <input disabled style={{ text: "center" }} id="form1" min="0" name="quantity" value={elem.qty} type="number" className="form-control form-control-sm text-center" />

                            <button className='btn btn-primary btn-sm' onClick={() => increment(elem.id)}>+</button>
                          </div>
                          {/* //Quantity End */}

                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">₹{elem.price}/-</h5>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <button className='btn btn-danger' onClick={() => handleRemoveItem(elem.id)}><i className="fas fa-trash fa-lg"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }

                <div className="d-flex justify-content-between">
                  <div>
                    <Link to='/' type="button" className="btn btn-warning btn-block btn-lg">Continue Shopping</Link>
                  </div>
                  <div>
                    <button type="button" className="btn btn-danger btn-block btn-lg" onClick={handleClear}>Clear Cart</button>
                  </div>
                </div>

              </div>
            </div>
          </div>


          {/* SUMMARY SECTION */}
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="row list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <span className='col-3 text-uppercase'><strong>Name</strong></span>
                  <span className='col-3 text-uppercase'><strong>Price</strong></span>
                  <span className='col-3 text-uppercase'><strong>Quantity</strong></span>
                  <span className='col-3 text-uppercase'><strong>Sub-Total</strong></span>
                </li>
                {
                  cart && cart.map(elem => (
                    <li key={elem.id}
                      className="row list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">

                      <span className='col-3'><strong>{elem.name}</strong></span>
                      <span className='col-3'>₹{elem.price}/-</span>
                      <span className='col-3'>{elem.qty}</span>
                      <span className='col-3'>₹{elem.qty * elem.price}/-</span>
                    </li>
                  ))
                }

                <li
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div className='mt-4'>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including GST)</p>
                    </strong>
                  </div>
                  <span><strong>₹{total_price}/-</strong></span>
                </li>
              </ul>

              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleClick}>
                Go to checkout
              </button>
            </div>
          </div>
        </div >

        :
        <div className="h-100 d-flex justify-content-center align-items-center">
          <p className='fs-3'>Your Cart Is Empty</p>
        </div>
      }
    </>
  )
}

export default Cart