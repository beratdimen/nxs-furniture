import Image from "next/image";
import "./style.css";
import ReactStars from "react-rating-stars-component";
import { LikeIcon, ViewIcon } from "@/helpers/icons";
export default function ProductsItem() {
  return (
    <div className="textureCard">
      <Image src={"/img/9.jpg"} width={200} height={200} alt="card-img" />
      <button className="like">
        <LikeIcon />
      </button>
      <div className="content">
        <h4>İçerik Başlığı </h4>
        <div className="rating">
          <ReactStars count={5} size={24} activeColor="#ffd700" />
          <p>
            <ViewIcon />
            <p>25</p>
          </p>
        </div>
        <p className="description">buraya ürün açıklaması gelecek</p>
        <div className="sell">
          <p>
            Price: <span>$255</span>
          </p>

          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
