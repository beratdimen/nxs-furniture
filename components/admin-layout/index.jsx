import React from "react";
import "./global.css";
import Header from "@/components/header-admin";
import Sidebar from "@/components/sidebar";
import Content from "@/components/content";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Content />
      </div>
    </div>
  );
}
