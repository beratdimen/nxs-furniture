"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useRef, useState } from "react";

import "./style.css";
import AddCategoriesModal from "@/components/add-categories-modal";
import { toast } from "sonner";
import { AddProductsIcon, DeleteIcon, EditIcon } from "@/helpers/icons";
import CategoriesEditModal from "@/components/edit-categories-modal";
export default function CategoriesPage() {
  const supabase = createClient();
  const [categoriess, setCategoriess] = useState();
  const newCategories = useRef(null);
  const editCategories = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const listCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");

    if (!error) setCategoriess(data);
    console.log(categoriess);
  };

  useEffect(() => {
    listCategories();
  }, []);

  async function handleDelete(id) {
    const isConfirmed = window.confirm(
      "Bu ürünü silmek istediğinize emin misiniz?"
    );

    if (isConfirmed) {
      const { error } = await supabase.from("categories").delete().eq("id", id);

      if (!error) {
        listCategories();
        toast.success("Ürün Silindi");
      } else {
        toast.error("Silme işlemi başarısız");
      }
    }
  }

  function handleClick() {
    if (newCategories.current) {
      newCategories.current.showModal();
    }
    console.log("tıklandım");
  }

  function handleEdit(category) {
    setSelectedCategory(category);
    if (editCategories.current) {
      editCategories.current.showModal();
    }
  }

  return (
    <div className="addProductContainer">
      <div className="head">
        <h1>Categories Page</h1>
        <button className="add" onClick={handleClick}>
          Add Category <AddProductsIcon />
        </button>
      </div>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th colSpan={2}>Actions</th>
          </tr>

          {categoriess?.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>
                <button onClick={() => handleDelete(cat.id)}>
                  <DeleteIcon />
                </button>
              </td>
              <td>
                <button onClick={() => handleEdit(cat)}>
                  <EditIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCategoriesModal
        newCategories={newCategories}
        listCategories={listCategories}
      />

      <CategoriesEditModal
        editCategories={editCategories}
        category={selectedCategory}
        listCategories={listCategories}
      />
    </div>
  );
}
