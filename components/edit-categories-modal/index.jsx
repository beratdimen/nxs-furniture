"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function CategoriesEditModal({
  newCategories,
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
    if (newCategories.current) {
      newCategories.current.close();
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
      toast.success("Kategori güncellendi");
      listCategories();
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

      <dialog ref={newCategories} open={isActive}>
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
