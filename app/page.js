import AllCategories from "@/components/all-categories";
import Body from "@/components/body";
import ProjectsPage from "@/components/projects";

export default function Home() {
  return (
    <div className="homeContainer">
      <Body />
      <AllCategories title={"xxx"} />
      <ProjectsPage />
    </div>
  );
}
