import Voucher from "../models/VoucherModel.js";
import VoucherClaim from "../models/VoucherClaimModel.js";
import path from "path";
import fs from "fs";

export const createVoucher = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "Tidak ada file terunggah" });
    const { nama, kategori, status } =  req.body;
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    // Validasi file
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Foto harus dibawah 5MB" });

    // Pindahkan file ke folder publik
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });

        try {
            const voucher = await Voucher.create({
                nama,
                foto: fileName,
                kategori,
                status
            });
            res.status(201).json({ message: "Voucher berhasil dibuat", voucher });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Get all vouchers
export const getVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.findAll();
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single voucher by ID
export const getVoucherById = async (req, res) => {
    try {
        const { id } = req.params;
        const voucher = await Voucher.findByPk(id);
        if (!voucher) {
            return res.status(404).json({ message: "Voucher not found" });
        }
        res.status(200).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a voucher by ID
export const updateVoucher = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, foto, kategori, status } = req.body;
        const voucher = await Voucher.findByPk(id);
        if (!voucher) {
            return res.status(404).json({ message: "Voucher not found" });
        }
        await voucher.update({ nama, foto, kategori, status });
        res.status(200).json({ message: "Voucher updated successfully", voucher });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a voucher by ID
export const deleteVoucher = async (req, res) => {
    try {
        const { id } = req.params;
        const voucher = await Voucher.findByPk(id);
        if (!voucher) {
            return res.status(404).json({ message: "Voucher not found" });
        }
        await voucher.destroy();
        res.status(200).json({ message: "Voucher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const claimVoucher = async (req, res) => {
    try {
        const { id } = req.params;
        const voucher = await Voucher.findByPk(id);
        if (!voucher) {
            return res.status(404).json({ message: "Voucher tidak ditemukan" });
        }
        if (voucher.status === "claimed") {
            return res.status(400).json({ message: "Voucher sudah diklaim" });
        }

        // Update status menjadi klaim
        await voucher.update({ status: "claimed" });

        // Insert into voucher_claim table
        await VoucherClaim.create({ 
            id_voucher: id, 
            tanggal_claim: new Date() 
        });

        res.status(200).json({ message: "Voucher berhasil diklaim" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all claimed vouchers
export const getClaimVouchers = async (req, res) => {
    try {
        const claimedVouchers = await VoucherClaim.findAll({
            include: [
                {
                    model: Voucher,
                    attributes: ['nama', 'kategori', 'foto', 'status']
                }
            ],
            attributes: ['id', 'id_voucher', 'tanggal_claim'], // Include tanggal_claim in response
            order: [['tanggal_claim', 'DESC']] // Optional: Order by tanggal_claim descending
        });
        res.status(200).json(claimedVouchers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a claimed voucher by ID
export const deleteClaimVoucher = async (req, res) => {
    try {
        const { id } = req.params;

        // Temukan klaim voucher berdasarkan ID
        const claim = await VoucherClaim.findByPk(id);
        if (!claim) {
            return res.status(404).json({ message: "Claim not found" });
        }

        // Temukan voucher terkait
        const voucher = await Voucher.findByPk(claim.id_voucher);
        if (!voucher) {
            return res.status(404).json({ message: "Associated voucher not found" });
        }

        // Ubah status voucher kembali ke "available"
        await voucher.update({ status: "available" });

        // Hapus klaim voucher
        await claim.destroy();

        res.status(200).json({ message: "Voucher claim deleted and status updated to available" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
