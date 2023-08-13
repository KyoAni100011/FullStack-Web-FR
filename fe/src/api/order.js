import { instance } from "./config";

export const getOrdersByUserId = async (id) => {
  try {
    const response = await instance.get(`/orders/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const createPaymentUrl = async (order) => {
  try {
    const data = await instance.post("/vnpay/create_payment_url", {
      order,
    });

    console.log("CHECK", data);

    if (data.data) {
      if (data.data.code === "00") {
        window.location.href = data.data.paymentUrl;
      }
    }
  } catch (error) {
    console.error("Error creating payment URL:", error);
    throw error;
  }
};

export const getOrdersBySellerId = async (id) => {
  try {
    const respone = await instance.get(`/orders/sellerId/${id}`);
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error get products by seller id."
    );
  }
};
