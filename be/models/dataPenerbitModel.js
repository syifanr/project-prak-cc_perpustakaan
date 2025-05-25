import { Sequelize } from "sequelize"
import db from "../config/database.js"


const DataPenerbit = db.define("penerbit", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
      nama: Sequelize.STRING,
      alamat: Sequelize.STRING,
      kota: Sequelize.STRING,
      telepon: Sequelize.STRING,
      email: Sequelize.STRING,
}, {
    freezeTableName: true // <- penting ini!
});

// (async () => {
//   await db.sync();
// })();

db.sync().then(() => console.log("Database Synchronized"))

export default DataPenerbit;