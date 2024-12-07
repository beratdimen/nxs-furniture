import { LogoutIcon } from "@/helpers/icons";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
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
            <Link href="/admin/logout">
              <LogoutIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
