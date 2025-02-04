import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductForm from "../features/admin/components/ProductForm";

function AdminProductForm() {
  return (
    <Navbar>
      <ProductForm></ProductForm>
    </Navbar>
  );
}

export default AdminProductForm;
