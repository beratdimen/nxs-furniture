"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ProjectEditModal({
  projectRef,
  project,
  listProjects,
}) {
  const supabase = createClient();
  const [isActive, setIsActive] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (project) {
      setIsActive(true);
    }
  }, [project]);

  const close = () => {
    if (projectRef.current) {
      projectRef.current.close();
      setIsActive(false);
    }

    if (formRef) {
      formRef.current.reset();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));

    const { data, error } = await supabase
      .from("projects")
      .update(formObj)
      .eq("id", project?.id)
      .select();

    if (data) {
      toast.success("Kategori güncellendi");
      listProjects();
      close();
    } else {
      toast.error("Kategori güncellenemedi");
    }
  }

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={close}
      ></div>

      <dialog ref={projectRef} open={isActive}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            required
            defaultValue={project?.title}
          />
          <input
            type="text"
            name="view"
            placeholder="Project View"
            required
            defaultValue={project?.view}
          />
          <button type="submit">Save</button>
        </form>
        <button onClick={close}>Close</button>
      </dialog>
    </>
  );
}