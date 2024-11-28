// "use client";
// import { createClient } from "@/utils/supabase/client";
// import { useEffect, useState } from "react";

// export default function ProductsEditModal({
//   product,
//   listProducts,
// }) {
//   const supabase = createClient();
//   const [imagePreview, setImagePreview] = useState(product?.image_url || "");
//   const [selectedCategories, setSelectedCategories] = useState(
//     product?.categories || []
//   );
//   const formRef = useRef(null);

//   const closeModal = () => {
//     if (newCategories.current) {
//       newCategories.current.close();
//       setIsActive(false);
//     } }

//   useEffect(() => {
//     if (product) {
//       setImagePreview(product?.image_url);
//     }
//   }, [product]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const formObj = Object.fromEntries(formData);

//     try {
//       if (formObj.image_url instanceof File) {
//         const filePath = `${Date.now()}_${formObj?.image_url?.name}`;
//         const { data: imgData, error: imgError } = await supabase.storage
//           .from("products")
//           .upload(filePath, formObj.image_url);

//         if (imgError) throw imgError;

//         formObj?.image_url = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}/products/${imgData.path}`;
//       }

//       const { error } = await supabase
//         .from("products")
//         .update(formObj)
//         .eq("id", product?.id);

//       if (error) throw error;

//       toast.success("Ürün güncellendi!");
//       listProducts();
//       closeModal();
//     } catch (error) {
//       toast.error("Güncelleme başarısız: " + error.message);
//     }
//   };

//   return (
//     <dialog open>
//       <form ref={formRef} onSubmit={handleSubmit}>
//         <input type="text" name="title" defaultValue={product.title} required />
//         <textarea name="content" defaultValue={product.content} required />

//         <div>
//           <label>Cover Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             name="image_url"
//             onChange={(e) =>
//               setImagePreview(URL.createObjectURL(e.target.files[0]))
//             }
//           />
//           {imagePreview && <img src={imagePreview} alt="Preview" width={100} />}
//         </div>

//         <input
//           type="number"
//           name="price"
//           defaultValue={product.price}
//           required
//         />
//         <input type="text" name="material" defaultValue={product.material} />
//         <input type="text" name="style" defaultValue={product.style} />
//         <input type="text" name="color" defaultValue={product.color} />
//         <input type="text" name="width" defaultValue={product.width} />
//         <input type="text" name="height" defaultValue={product.height} />

//         <button type="submit">Kaydet</button>
//         <button type="button" onClick={closeModal}>
//           Kapat
//         </button>
//       </form>
//     </dialog>
//   );
// }
