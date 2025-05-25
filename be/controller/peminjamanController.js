import Peminjaman from "../models/peminjamanModel.js";
import DataBuku from "../models/dataBukuModel.js";

export async function pinjamBuku(req, res) {
  try {
    const { id_user, id_buku, nama, nim, tanggal_pinjam, tanggal_kembali } = req.body;

    const buku = await DataBuku.findByPk(id_buku);
    if (!buku || buku.stok <= 0) return res.status(400).json({ message: "Stok tidak cukup" });

    await Peminjaman.create({ id_user, id_buku, nama, nim, tanggal_pinjam, tanggal_kembali });
    await buku.update({ stok: buku.stok - 1 });

    res.status(201).json({ message: "Berhasil meminjam buku" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function riwayatPeminjaman(req, res) {
  const id_user = req.params.id;
  const data = await Peminjaman.findAll({ where: { id_user } });
  res.json(data);
}

export async function semuaRiwayat(req, res) {
  const data = await Peminjaman.findAll();
  res.json(data);
}

export async function kembalikanBuku(req, res) {
  const { id } = req.params;
  const peminjaman = await Peminjaman.findByPk(id);
  if (!peminjaman) return res.status(404).json({ message: "Data tidak ditemukan" });

  const buku = await DataBuku.findByPk(peminjaman.id_buku);
  if (buku) await buku.update({ stok: buku.stok + 1 });

  await peminjaman.update({ status: "Dikembalikan" });

  res.json({ message: "Buku telah dikembalikan" });
}
