export const totalQty = (cart) => {
    let quantity = cart.reduce((initialVal, curElem) => {
        let { qty } = curElem;
        initialVal = initialVal + qty;
        return initialVal;
    }, 0);
    return quantity;
}

export const totalPrice = (cart) => {
    let price = cart.reduce((initialVal, curElem) => {
        let { price, qty } = curElem;
        initialVal = initialVal + (price * qty);
        return initialVal;
    }, 0);
    return price;
}