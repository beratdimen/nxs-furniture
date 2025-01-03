import React, { useRef, useState } from "react";
import "./style.css";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function AddCategoriesModal({ newCategories, listCategories }) {
  const supabase = createClient();
  const [isActive, setIsActive] = useState(false);
  const formRef = useRef(null);

  const close = () => {
    if (newCategories.current) {
      newCategories.current.close();
      setIsActive(false);
    }

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));

    const { data, error } = await supabase
      .from("categories")
      .insert([formObj])
      .select()
      .single();

    if (data) {
      toast.success("category added");
      listCategories();
      close();
    } else {
      toast.error("adding category failed");
    }
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={close}
      ></div>

      <dialog ref={newCategories} open={isActive}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Category Name" required />
          <input type="text" name="slug" placeholder="Category Slug" required />
          <button type="submit">Save</button>
          <button type="button" onClick={close}>
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
