"use client";
import Image from "next/image";
import "./style.css";
import { LikeIcon, NextIvon, PrevIvon, SaveIcon } from "@/helpers/icons";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { viewPost } from "@/api/category";
export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const supabase = createClient();

  const detailProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
            *,
            productsCategories (
             categories (*)
            ) , product_images(*)
        `
      )
      .eq("id", id)
      .single();
    if (!error) setProduct(data);
  };

  useEffect(() => {
    viewPost(id);
    detailProducts();
  }, []);
  console.log(product);

  const dizi = [
    {
      label: "Category",
      value: product?.productsCategories
        ?.map((category) => category.categories.name)
        .join(", "),
    },
    { label: "Material", value: product.material },
    { label: "Style", value: product.style },
    { label: "Color", value: product.color },
    { label: "Width", value: product.width },
    { label: "Height", value: product.height },
  ];

  return (
    <div className="detailContainer">
      <div className="productImages">
        <div className="mainImage">
          {product.image_url && (
            <Image
              src={product.image_url}
              alt="Slider"
              width={600}
              height={600}
            />
          )}
          <button className="navButton prev">
            <PrevIvon />
          </button>
          <button className="navButton next">
            <NextIvon />
          </button>
        </div>
        <div className="thumbnailContainer">
          {product?.product_images?.map((i) => (
            <div key={i} className="thumbnail">
              <Image
                src={`${i.image_url}`}
                alt={`Thumbnail ${i}`}
                width={96}
                height={96}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="productDetails">
        <div className="productHeader">
          <h1>{product.title}</h1>
          <button>
            <LikeIcon />
          </button>

          <button>
            <SaveIcon />
          </button>
        </div>
        <div className="productPrice">
          <span className="price">${product.price}</span>
          <span className="priceTag">Lowest price</span>
        </div>

        <div className="actionButtons">
          <button className="buyButton">Buy</button>
          <button className="downloadButton">Free Download</button>
        </div>

        <div className="infoCard">
          <button className="infoButton">Request Catalogue </button>
          <button className="infoButton">Request The Price List </button>
          <button className="infoButton">Where to Buy </button>
        </div>

        <div className="productSpecs">
          <h2 className="specsTitle">Product Detail:</h2>
          <div className="specsGrid">
            {dizi.map((detail) => (
              <div key={detail.label} className="specItem">
                <span className="specLabel">{detail.label} :</span>
                <span className="specValue">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
