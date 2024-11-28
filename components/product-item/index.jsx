import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { DisLikeIcon, LikeIcon, ViewIcon } from "@/helpers/icons";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductItem({ product }) {
  const [user, setUser] = useState(null);
  const [productLike, setProductLike] = useState(false);

  const supabase = createClient();

  const userFetch = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error) setUser(data);
  };

  useEffect(() => {
    userFetch();
  }, []);

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
    console.log(productLike);
    const likeControl = async () => {
      let { data, error } = await supabase
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
      const { data, error } = await supabase.from("basket").insert([
        {
          user_id: user?.user?.id,
          product_id: product?.id,
          quantity: 1,
        },
      ]);

      if (error) throw error;

      toast.success("Ürün sepete eklendi!");
    } catch (error) {
      toast.error("Sepete eklenirken hata oluştu: " + error.message);
    }
  };

  return (
    <>
      <div className="textureCard">
        <Link href={`/product/${product.id}`}>
          <Image src={"/img/9.jpg"} width={200} height={200} alt="card-img" />
        </Link>
        <button
          className="like"
          onClick={() =>
            productLike
              ? deleteProductLike(product?.id)
              : likeProduct(product?.id)
          }
        >
          {productLike ? <DisLikeIcon /> : <LikeIcon />}
        </button>

        <div className="content">
          <Link href={`/product/${product.id}`}>
            <h4>{product.title} </h4>
          </Link>
          <div className="rating">
            <ReactStars count={5} size={24} activeColor="#ffd700" />
            <p>
              <ViewIcon />
              <p>{product.view}</p>
            </p>
          </div>
          <p className="categories">
            {product.productsCategories
              .map((x) => x.categories.name)
              .join(", ")}
          </p>
          <p className="description">{product.content}</p>
          <div className="sell">
            <p>
              Price: <span>${product.price}</span>
            </p>

            <button onClick={addToBasket}>Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
