import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['username', 'nama', 'email']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes:['username','nama','email'],
            where: {
                username: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {
    const {username, nama, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            username:username,
            nama: nama,
            email: email,
            password: hashPassword,
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "Username tidak ditemukan"});
    const {username, nama, email, password, confPassword} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            username:username,
            nama: nama,
            email: email,
            password: hashPassword,
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User diubah"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "Username tidak ditemukan"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Username dihapus"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}