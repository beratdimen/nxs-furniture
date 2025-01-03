import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/helpers/icons";
import "./style.css";

export default function Footer() {
  return (
    <>
      <div className="footerContainer">
        <ul>
          <h5>About</h5>
          <li>Company</li>
          <li>Comunutiy</li>
          <li>Careers</li>
        </ul>
        <ul>
          <h5>Blog</h5>
          <li>Company</li>
          <li>Comunutiy</li>
          <li>Careers</li>
        </ul>
        <ul>
          <h5>Product</h5>
          <li>Company</li>
          <li>Comunutiy</li>
          <li>Careers</li>
        </ul>
        <div className="logo">
          <img src="./img/logo-bakir.png" alt="" />
          <div className="social">
            <FacebookIcon />
            <InstagramIcon />
            <LinkedinIcon />
          </div>
        </div>
      </div>

      <div className="altFooter">
        <p>24 Atlantic Ave , Broklyn, NY 11201</p>
        <p>c 2016 Dreamy Inc. All rights reserved</p>
      </div>
    </>
  );
}
