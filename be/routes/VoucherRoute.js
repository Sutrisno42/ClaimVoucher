import express from "express";
import {
    getVoucherById,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    getVouchers,
    claimVoucher,
    getClaimVouchers,
    deleteClaimVoucher
} from "../controllers/Voucher.js"

const router = express.Router();

router.get('/voucher', getVouchers);
router.get('/voucher/:id', getVoucherById);
router.post('/voucher', createVoucher);
router.patch('/voucher/:id', updateVoucher);
router.delete('/voucher/:id', deleteVoucher);

router.post("/voucher/:id/claim", claimVoucher);
router.get("/claims", getClaimVouchers);
router.delete("/claims/:id", deleteClaimVoucher);


export default router;