import jwt from "jsonwebtoken";

const jwtKey = process.env.JWT_KEY;

const fetchuser = (req, res, next) => {

    //Get user from the jwt auth-token and add id to the req object
    const token = req.header('authToken');

    if (!token) {
        return res.status(401).send("Please authenticate using a valid token.")
    }

    try {
        const data = jwt.verify(token, jwtKey);
        req.user = data.user
        next();
    } catch (error) {
        return res.status(401).send("Please authenticate using a valid token.")
    }
}

export default fetchuser;