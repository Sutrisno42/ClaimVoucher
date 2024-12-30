import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Voucher = db.define('voucher', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kategori: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'claimed'),
        defaultValue: 'available'
    },
},{
    freezeTableName: true
});

export default Voucher;