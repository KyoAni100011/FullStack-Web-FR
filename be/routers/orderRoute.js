import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  getCurrentMonthIncome,
  getMonthlyIncomeBySeller,
  getOrderBySellerId,
  updateOrderStatusToDispatched,
  updateOrderStatusToCancelled,
  getDailyIncomeBySeller,
  getDailyRefundBySeller,
  getIncomeBySellerIdForAllMonths,
  getRefundBySellerIdForAllMonths,
  getIncomeForAllMonths,
  getRefundForALlMonths,
  getIncomeForAllDeliveredOrders,
  getCurrentYearIncome,
  getRefundForAllDeliveredOrders
} from "../controllers/orderController.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller,
} from "../middlewares/verifyToken.js";

const router = express.Router();
// seller
router.get("/income/:sellerId", getMonthlyIncomeBySeller);
router.get("/income/daily/:sellerId", getDailyIncomeBySeller);
router.get("/income/allmonth/:sellerId", getIncomeBySellerIdForAllMonths);
router.get("/refund/daily/:sellerId", getDailyRefundBySeller);
router.get("/refund/allmonth/:sellerId", getRefundBySellerIdForAllMonths);

router.get("/", verifyTokenAndAdmin, getAllOrders);
// router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

// admin
router.get("/admin/income/current/year", getCurrentYearIncome);
router.get("/admin/income/current/month", getCurrentMonthIncome);
router.get("/admin/income/allmonth", getIncomeForAllMonths);
router.get("/admin/refund/allmonth", getRefundForALlMonths);
router.get("/admin/income", getIncomeForAllDeliveredOrders);
router.get("/admin/refund", getRefundForAllDeliveredOrders);

router.get("/:userId", getOrdersByUserId);
router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", deleteOrder);
router.put("/update/:orderId", updateOrderStatusToDispatched);
router.put("/cancel/:orderId", updateOrderStatusToCancelled);

router.get("/sellerId/:id", getOrderBySellerId);

export default router;
