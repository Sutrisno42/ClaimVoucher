import { Sequelize } from "sequelize";

const db = new Sequelize ('horus_trisno_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;