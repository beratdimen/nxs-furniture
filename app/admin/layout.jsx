import "./global.css";
import { Toaster } from "sonner";
import Content from "@/components/content";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header-admin";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors />
        <div className="admin-layout">
          <Sidebar />
          <div className="main-content">
            <Header />
            <Content>{children}</Content>
          </div>
        </div>
      </body>
    </html>
  );
}
