import express from "express";                                  //express import to create an express app
import { body, validationResult } from 'express-validator';     //import for express validator
import User from "../models/User.js";                           //import for 'user' model that we created
import bcrypt from 'bcryptjs';                                  //import for password encryption
import jwt from 'jsonwebtoken';                                 //import for json-web-token
import fetchuser from "../middleware/fetchuser.js";             //middleware function that extracts the user id from the auth-token
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const jwtKey = process.env.JWT_KEY;

//ENDPOINT 1: POST: "/api/auth/create-user" (LOGIN NOT REQUIRED)    Creating a user and saving it's data to the database
router.post('/create-user', [

    body('name', 'The length of the name must be atleast 3.').isLength({ min: 3 }),
    body('email', 'Please enter a valid email address.').isEmail(),
    body('password', 'Password strength is very low. Must be atleast 5 digits.').isLength({ min: 5 })

], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        //Checking if the user with same email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: false, error: "user with this email aready exists!" })
        }

        //password encryption using bCrypt
        let securePass = await bcrypt.hash(req.body.password, 10);

        //Save the data to database after validating that there are no errors
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
        });

        //payload for auth token generation to recognizes/verify user 
        const payload = {
            user: {
                id: user.id
            }
        }

        //authentication token generation and sending to the user
        const authToken = jwt.sign(payload, jwtKey);
        return res.json({ success: true, authToken });

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }

})


//ENDPOINT 2: POST: "/api/auth/login"   Authenticating the user and sending the auth token
//(Using POST request as we are dealing with passwords here and GET request makes all these details visible in the URL which could be DANGEROUS!)
router.post('/login', [
    body('email', 'Please enter a valid email address.').isEmail(),
    body('password', 'Password field cannot be blank').exists()
], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials." });
        }

        //Compare the input login password with the password hash sotored in the database
        const passwordCompare = await bcrypt.compare(password, user.password);     //function returns the boolean and stores it in "verifyUser"

        //If password doesn't match, return error response
        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials." });
        }

        //Continue if password matches
        //payload for auth token generation to recognize/verify user 
        const payload = {
            user: {
                id: user.id
            }
        }

        //authentication token generation and sending it to the user
        const authToken = jwt.sign(payload, jwtKey);
        return res.json({ success: true, authToken });

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})


//ENDPOINT 3: POST: "/api/auth/getuser"  (LOGIN REQUIRED)  Getting the user details from the database by extracting the userid from the auth-token
//(Using POST request as we are dealing with passwords here and GET request makes all these details visible in the URL which could be DANGEROUS!)
router.post('/getuser', fetchuser, async (req, res) => {


    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select(["-password", "-date"]);
        return res.send(user);

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

export default router;