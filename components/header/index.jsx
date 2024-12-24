import { BasketIcon, UserIcon } from "@/helpers/icons";
import "./style.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/actions/actions";
import { basketItems, listCategoriesForHeader } from "@/api/category";
import SearchComponent from "../search";
import HeaderNav from "./hamburger";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const categories = await listCategoriesForHeader();

  const getBasketCount = async (user) => {
    const basketItemsData = await basketItems(user);

    if (!basketItemsData || basketItemsData.length === 0) {
      return 0;
    }

    const totalQuantity = basketItemsData.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    return totalQuantity;
  };

  const basketCount = await getBasketCount(user);

  return (
    <div className="headerContainer">
      <div className="headerContent">
        <Link href={"/"}>
          <img src="/img/logo-bakir.png" alt="Logo" />
        </Link>
        <HeaderNav categories={categories || []} />

        <div className="headerRight">
          <Link href={"/basket"}>
            <div className="basketWrapper">
              <BasketIcon />
              {basketCount > 0 && <span className="badge">{basketCount}</span>}
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
        </div>
      </div>
      <SearchComponent />
    </div>
  );
}
