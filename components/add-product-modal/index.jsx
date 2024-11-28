import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function AddModal({ newProduct, listProducts }) {
  const supabase = createClient();
  const [isActive, setIsActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [otherFiles, setOtherFiles] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (data) {
        setCategories(data);
      } else {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

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
    if (newProduct.current) {
      newProduct.current.close();
      setIsActive(false);
    }
    if (formRef.current) {
      formRef.current.reset();
    }
    setImagePreview(null);
    setSelectedCategories([]);
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      parseInt(option.value)
    );
    setSelectedCategories(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (file) {
        const filePath = `${Date.now()}_${file.name}`;
        const { data: imgData, error: imgError } = await supabase.storage
          .from("products")
          .upload(filePath, file);

        if (imgData) {
          formData.append(
            "image_url",
            `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}/products/${imgData.path}`
          );
        }

        if (imgError) throw new Error("Image upload failed");

        console.log("Image uploaded: ", imgData);
      }

      const formObj = Object.fromEntries(formData);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([formObj])
        .select()
        .single();

      if (productError) throw new Error("Product insertion failed");

      toast.success("Ürün Eklendi");

      if (otherFiles) {
        for (const file of otherFiles) {
          const filePath = `${Date.now()}_${file.name}`;
          const { data: imgData, error: imgError } = await supabase.storage
            .from("products")
            .upload(filePath, file);

          if (imgError) {
            console.error("Error uploading file:", imgError);
          } else {
            const { data: productImages } = await supabase
              .from("product_images")
              .insert([
                {
                  product_id: productData?.id,
                  image_url: `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}/products/${imgData.path}`,
                },
              ])
              .select()
              .single();
            console.log("Uploaded file:", imgData);
          }
        }
      }

      const categoryRelations = selectedCategories.map((categoryId) => ({
        product_id: productData.id,
        category_id: categoryId,
      }));

      const { error: categoryError } = await supabase
        .from("productsCategories")
        .insert(categoryRelations);

      if (categoryError) throw new Error("Categories insertion failed");

      listProducts();
      closeModal();
    } catch (error) {
      toast.error(error.message);
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={closeModal}
      ></div>

      <dialog ref={newProduct}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" required />
          <input type="text" name="content" placeholder="Content" required />

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

          <input type="number" name="price" placeholder="Price" required />

          <select
            value={selectedCategories}
            onChange={handleCategoryChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input type="text" name="material" placeholder="Material" />
          <input type="text" name="style" placeholder="Style" />
          <input type="text" name="color" placeholder="Color" />
          <input type="text" name="width" placeholder="Width" />
          <input type="text" name="height" placeholder="Height" />

          <button type="submit">Kaydet</button>
          <button type="button" onClick={closeModal}>
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
