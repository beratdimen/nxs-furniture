"use client";

import "./style.css";
import { useEffect, useState } from "react";
import { fetchSimilarProducts, listAllProducts } from "@/api/category";
import ProductItem from "@/components/product-item";

export default function SimilarProducts({ product = null, user = null }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    if (product?.id) {
      getSimilarProducts();
    } else {
      getSimilarProducts();
    }
  }, [product?.id, user]);

  const getSimilarProducts = async () => {
    if (product?.productsCategories?.[0]?.categories?.id) {
      const categoryId = product?.productsCategories[0]?.categories?.id;
      const productId = product.id;

      const fetchedProducts = await fetchSimilarProducts(categoryId, productId);
      setSimilarProducts(fetchedProducts);
    } else {
      const fetchedProducts = await listAllProducts();
      setSimilarProducts(fetchedProducts);
    }
  };

  console.log(similarProducts, " dsadasdsadasdasa");

  return (
    <div className="similarProducts">
      <h2>Similar Products</h2>
      <div className="productsGrid">
        {similarProducts.map((similarProduct) => (
          <ProductItem key={similarProduct.id} product={similarProduct} />
        ))}
      </div>
    </div>
  );
}
