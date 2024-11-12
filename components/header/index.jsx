import {
  BasketIcon,
  HamburgerIcon,
  SearchIcon,
  UserIcon,
} from "@/helpers/icons";
import "./style.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className="headerContainer">
      <div className="headerContent">
        <h1>LOGO </h1>

        <ul className="nav">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <Link href={"texture"}>
            <li>Textures</li>
          </Link>
          <Link href={"/models"}>
            <li>Models</li>
          </Link>
          <Link href={"/scenes"}>
            <li>Scenes</li>
          </Link>
        </ul>
        <div className="headerRight">
          <button>
            <BasketIcon />
          </button>
          <button>
            <UserIcon />
          </button>

          <button className="hamburger">
            <HamburgerIcon />
          </button>
        </div>
      </div>
      <div className="search">
        <SearchIcon />
        <input type="text" placeholder="Search in website.." />
        <button>Search</button>
      </div>
    </div>
  );
}
