"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function CategoriesEditModal({
  editCategories,
  category,
  listCategories,
}) {
  const supabase = createClient();
  const [isActive, setIsActive] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (category) {
      setIsActive(true);
    }
  }, [category]);

  const close = () => {
    if (editCategories.current) {
      editCategories.current.close();
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
      .from("categories")
      .update(formObj)
      .eq("id", category?.id)
      .select();

    if (data) {
      toast.success("Category updated");
      listCategories();
      close();
    } else {
      toast.error("Category could not be updated");
    }
  }

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={close}
      ></div>

      <dialog ref={editCategories} open={isActive}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            required
            defaultValue={category?.name}
          />
          <input
            type="text"
            name="slug"
            placeholder="Category Slug"
            required
            defaultValue={category?.slug}
          />
          <button type="submit">Save</button>
        </form>
        <button onClick={close}>Close</button>
      </dialog>
    </>
  );
}
