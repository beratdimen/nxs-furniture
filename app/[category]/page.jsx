"use client";

import Categories from "@/components/categories-card";
import "./style.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listProductsForCategory, searchProducts } from "@/api/category";
import SliderHome from "@/components/homepage/slider";
import OrderKnowladge from "@/components/order-knowladge";
import SimilarProducts from "@/components/product/similar";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function CategoriesPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  const userFetch = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user && !error) {
      setUser(data.user);
    } else {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  useEffect(() => {
    const listProducts = async () => {
      const response = await listProductsForCategory(category);

      console.log("response :>> ", response);

      if (response.length === 0) {
        const response = await searchProducts(category);

        console.log("response :>> ", response);
        setProducts(response);
      } else {
        setProducts(response);
      }
    };

    listProducts();
  }, [category]);

  return (
    <div className="categoryContainer">
      {products.length == 0 ? (
        <div className="notProducts">
          <img
            className="gif"
            src="/img/Searching-but-not-found-and-empty-folder.gif"
            alt=""
          />

          <p>
            There is no product in {category}. Also you can see the similar
            products.
          </p>
        </div>
      ) : (
        <Categories title={category} products={products} />
      )}

      <SimilarProducts />

      <SliderHome />

      <OrderKnowladge />
    </div>
  );
}
