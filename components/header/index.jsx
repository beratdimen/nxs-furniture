import {
  BasketIcon,
  HamburgerIcon,
  LogoutIcon,
  SearchIcon,
  UserIcon,
} from "@/helpers/icons";
import "./style.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/actions/actions";
import { basketItems, listCategoriesForHeader } from "@/api/category";
import SearchComponent from "../search";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const categories = await listCategoriesForHeader();
  const basketCount = await basketItems(user);
  return (
    <div className="headerContainer">
      <div className="headerContent">
        <Link href={"/"}>
          <img src="/img/logo-bakir.png" alt="" />
        </Link>

        <ul className="nav">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          {categories?.map((category) => (
            <Link href={`/${category?.slug}`} key={category?.id}>
              <li>{category?.name}</li>
            </Link>
          ))}
        </ul>
        <div className="headerRight">
          <Link href={"/basket"}>
            <div className="basketWrapper">
              <BasketIcon />
              {basketItems?.length > 0 && (
                <span className="badge">{basketItems?.length}</span>
              )}
            </div>
          </Link>
          {user ? (
            <div className="userMenu">
              <p className="userHover">
                <UserIcon /> {user?.user_metadata?.firstName}
              </p>
              <div className="dropdownMenu">
                <Link href={"/my-orders"}>My Orders</Link>
                <form action={signout}>
                  <button>Logout</button>
                </form>
              </div>
            </div>
          ) : (
            <Link href={"/login"}>
              <UserIcon /> Login
            </Link>
          )}

          <button className="hamburger">
            <HamburgerIcon />
          </button>
        </div>
      </div>
      <SearchComponent />
    </div>
  );
}
