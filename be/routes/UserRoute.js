import express from "express";
import {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  getUsers
} from "../controller/userController.js";

import {
  refreshToken,
} from "../controller/RefreshToken.js";

import { verifyToken } from "../middleware/VerifyToken.js";

import {
  createDataBuku,
  deleteDataBuku,
  getDataBuku,
  updateDataBuku,
  getDataBukuById
} from "../controller/dataBukuController.js";

import {
  createDataPenerbit,
  deleteDataPenerbit,
  getDataPenerbit,
  updateDataPenerbit,
  getDataPenerbitById
} from "../controller/dataPenerbitController.js";

import {
  pinjamBuku,
  riwayatPeminjaman,
  semuaRiwayat,
  kembalikanBuku
} from "../controller/peminjamanController.js";

const router = express.Router();

//endpoint table user
router.get("/users", getUsers);
router.post("/login", login);
router.post("/register", register);
router.put("/profile/update/:username", verifyToken, updateUser);
router.delete("/profile/delete/:username", verifyToken, deleteUser);
router.delete("/logout", logout);

// REFRESH TOKEN
router.get("/profile/:username", refreshToken);

// DATA BUKU 
router.get("/dataBuku",verifyToken, getDataBuku);
router.get("/dataBuku/:id_buku", verifyToken, getDataBukuById);
router.post("/add-dataBuku",verifyToken, createDataBuku);
router.put("/edit-dataBuku/:id", verifyToken, updateDataBuku);
router.delete("/delete-dataBuku/:id", verifyToken, deleteDataBuku);

// DATA PENERBIT
router.get("/dataPenerbit", verifyToken, getDataPenerbit);
router.get("/dataPenerbit/:id_buku", verifyToken, getDataPenerbitById);
router.post("/add-dataPenerbit",verifyToken, createDataPenerbit);
router.put("/edit-dataPenerbit/:id",verifyToken, updateDataPenerbit);
router.delete("/delete-dataPenerbit/:id",verifyToken, deleteDataPenerbit);

// PEMINJAMAN
router.post("/pinjam", verifyToken, pinjamBuku);
router.get("/riwayat/:id", verifyToken, riwayatPeminjaman);
router.get("/semuaRiwayat", verifyToken, semuaRiwayat);
router.put("/kembalikan/:id", verifyToken, kembalikanBuku);

export default router;
