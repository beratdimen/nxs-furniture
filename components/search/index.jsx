"use client";
import { SearchIcon } from "@/helpers/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  return (
    <div className="search">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search in website.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={() => {
          router.push("/search" + "?" + createQueryString("s", searchTerm));
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
