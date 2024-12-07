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
import { listCategoriesForHeader } from "@/api/category";
import SearchComponent from "../search";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const categories = await listCategoriesForHeader();
  return (
    <div className="headerContainer">
      <div className="headerContent">
        <Link href={"/"}>
          <h1>LOGO</h1>
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
            <BasketIcon /> Sepetim
          </Link>
          {user ? (
            <>
              <p>{user.user_metadata.firstName}</p>
              <form action={signout}>
                <button>
                  <LogoutIcon />
                </button>
              </form>
            </>
          ) : (
            <Link href={"/login"}>
              <UserIcon /> Giriş Yap
            </Link>
          )}

          <button className="hamburger">
            <HamburgerIcon />
          </button>
        </div>
      </div>
      {/* <div className="search">
        <SearchIcon />
        <input type="text" placeholder="Search in website.." />
        <button>Search</button>
      </div> */}
      <SearchComponent />
    </div>
  );
}
