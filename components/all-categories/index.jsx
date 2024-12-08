"use client";
import { useEffect, useState } from "react";
import Categories from "../categories-card";
import { listAllProducts, listProductsAllCategories } from "@/api/category";
import "./style.css";
import CategoryDesign from "../homepage/category-design";
import SliderHome from "../homepage/slider";

export default function AllCategories() {
  // const [chairs, setChairs] = useState([]);
  // const [tables, setTables] = useState([]);
  // const [mirrors, setMirrors] = useState([]);
  const [allCategoires, setAllCategoires] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const listProducts = async () => {
      const response = await listProductsAllCategories();
      const responseProducts = await listAllProducts();
      // const responseChair = await listProductsForCategory("chair");
      // const responseTables = await listProductsForCategory("table");
      // const responseMirrors = await listProductsForCategory("mirror");
      setProducts(responseProducts);
      setAllCategoires(response);
      // setChairs(responseChair);
      // setTables(responseTables);
      // setMirrors(responseMirrors);
    };

    listProducts();
  }, []);

  return (
    <div className="all">
      {products?.length > 0 && <Categories title={"All"} products={products} />}

      <SliderHome />
      {allCategoires.map(
        (x, i) =>
          x?.products?.length > 0 && (
            <div key={i}>
              <Categories title={x.name} products={x.products} />
            </div>
          )
      )}

      <CategoryDesign />
    </div>
  );
}
