import { signout } from "@/actions/actions";
import { LogoutIcon } from "@/helpers/icons";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";

export default async function Sidebar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <aside className="sidebar">
      <Link href={"/"}>
        <h1>LOGO</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/categories">Categories</Link>
          </li>
          <li>
            <Link href="/admin/product">Products</Link>
          </li>
          <li>
            <Link href="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link href="/admin/project">Projects</Link>
          </li>
          <li>
            <form action={signout}>
              <button>
                <LogoutIcon />
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
