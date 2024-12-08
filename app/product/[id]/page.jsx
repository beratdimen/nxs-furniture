"use client";

import Image from "next/image";
import "./style.css";
import { CloseIcon, DisLikeIcon, LikeIcon, SaveIcon } from "@/helpers/icons";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { viewPost } from "@/api/category";
import { toast } from "sonner";
import Accordion from "@/components/accordion";
import DiscountSection from "@/components/product/discount";
import LoanSection from "@/components/product/loan-section";
import DeliverySection from "@/components/product/delivery";
import BankTable from "@/components/product/payment";
import SimilarProducts from "@/components/product/similar";

export default function Detail() {
  const { id } = useParams();
  const priceRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [productLike, setProductLike] = useState(false);

  const supabase = createClient();

  const userFetch = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error) setUser(data);
  };

  function handleClick() {
    if (priceRef.current) {
      priceRef.current.showModal();
    }
    console.log("tıklandım");
  }

  useEffect(() => {
    userFetch();
  }, []);

  const detailProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
          *,
          productsCategories ( categories (*) ),
          product_images(*)
        `
      )
      .eq("id", id)
      .single();

    if (!error) {
      setProduct(data);
      const allImages = [
        data.image_url,
        ...data.product_images.map((i) => i.image_url),
      ];
      setImages(allImages);
      setSelectedIndex(0);
    }
  };

  const close = () => {
    if (priceRef.current) {
      priceRef.current.close();
      setIsActive(false);
    }
  };

  useEffect(() => {
    viewPost(id);
    detailProducts();
  }, []);

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

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

  const likeProduct = async (productId) => {
    if (user) {
      console.log(user, "user");
      const { data, error } = await supabase
        .from("productsLikes")
        .insert([{ user_id: user?.user?.id, product_id: productId }])
        .select();

      if (!error) {
        setProductLike(true);
      } else {
        console.log("error :>> ", error);
      }
    } else {
      toast.error("Giriş Yapmalısınız");
    }
  };

  const deleteProductLike = async (productId) => {
    if (user) {
      const { data, error } = await supabase
        .from("productsLikes")
        .delete()
        .eq("user_id", user?.user?.id)
        .eq("product_id", productId);

      if (!error) {
        setProductLike(false);
      } else {
        console.log("error :>> ", error);
      }
    }
  };

  useEffect(() => {
    const likeControl = async () => {
      if (product?.id && user?.id) {
        const { data, error } = await supabase
          .from("productsLikes")
          .select("*")
          .eq("user_id", user?.user?.id)
          .eq("product_id", product?.id);

        if (data?.length > 0) {
          setProductLike(true);
        }

        if (error) {
          console.log(error);
        }
      }
    };

    if (user) {
      likeControl();
    }
  }, [product?.id, user]);

  const addToBasket = async () => {
    if (!user) {
      toast.error("Giriş yapmalısınız.");
      return;
    }

    try {
      const { data: control, error: errorControl } = await supabase
        .from("basket")
        .select("*")
        .eq("product_id", product?.id)
        .eq("user_id", user?.user?.id)
        .single();

      if (!control) {
        const { data, error } = await supabase.from("basket").insert([
          {
            user_id: user?.user?.id,
            product_id: product?.id,
            quantity: 1,
          },
        ]);

        if (error) throw error;
        toast.success("Ürün sepete eklendi!");
      } else {
        const { data, error } = await supabase
          .from("basket")
          .update({ quantity: control.quantity + 1 })
          .eq("id", control.id)
          .single();

        if (error) throw error;
        toast.success("Ürün adedi artırıldı! " + Number(control.quantity + 1));
      }
    } catch (error) {
      toast.error("Sepete eklenirken hata oluştu: " + error.message);
    }
  };

  return (
    <>
      <div className="detailContainer">
        <div className="productImages">
          <div className="mainImage">
            {images.length > 0 && (
              <img src={images[selectedIndex]} alt="Slider" />
            )}
            <button className="navButton geri" onClick={handlePrev}>
              &#10094;
            </button>
            <button className="navButton ileri" onClick={handleNext}>
              &#10095;
            </button>
          </div>

          <div className="thumbnailContainer">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  index === selectedIndex ? "active" : ""
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index}`}
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>

          <hr />

          <Accordion dizi={dizi} />
        </div>

        <div className="productDetails">
          <div className="productHeader">
            <h1>{product.title}</h1>
            <button
              onClick={() =>
                productLike
                  ? deleteProductLike(product?.id)
                  : likeProduct(product?.id)
              }
            >
              {productLike ? <DisLikeIcon /> : <LikeIcon />}
            </button>
          </div>

          <div className="productPrice">
            <span className="price">${product.price}</span>
            <span className="priceTag">Lowest price</span>
          </div>

          <DiscountSection />

          <div className="actionButtons">
            <button className="buyButton" onClick={() => addToBasket()}>
              Buy
            </button>

            <LoanSection />

            <DeliverySection />
          </div>

          <hr />

          <div className="infoCard">
            <a
              className="infoButton"
              href="https://xiseukjsxraiqmqgdlcs.supabase.co/storage/v1/object/public/products/c25f9c2a-d786-440b-bf86-17da0a350523.pdf"
              target="blank"
            >
              Request Catalogue
            </a>
            <button className="infoButton" onClick={handleClick}>
              Request The Price List
            </button>
          </div>
        </div>

        <dialog ref={priceRef} open={isActive}>
          <div className="modalHeader">
            <h3>Price List</h3>
            <button onClick={close}>
              <CloseIcon />
            </button>
          </div>
          <hr />
          <BankTable />
        </dialog>
      </div>

      <SimilarProducts product={product} user={user} />
    </>
  );
}
