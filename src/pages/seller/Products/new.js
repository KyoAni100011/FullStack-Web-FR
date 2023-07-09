import Layout from "../../../component/Layout";
import NewProductForm from "../../../component/NewForm";
import { useState } from "react";
import ProductTable from "../../../component/Table";

export default function New() {
  const [products, setProducts] = useState([]);

  const handleSubmit = (formData) => {
    setProducts([...products, formData]);
  };
  return (
    <div>
      <Layout>
      <NewProductForm onSubmit={handleSubmit} />
      </Layout>
    </div>
  );
}
