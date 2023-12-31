import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  updatedShipTotal,
  updatedShipping,
} from "../../../../utils/redux/purchaseSlice";
import formatNumberWithCommas from "../../../../utils/formatNumberWithCommas";

export default function ModalShipping({ modal, closeModal, at }) {
  let fastPriceShipping = 20000;
  let normalPriceShipping = 10000;

  const [isFastShipping, setFastShipping] = useState(true);
  const [isNormalShipping, setNormalShipping] = useState(false);
  const dispatch = useDispatch();

  const handleFastShipping = () => {
    setFastShipping(true);
    setNormalShipping(false);
  };

  const handleNormalShipping = () => {
    setFastShipping(false);
    setNormalShipping(true);
  };

  const confirmShipping = () => {
    dispatch(
      updatedShipping({
        shipping: isFastShipping ? "Fast" : "Normal",
      })
    );
    dispatch(
      updatedShipTotal({
        shipPrice: isFastShipping ? fastPriceShipping : normalPriceShipping,
      })
    );

    closeModal();
  };

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      document.querySelector(".modal").removeAttribute("style");
    } else {
      document
        .querySelector(".modal")
        .setAttribute("style", "top: `calc(50% + ${at}px)`");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Dependency array is empty to add the event listener only once

  return (
    <div
      className={`modal ${modal ? "block" : "hidden"}`}
      style={{ top: `calc(50% + ${at}px)` }}
    >
      <div className="modal-wrapper p-7">
        <h1 className="text-lg mb-4">Choose a shipping unit</h1>
        <div className="sub-title">
          <h2 className="uppercase text-sm text-gray-600 font-semibold">
            SHIPPING CHANNEL affiliated with FASHION REVIVE
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            You can track your order on FASHION REVIVE app when you choose one
            of the shipping units:
          </p>
        </div>
        <div
          onClick={() => handleFastShipping()}
          className="type p-5 border-l-4 bg-bright-gray border-red-600 mb-3 flex justify-between items-center cursor-pointer"
        >
          <div className="left-side">
            <div className="above flex">
              <div className="name mr-5">Fast</div>
              <div className="price text-red-500 font-semibold">
                ₫{formatNumberWithCommas(fastPriceShipping)}
              </div>
            </div>
            <div className="below text-xs mt-1">
              Nhận hàng vào{" "}
              {new Date().toLocaleDateString("vi-VN", {
                month: "short",
                day: "numeric",
              })}
              -
              {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(
                "vi-VN",
                { month: "short", day: "numeric" }
              )}
            </div>
          </div>
          <div className="right-side">
            {isFastShipping && <CheckIcon className="text-red-600" />}
          </div>
        </div>
        <div
          onClick={() => handleNormalShipping()}
          className="type cursor-pointer p-5 border-l-4 bg-bright-gray border-red-600 flex justify-between items-center"
        >
          <div className="left-side">
            <div className="above flex">
              <div className="name mr-5">Normal</div>
              <div className="price text-red-500 font-semibold">
                ₫{formatNumberWithCommas(normalPriceShipping)}
              </div>
            </div>
            <div className="below text-xs mt-1">
              Nhận hàng vào{" "}
              {new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("vi-VN", { month: "short", day: "numeric" })}
              -
              {new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("vi-VN", { month: "short", day: "numeric" })}
            </div>
          </div>
          <div className="right-side">
            {isNormalShipping && <CheckIcon className="text-red-600" />}
          </div>
        </div>
        <div className="btn-group border-t-2 border-bright-gray mt-3 border-dashed pt-3 flex justify-end">
          <div
            onClick={confirmShipping}
            className="py-2 px-6 bg-red-500 hover:bg-red-600 rounded-md text-white cursor-pointer"
          >
            Finish
          </div>
        </div>
      </div>
    </div>
  );
}
