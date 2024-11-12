"use client";
import Image from "next/image";
import "./style.css";
import ReactStars from "react-rating-stars-component";
import { LikeIcon, ViewIcon } from "@/helpers/icons";

export default function Textures() {
  return (
    <div className="textureContainer">
      <h5>textures</h5>
      <h2>NEW TEXTURES</h2>
      <div className="textureCard">
        <button className="like">
          <LikeIcon />
        </button>
        <Image src={"/img/9.jpg"} width={200} height={200} alt="card-img" />

        <div className="content">
          <h4>İçerik Başlığı </h4>
          <div className="rating">
            <ReactStars count={5} size={24} activeColor="#ffd700" />
            <p>
              <ViewIcon />
              25
            </p>
          </div>
          <div className="contentDescription">
            <p>buraya ürün açıklaması gelecek</p>
          </div>

          <div className="sell">
            <p>
              Price: <span>$255</span>
            </p>

            <button>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
