import MallIcon from "../../../../assets/MallIcon";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import ItemItemCart from "./ItemItemCart";

export default function ItemCart({ shop }) {
  return (
    <React.Fragment>
      <tr className="bg-white border-t-8 border-light-silver">
        <th colSpan="5" className="text-left border-y-[1px] border-light-grey">
          <div className="p-3 inline-block cursor-pointer hover:underline">
            <MallIcon />
            <span className="ml-1">{shop?.name}</span>
            <ArrowForwardIosIcon
              style={{ fontSize: "12px", marginLeft: "3px" }}
            />
          </div>
        </th>
      </tr>
      {shop?.item.map((item) => (
        <ItemItemCart
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          image={item.image}
        />
      ))}
    </React.Fragment>
  );
}