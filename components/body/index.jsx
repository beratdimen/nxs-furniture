import Image from "next/image";
import "./style.css";

export default function Body() {
  return (
    <div className="bodyContainer">
      <Image src="/img/1.jpg" width={600} height={600} alt="slider1" />
      <Image src="/img/2.jpg" width={600} height={600} alt="slider1" />
    </div>
  );
}
