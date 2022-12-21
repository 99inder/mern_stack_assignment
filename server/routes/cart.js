import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Order from "../models/Order.js";

const router = express.Router();

//Route 1: POST: '/api/cart/placeorder' Route to place new order (LOGIN REQUIRED)
router.post('/placeorder', fetchuser, async (req, res) => {

    try {
        //destructuring the req.body object to get "title, description, tag"
        const { orderinfo, shipinfo, total_qty, total_price } = req.body;

        //Place a new order and save the data to the database on "carts" collection
        const order = await Order.create({
            orderinfo,
            shipinfo,
            total_qty,
            total_price,
            userid: req.user.id       //contains the user id of the user retrieved from the from the middleware of the user
        })

        return res.send(order);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});

//Route 2: GET: '/api/cart/fetchallorders' Route to Fetch All the orders of a user   (LOGIN REQUIRED)
router.get('/fetchallorders', fetchuser, async (req, res) => {

    try {
        let orders = await Order.find({ userid: req.user.id });
        orders.length ? res.json(orders) : res.send("No Order found for this user");
        return;
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});

//Route 3: DELETE: '/api/cart/cancelorder/:id' Route to cancel an existing order of a user   (LOGIN REQUIRED)
router.delete('/cancelorder/:id', fetchuser, async (req, res) => {

    try {

        //Retrieve the order having id served in the PUT request from the database 
        const orderFound = await Order.findById(req.params.id);

        //if order is not found, return with status code '404': "Not Found"
        if (!orderFound) { return res.status(404).send("Order Not Found") };

        //if orders' user id and accessing user id doesn't match, return "Unauthorized Access"
        if (orderFound.userid.toString() != req.user.id) {
            return res.status(401).send("Unauthorized Access.");
        }

        //Finally cancel the order
        await Order.findByIdAndDelete(req.params.id);

        return res.send("Order Cancelled Successfully!");

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});

export default router;