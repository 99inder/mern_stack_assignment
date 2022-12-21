export const fetchLocal = () => {
    const authToken = localStorage.getItem('authToken') !== 'undefined' ? localStorage.getItem('authToken') : localStorage.clear();
    const userInfo = {
        'authToken': authToken
    };
    return userInfo;
}
export const fetchCart = async () => {

    const data = localStorage.getItem('cart') !== 'undefined' ? localStorage.getItem('cart') : localStorage.removeItem('cart');
    return await JSON.parse(data);

}