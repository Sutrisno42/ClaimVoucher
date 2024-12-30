import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!user) return res.status(404).json({msg: "Username tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Password Salah"});
    req.session.userId = user.username;
    const username = user.username;
    const nama = user.nama;
    const email = user.email;
    res.status(200).json({username, nama, email});
}

export const getProfil = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['username','nama','email'],
        where: {
            username: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Username tidak ditemukan"});
    res.status(200).json(user);
}

export const Logout = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}