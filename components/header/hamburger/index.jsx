"use client";

import { useState } from "react";
import { HamburgerIcon } from "@/helpers/icons";
import "../style.css";
import Link from "next/link";

export default function HeaderNav({ categories }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ul className={`nav ${menuOpen ? "active" : ""}`}>
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        {categories?.map((category) => (
          <Link href={`/${category?.slug}`} key={category?.id}>
            <li>{category?.name}</li>
          </Link>
        ))}
      </ul>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <HamburgerIcon />
      </button>
    </>
  );
}
