import "./global.css";
import { Toaster } from "sonner";
import Content from "@/components/content";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header-admin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  if (user?.user_metadata?.role !== "admin") redirect("/");
  else
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
