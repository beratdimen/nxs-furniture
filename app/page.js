import AllCategories from "@/components/all-categories";
import Body from "@/components/body";
import OrderKnowladge from "@/components/order-knowladge";
import ProjectsPage from "@/components/projects";

export default function Home() {
  return (
    <div className="homeContainer">
      <Body />
      <AllCategories />
      <ProjectsPage />

      <OrderKnowladge />
    </div>
  );
}