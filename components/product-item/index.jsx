import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { DisLikeIcon, LikeIcon, ViewIcon } from "@/helpers/icons";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import Link from "next/link";
import "./style.css";

const supabase = createClient();

export default function ProductItem({ product: initialProduct }) {
  const [user, setUser] = useState(null);
  const [productLike, setProductLike] = useState(false);
  const [product, setProduct] = useState(initialProduct);

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
      toast.error("You need to log in");
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
      toast.error("You need to log in.");
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
        toast.success("The product has been added to the cart!");
      } else {
        const { data, error } = await supabase
          .from("basket")
          .update({ quantity: control.quantity + 1 })
          .eq("id", control.id)
          .single();

        if (error) throw error;
        toast.success(
          "The product quantity has been increased! " +
            Number(control.quantity + 1)
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while adding the item to the cart: " + error.message
      );
    }
  };

  const handleRating = async (newRating) => {
    if (!user) {
      toast.error("You need to log in.");
      return;
    }

    try {
      const { data: existingRating, error: fetchError } = await supabase
        .from("product_rating")
        .select("*")
        .eq("user_id", user.user?.id)
        .eq("product_id", product?.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existingRating) {
        const { error: updateError } = await supabase
          .from("product_rating")
          .update({ rating: newRating })
          .eq("id", existingRating.id);

        if (updateError) throw updateError;

        toast.success("Your review has been successfully updated!");
      } else {
        const { error: insertError } = await supabase
          .from("product_rating")
          .insert({
            user_id: user.user?.id,
            product_id: product?.id,
            rating: newRating,
          });

        if (insertError) throw insertError;

        toast.success("Scoring saved successfully!");
      }

      await updateProductRating();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during scoring.");
    }
  };

  const updateProductRating = async () => {
    try {
      const { data, error } = await supabase
        .from("product_rating")
        .select("rating")
        .eq("product_id", product?.id);

      if (error) throw error;

      if (data && data.length > 0) {
        const ratings = data.map((item) => item.rating);
        const totalRatings = ratings.length;
        const sumRatings = ratings.reduce((sum, current) => sum + current, 0);
        const averageRating = sumRatings / totalRatings;

        const { error: updateError } = await supabase
          .from("products")
          .update({
            rating_average: averageRating.toFixed(1),
            rating_count: totalRatings,
          })
          .eq("id", product?.id);

        if (updateError) throw updateError;

        toast.success("Product review successfully updated!");

        const updatedProduct = {
          ...product,
          rating_average: averageRating.toFixed(1),
          rating_count: totalRatings,
        };
        setProduct(updatedProduct);
      }
    } catch (error) {
      console.error("An error occurred while updating the score:", error);
      toast.error("An error occurred during the update.");
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
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={
                product?.rating_average ? Number(product?.rating_average) : 0
              }
              onChange={handleRating}
            />

            <p>
              <ViewIcon />
              <p>{product.view}</p>
            </p>
          </div>
          <p className="categories">
            {product?.productsCategories
              .map((x) => x?.categories?.name)
              .join(", ")}
          </p>
          <p className="description">{product?.content}</p>
          <div className="sell">
            <p>
              Price: <span>${product?.price}</span>
            </p>

            <button onClick={addToBasket}>Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
