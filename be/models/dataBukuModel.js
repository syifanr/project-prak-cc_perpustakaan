import { Sequelize } from "sequelize"
import db from "../config/database.js"

const DataBuku = db.define("buku", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    kategori: Sequelize.STRING,
    nama_buku: Sequelize.STRING,
    harga: Sequelize.INTEGER,
    stok: Sequelize.INTEGER,
    penerbit: Sequelize.STRING,
    tahun: Sequelize.STRING,
}, {
    freezeTableName: true // <- penting ini!
});


// (async () => {
//   await db.sync();
// })();

db.sync().then(() => console.log("Database Synchronized"))

export default DataBuku;