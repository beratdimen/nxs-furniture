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
  const [projects, setProjects] = useState();
  const [selectedProject, setSelectedProject] = useState(null);

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
          {projects?.map((proj) => (
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

      <AddProjectModal addProject={addProject} listProjects={listProjects} />
      <ProjectEditModal
        project={selectedProject}
        listProjects={listProjects}
        editProjectRef={editProjectRef}
      />
    </div>
  );
}
