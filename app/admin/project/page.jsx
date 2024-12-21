"use client";
import AddProjectModal from "@/components/add-project-modal";
import { AddProductsIcon, DeleteIcon, EditIcon } from "@/helpers/icons";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import { listAllProjects } from "@/api/category";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import ProjectEditModal from "@/components/edit-project-modal";

export default function ProjectPages() {
  const supabase = createClient();

  const addProject = useRef(null);
  const editProjectRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  function handleClickModal() {
    if (addProject.current) {
      addProject.current.showModal();
    }
  }

  const listProjects = async () => {
    const responseProjects = await listAllProjects();
    setProjects(responseProjects);
    console.log("responseProjects :>> ", responseProjects);
  };

  useEffect(() => {
    listProjects();
  }, []);

  async function handleDelete(id) {
    const isConfirmed = window.confirm(
      "Bu ürünü silmek istediğinize emin misiniz?"
    );
    if (isConfirmed) {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (!error) {
        listProjects();
        toast.success("Ürün Silindi");
      } else {
        toast.error("Silme işlemi başarısız");
      }
    }
  }

  function handleEdit(project) {
    setSelectedProject(project);
    if (editProjectRef.current) {
      editProjectRef.current.showModal();
    }
  }

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="addProductContainer">
      <div className="head">
        <h1>Projects Page</h1>
        <button className="add" onClick={() => handleClickModal()}>
          Add Project <AddProductsIcon />
        </button>
      </div>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>View</th>
            <th>Image</th>
            <th colSpan={2}>Actions</th>
          </tr>
          {currentProjects.map((proj) => (
            <tr key={proj.id}>
              <td>{proj.title}</td>
              <td>{proj.view}</td>
              <td>
                <img src={proj.image_url} alt="" />
              </td>
              <td>
                <button onClick={() => handleDelete(proj.id)}>
                  <DeleteIcon />
                </button>
              </td>
              <td>
                <button onClick={() => handleEdit(proj)}>
                  <EditIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <AddProjectModal addProject={addProject} listProjects={listProjects} />
      <ProjectEditModal
        project={selectedProject}
        listProjects={listProjects}
        editProjectRef={editProjectRef}
      />
    </div>
  );
}
