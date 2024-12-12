import Image from "next/image";
import "./style.css";
export default function Empty() {
  return (
    <div className="empty">
      <Image src={"/img/bag.png"} width={300} height={300} alt="Empty Cart" />
      <h3>Cart is Empty</h3>
      <p>You havent added any products yet. Lets start shopping!</p>
    </div>
  );
}
