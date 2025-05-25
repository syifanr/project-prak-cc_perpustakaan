import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Peminjaman = db.define("peminjaman", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: Sequelize.INTEGER,
  id_buku: Sequelize.STRING,
  nama: Sequelize.STRING,
  nim: Sequelize.STRING,
  tanggal_pinjam: Sequelize.DATEONLY,
  tanggal_kembali: Sequelize.DATEONLY,
  status: {
    type: Sequelize.STRING,
    defaultValue: "Dipinjam", // atau "Dikembalikan"
  },
}, {
  freezeTableName: true,
});

export default Peminjaman;
