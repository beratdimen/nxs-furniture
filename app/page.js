import AllCategories from "@/components/all-categories";
import Body from "@/components/body";
import OrderKnowladge from "@/components/order-knowladge";
import ProjectsPage from "@/components/projects";

export default async function Home() {
  return (
    <div className="homeContainer">
      <Body />
      <AllCategories />
      <OrderKnowladge />
      <ProjectsPage />
    </div>
  );
}
