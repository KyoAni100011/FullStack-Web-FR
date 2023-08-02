import * as React from "react";
import ShoppingList from "./components/ShoppingList";
import PaginationComponent from "./components/Pagination";

export default function Home() {
  const [page, setPage] = React.useState(1);

  const handleChange = (value) => {
    setPage(value);
  };

  return (
    <div className="py-12 bg-[#F5F5F5] sm:py-16 lg:py-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <ShoppingList></ShoppingList>
      <PaginationComponent setPage={handleChange} page={page} />
    </div>
  );
}
