const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        // read data
        const { name, email, password, role } = req.body;

        // check user already exist or not
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User is Already Exist"
            })
        }

        // secure the password
        let hasPassword;
        try {                            // (var,no of round)    
            hasPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in Hashing Password"
            })
        }

        // create the user
        const user = await User.create({
            name, email, password: hasPassword, role
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        })

    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Signup form ",
        })
    }
}

exports.login = async (req, res) => {
    try {


        const { email, password } = req.body;

        // Find user by email
        let user = await User.findOne({ email });

        // email or passsword empty
        if (!user || !password) {
            return res.status(401).json({
                success: false,
                message: 'Please  provide an Email and a Password'
            })
        }


        // user not found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        }

        //  (req.body,database password)
        if (await bcrypt.compare(password, user.password)) {
            //  password Matched
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "2h"//Token will expire after
                });
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            // user.role = undefined; iska matlab hai ye apko db per show nahi karenge
            // user.email = undefined;

            const options = {
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User logged In Successfully",
                user,
                token,
            })



        }

        else {
            //  password Not Matched
            return res.status(401).json({
                error: 'Invalid password'
            });
        }


    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: "false",
            message: 'Login Failed'
        });
    }
};