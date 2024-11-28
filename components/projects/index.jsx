"use client";
import { listAllProjects } from "@/api/category";
import { LikeIcon, ViewIcon } from "@/helpers/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const listProducts = async () => {
      const responseProducts = await listAllProjects();
      setProject(responseProducts);
      console.log(responseProducts, "Fetched Projects");
    };

    listProducts();
  }, []);

  return (
    <div className="textureCard">
      {project.length > 0 ? (
        project.map((x) => (
          <div key={x.id} className="project-card">
            <Image
              src={x.image_url}
              width={200}
              height={200}
              alt={x.title || "Project Image"}
            />
            <button className="like">
              <LikeIcon />
            </button>

            <div className="content">
              <h4>{x.title}</h4>
              <p>
                <ViewIcon />
                {x.view || 0}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
}
