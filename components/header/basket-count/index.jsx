"use client";
import { basketItems } from "@/api/category";
import { BasketIcon } from "@/helpers/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BasketCount({ user }) {
  const [basket, setBasket] = useState(0);

  const getBasketCount = async (user) => {
    const basketItemsData = await basketItems(user);

    if (!basketItemsData || basketItemsData.length === 0) {
      return 0;
    }

    const totalQuantity = basketItemsData.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    return totalQuantity;
  };

  const basketCount = async () => {
    const data = await getBasketCount(user);
    setBasket(data);
  };

  useEffect(() => {
    if (user) {
      basketCount();
    }
  }, [user]);

  return (
    <Link href={"/basket"}>
      <div className="basketWrapper">
        <BasketIcon />
        {basket > 0 && <span className="badge">{basket}</span>}
      </div>
    </Link>
  );
}
