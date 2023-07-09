import { useState } from "react";
import Nav from "./Nav";
import Header from "./Header";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-rows ">
        <Nav show={showNav} />
       {children}        
      </div>
    </div>
  );
}
