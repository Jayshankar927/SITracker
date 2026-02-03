import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

//Helper to craete the token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'});
}

export const registerUSer = async (req, res) => {
    const {name, email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({message: "User alraedy exists."});

        const user = await User.create({name, email, password});
        res.status(200).json({
            _id: user._id,
            name: user,name,
            token: generateToken(user._id),
        });

    } catch(err){
        res.status(500).json({message: err.message});
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                toaken: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password"});
        }
    } catch (err){
        res.status(500).json({message: err.message});
    }
}
