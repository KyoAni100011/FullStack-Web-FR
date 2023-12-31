import TableOrders from "../components/TableOrder";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CancelIcon from "@mui/icons-material/Cancel";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Card from "../../Home/PersonalProfile/components/card";
import { getOrdersBySellerId } from "../../../api/order";
import formatNumberWithCommas from "../../../utils/formatNumberWithCommas";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0); // Total number of pages returned by the API
  const [orderStatusTotalAmounts, setOrderStatusTotalAmounts] = useState([]);

  const staticTable = [
    {
      icon: <AutorenewIcon fontSize="large" />,
      id: 1,
      text: "Total Money",
      number: isNaN(orderStatus["Processing"]) ? 0 : orderStatus["Processing"],
      money: isNaN(orderStatusTotalAmounts["Processing"]) ? "0" : formatNumberWithCommas(Number(orderStatusTotalAmounts["Processing"])) || 0,
      color: "orange",
      title: "Processing",
    },
    {
      icon: <LocalShippingIcon fontSize="large" />,
      id: 2,
      text: "Total Money",
      number: isNaN(orderStatus["Dispatched"]) ? 0 : orderStatus["Dispatched"],
      money: isNaN(orderStatusTotalAmounts["Dispatched"]) ? "0" : formatNumberWithCommas(Number(orderStatusTotalAmounts["Dispatched"])),
      color: "blue",
      title: "Dispatched",
    },
    {
      icon: <AssignmentTurnedInIcon fontSize="large" />,
      id: 3,
      text: "Total Money",
      number: isNaN(orderStatus["Delivered"]) ? 0 : orderStatus["Delivered"],
      money: isNaN(orderStatusTotalAmounts["Delivered"]) ? "0" : formatNumberWithCommas(Number(orderStatusTotalAmounts["Delivered"])),
      color: "green",
      title: "Delivered",
    },
    {
      icon: <CancelIcon fontSize="large" />,
      id: 4,
      text: "Total Money",
      number: isNaN(orderStatus["Cancelled"]) ? 0 : orderStatus["Cancelled"],
      money: isNaN(orderStatusTotalAmounts["Cancelled"]) ? "0" : formatNumberWithCommas(Number(orderStatusTotalAmounts["Cancelled"])),
      color: "tomato",
      title: "Cancelled",
    },
  ];

  const handleChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  useEffect(() => {
    let sellerId = localStorage.getItem("_id");
    let cleanedSellerId = sellerId.replace(/"/g, "");

    const fetchOrders = async () => {
      sessionStorage.setItem("pageTableOrders", page.toString());

      sessionStorage.setItem("pageTableOrdersPerPage", perPage.toString());

      try {
        // window.scrollTo(0, 0);
        const response = await getOrdersBySellerId(
          cleanedSellerId,
          page,
          perPage
        );

        const dataOrders = response.data.orders;
        setOrderStatus(response.data.orderStatusCounts);
        setOrderStatusTotalAmounts(response.data.orderStatusTotalAmounts);
        setTotalPages(response.data.totalPages);
        sessionStorage.setItem(
          "totalPage",
          response.data.totalPages.toString()
        );

        const data = dataOrders.flatMap((order) => {
          const orderInfo = {
            tradeCode: order._id,
            payment: order.payment.paymentMethod,
            status: order.orderStatus,
            orderBy: order.orderby.name,
            mobile: order.orderby.mobile,
            address: `${order.shipping.address} ${order.shipping.ward} ${order.shipping.district} ${order.shipping.city}`,
            orderDate: order.orderDate.split("T")[0],
          };

          return order.products.map((product) => ({
            ...orderInfo,
            itemName: product.title,
            price: product.price,
            image: product.image,
          }));
        });

        setOrders(data); // Assuming the response contains the actual data
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOrders();
  }, [page, perPage]);

  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {staticTable.map((item) => (
          <Card
            icon={item.icon}
            text={item.text}
            number={item.number}
            money={item.money}
            color={item.color}
            title={item.title}
            key={item.id}
          />
        ))}
      </div>
      <div className="w-full">
        <TableOrders
          rows={orders}
          nameTable={"All Orders"}
          onPageChange={handleChange}
          page={page}
          onPerPageChange={handlePerPageChange}
          perPage={perPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
