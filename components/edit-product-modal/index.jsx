"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ProductsEditModal({
  editProduct,
  product,
  listProducts,
}) {
  const supabase = createClient();
  const [isActive, setIsActive] = useState(false);
  const formRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (product) {
      setIsActive(true);
    }
  }, [product]);

  const close = () => {
    if (editProduct.current) {
      editProduct.current.close();
      setIsActive(false);
    }

    if (formRef) {
      formRef.current.reset();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

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

    const { data, error } = await supabase
      .from("products")
      .update(formObj)
      .eq("id", product?.id)
      .select();

    if (data) {
      toast.success("Category updated");
      listProducts();
      close();
    } else {
      toast.error("Category could not be updated");
    }
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImagePreview(objectURL);
    }
  };

  return (
    <>
      <div
        className={`modal-backdrop ${isActive ? "active" : ""}`}
        onClick={close}
      ></div>

      <dialog ref={editProduct} open={isActive}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            defaultValue={product?.title}
            required
          />
          <textarea name="content" defaultValue={product?.content} required />

          <div>
            <label>Cover Image:</label>
            <input
              type="file"
              accept="image/*"
              name="image_url"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" width={100} />
            )}
          </div>

          <input
            type="number"
            name="price"
            defaultValue={product?.price}
            required
          />
          <input type="text" name="material" defaultValue={product?.material} />
          <input type="text" name="style" defaultValue={product?.style} />
          <input type="text" name="color" defaultValue={product?.color} />
          <input type="text" name="width" defaultValue={product?.width} />
          <input type="text" name="height" defaultValue={product?.height} />

          <button type="submit">Kaydet</button>
          <button type="button" onClick={close}>
            Kapat
          </button>
        </form>
      </dialog>
    </>
  );
}
