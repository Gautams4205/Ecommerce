import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductdetail from "../features/admin/components/AdminProductDetail";

function AdminProductDetailPage() {
  return (
    <Navbar>
      <AdminProductdetail></AdminProductdetail>
    </Navbar>
  );
}

export default AdminProductDetailPage;
