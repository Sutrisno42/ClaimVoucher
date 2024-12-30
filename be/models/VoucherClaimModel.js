import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Voucher from "./VoucherModel.js";

const { DataTypes } = Sequelize;

const VoucherClaim = db.define('voucher_claim', {
    id_voucher: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanggal_claim: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    freezeTableName: true
});

VoucherClaim.belongsTo(Voucher, { foreignKey: 'id_voucher' });

export default VoucherClaim;