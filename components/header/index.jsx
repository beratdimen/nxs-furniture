import { BasketIcon, UserIcon } from "@/helpers/icons";
import "./style.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/actions/actions";
import { basketItems, listCategoriesForHeader } from "@/api/category";
import SearchComponent from "../search";
import HeaderNav from "./hamburger";
import BasketCount from "./basket-count";

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
          <img src="/img/logo-bakir.png" alt="Logo" />
        </Link>
        <HeaderNav categories={categories || []} />

        <div className="headerRight">
          <BasketCount user={user} />
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
        </div>
      </div>
      <SearchComponent />
    </div>
  );
}
