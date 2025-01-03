"use client";
import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function AddProjectModal({ addProject, listProjects }) {
  const supabase = createClient();
  const [isActive, setIsActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [otherFiles, setOtherFiles] = useState(null);
  const formRef = useRef(null);

  const handleOtherImagesChange = (e) => {
    const selectedFile = e.target.files;
    setOtherFiles(selectedFile);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImagePreview(objectURL);
    }
  };

  const closeModal = () => {
    if (addProject.current) {
      addProject.current.close();
      setIsActive(false);
    }

    if (formRef.current) {
      formRef.current.reset();
    }
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (file) {
        const filePath = `${Date.now()}_${file.name}`;
        const { data: imgData, error: imgError } = await supabase?.storage
          .from("projects")
          .upload(filePath, file);

        if (imgData) {
          formData.append(
            "image_url",
            `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}/projects/${imgData.path}`
          );
        }

        if (imgError) throw new Error("Image upload failed");

        console.log("Image uploaded: ", imgData);
      }

      const formObj = Object.fromEntries(formData);

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert([formObj])
        .select()
        .single();

      if (projectError) throw new Error("project insertion failed");

      toast.success("Product Added");

      if (otherFiles) {
        for (const file of otherFiles) {
          const filePath = `${Date.now()}_${file.name}`;
          const { data: imgData, error: imgError } = await supabase?.storage
            .from("projects")
            .upload(filePath, file);

          if (imgError) {
            console.error("Error uploading file:", imgError);
          } else {
            const { data: projectImages } = await supabase
              .from("project_images")
              .insert([
                {
                  project_id: projectData?.id,
                  image_url: `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}/projects/${imgData.path}`,
                },
              ])
              .select()
              .single();
            console.log("Uploaded file:", imgData);
          }
        }
      }

      listProjects();
      closeModal();
    } catch (error) {
      toast.error(error?.message);
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={closeModal}
      ></div>

      <dialog ref={addProject}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" required />

          <input type="number" name="view" placeholder="View" required />
          <div>
            <label>Cover Url:</label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              name="image_url"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" width={100} />
            )}
          </div>

          <div>
            <label>Other İmages:</label>
            <input
              multiple
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleOtherImagesChange}
            />
          </div>

          <button type="submit">Kaydet</button>
          <button type="button" onClick={closeModal}>
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
