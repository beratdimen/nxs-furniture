import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/helpers/icons";
import "./style.css";

export default function Footer() {
  return (
    <div className="footerContainer">
      <ul>
        <h2>About</h2>
        <li>Company</li>
        <li>Comunutiy</li>
        <li>Careers</li>
      </ul>
      <ul>
        <h2>Blog</h2>
        <li>Company</li>
        <li>Comunutiy</li>
        <li>Careers</li>
      </ul>
      <ul>
        <h2>Product</h2>
        <li>Company</li>
        <li>Comunutiy</li>
        <li>Careers</li>
      </ul>
      <div className="logo">
        <h2>LOGO</h2>
        <div className="social">
          <FacebookIcon />
          <InstagramIcon />
          <LinkedinIcon />
        </div>
      </div>
    </div>
  );
}
