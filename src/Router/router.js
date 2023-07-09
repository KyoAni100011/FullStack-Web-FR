import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";
import ForgotPassword from "../pages/ForgotPassword/forgotpassword";
import ChooseType from "../pages/ChooseType/choosetype";
import NotFound from "../pages/NotFound/404";
import HomeSeller from "../pages/seller/home";
import Products from "../pages/seller/Products/product";
import New from "../pages/seller/Products/new";
import Review from "../pages/seller/Review/review";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route
        path="/forgotpassword"
        element={<ForgotPassword></ForgotPassword>}
      ></Route>
      <Route path="/type" element={<ChooseType />}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path='/seller' element={<HomeSeller/>}></Route>
      <Route path='/seller/products' element={<Products/>}></Route>
      <Route path='/seller/products/new' element={<New/>}></Route>
      <Route path='/review' element={<Review/>}></Route>

    </Routes>
  );
}
