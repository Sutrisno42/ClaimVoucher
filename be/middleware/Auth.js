import User from "../models/UserModel.js";

export const verify = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login dahulu!"});
    }
    const user = await User.findOne({
        where: {
            username: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Username tidak ditemukan"});
    req.userId = user.id;
    // req.role = user.role; 
    next();
}