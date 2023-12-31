import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

export default function Example({ funcGetShoppingCart }) {
  const total = useSelector((state) => state.product.total);
  return (
    <div className="text-right" onClick={funcGetShoppingCart}>
      <Menu as="div" className="relative inline-block text-left">
        <div className="absolute right-0 bg-red-500 px-[8px] py-[1px] text-white rounded-full text-[10px] font-bold">
          {" "}
          {total}
        </div>
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md hover:bg-slate-200 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Link to="/shoppingcart">
              <ShoppingCartIcon />
            </Link>
          </Menu.Button>
        </div>
      </Menu>
    </div>
  );
}
