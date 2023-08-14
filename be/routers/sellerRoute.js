import express from "express";
import {
  getSellers,
  createSeller,
  loginSeller,
  logoutSeller,
  getSellerById,
  updateSellerById,
} from "../controllers/sellerController.js";

const router = express.Router();

// create API endpoints for seller

router.get("/", getSellers);
router.post("/register", createSeller);
router.post("/login", loginSeller);
router.delete("logout", logoutSeller);
router.get("/:id", getSellerById);
router.put("/:id", updateSellerById);

export default router;
