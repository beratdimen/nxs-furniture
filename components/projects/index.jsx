"use client";
import { listAllProjects, viewProject } from "@/api/category";
import { DisLikeIcon, LikeIcon, ViewIcon } from "@/helpers/icons";
import { useEffect, useState } from "react";
import "./style.css";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [projectLikes, setProjectLikes] = useState({});
  const supabase = createClient();

  useEffect(() => {
    const userFetch = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data);
    };
    userFetch();
  }, []);

  useEffect(() => {
    const listProjects = async () => {
      const responseProject = await listAllProjects();
      setProjects(responseProject);
      console.log(responseProject, "Fetched Projects");
    };
    listProjects();
  }, []);

  const likeProduct = async (projectId) => {
    if (user) {
      const { data, error } = await supabase
        .from("project_likes")
        .insert([{ user_id: user?.user?.id, project_id: projectId }]);

      if (!error) {
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.id === projectId
              ? { ...proj, like_count: proj.like_count + 1 }
              : proj
          )
        );
        setProjectLikes((prev) => ({ ...prev, [projectId]: true }));
        toast.success("Beğenildi");
      } else {
        console.log("error :>> ", error);
      }
    } else {
      toast.error("Giriş Yapmalısınız");
    }
  };

  const deleteProductLike = async (projectId) => {
    if (user) {
      const { error } = await supabase
        .from("project_likes")
        .delete()
        .eq("user_id", user?.user?.id)
        .eq("project_id", projectId);

      if (!error) {
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.id === projectId
              ? { ...proj, like_count: proj.like_count - 1 }
              : proj
          )
        );
        setProjectLikes((prev) => ({ ...prev, [projectId]: false }));
        toast.success("Beğeni kaldırıldı");
      } else {
        console.log("error :>> ", error);
      }
    }
  };

  useEffect(() => {
    const likeControl = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("project_likes")
          .select("*")
          .eq("user_id", user?.user?.id);

        if (!error) {
          const likes = {};
          data.forEach((like) => {
            likes[like.project_id] = true;
          });
          setProjectLikes(likes);
        } else {
          console.log(error);
        }
      }
    };
    likeControl();
  }, [user, projects]);

  const openModal = async (project, id) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);

    const { data, error } = await viewProject(id);

    if (!error && data) {
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj.id === id ? { ...proj, view: proj.view + 1 } : proj
        )
      );
    } else {
      console.log("View update error:", error);
    }
  };

  useEffect(() => {
    viewProject();
  }, []);

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < selectedProject.project_images.length ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0
        ? prevIndex - 1
        : selectedProject.project_images.length - 1
    );
  };

  return (
    <div className="projects">
      {projects.length > 0 ? (
        projects.map((x) => (
          <div key={x.id} className="card">
            <div className="image-container" onClick={() => openModal(x, x.id)}>
              <figure>
                <img src={x?.image_url} alt={x?.title} loading="lazy" />
              </figure>
              <div className="gradient-cover">
                <div className="overlay-content">
                  <h2>
                    <a href="/">{x?.title}</a>
                  </h2>
                  <div className="icons">
                    <button
                      className="icon-button"
                      onClick={() =>
                        projectLikes[x.id]
                          ? deleteProductLike(x.id)
                          : likeProduct(x.id)
                      }
                    >
                      <span>
                        {projectLikes[x.id] ? <DisLikeIcon /> : <LikeIcon />}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="info">
              <img className="avatar" src={x?.image_url} alt="Avatar" />
              <span className="text">NZL Furniture</span>
              <span className="chip">New</span>
              <button
                className="link"
                onClick={() =>
                  projectLikes[x.id]
                    ? deleteProductLike(x.id)
                    : likeProduct(x.id)
                }
              >
                <span>
                  {projectLikes[x.id] ? <DisLikeIcon /> : <LikeIcon />}
                </span>
                {x.like_count}
              </button>
              <button className="link">
                <span>
                  <ViewIcon />
                </span>
                {x.view}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found</p>
      )}

      {selectedProject && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedProject.project_images[currentImageIndex].image_url}
              alt={`Image ${currentImageIndex}`}
              className="modal-image"
            />
            <button className="prev" onClick={prevImage}>
              &#10094;
            </button>
            <button className="next" onClick={nextImage}>
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
