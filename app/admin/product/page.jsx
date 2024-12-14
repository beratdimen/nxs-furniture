"use client";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { listAllProducts } from "@/api/category";
import AddModal from "@/components/add-product-modal";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { AddProductsIcon, DeleteIcon, EditIcon } from "@/helpers/icons";
import ProductsEditModal from "@/components/edit-product-modal";

export default function ProductsPage() {
  const supabase = createClient();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const newProduct = useRef(null);
  const editProduct = useRef(null);

  const listProducts = async () => {
    const responseProducts = await listAllProducts();
    setProducts(responseProducts);
    console.log("responseProducts :>> ", responseProducts);
  };

  useEffect(() => {
    listProducts();
  }, []);

  function handleClick() {
    if (newProduct.current) {
      newProduct.current.showModal();
    }
  }

  async function handleDelete(id) {
    const isConfirmed = window.confirm(
      "Bu ürünü silmek istediğinize emin misiniz?"
    );

    if (isConfirmed) {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (!error) {
        listProducts();
        toast.success("Ürün Silindi");
      } else {
        toast.error("Silme işlemi başarısız");
      }
    }
  }

  const handleEdit = (product) => {
    setSelectedProduct(product);
    if (editProduct.current) {
      editProduct.current.showModal();
    }
  };

  return (
    <div className="addProductContainer">
      <div className="head">
        <h1>Products Page</h1>
        <button className="add" onClick={() => handleClick()}>
          Add Product <AddProductsIcon />
        </button>
      </div>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Content</th>
            <th>İmage</th>
            <th>Category</th>
            <th>Price</th>
            <th>View</th>
            <th>Material</th>
            <th>Style</th>
            <th>Color</th>
            <th>Width</th>
            <th>Height</th>
            <th colSpan={2}>Actions</th>
          </tr>

          {products.map((x) => (
            <tr key={x.id}>
              <td>{x.title}</td>
              <td>{x.content}</td>
              <td>
                <img src={x.image_url} alt={x.image_url} />
              </td>
              <td>
                {x.productsCategories
                  .map((category) => category.categories.name)
                  .join(", ")}
              </td>
              <td>{x.price}</td>
              <td>{x.view}</td>
              <td>{x.material}</td>
              <td>{x.style}</td>
              <td>{x.color}</td>
              <td>{x.width}</td>
              <td>{x.height}</td>
              <td>
                <button onClick={() => handleDelete(x.id)}>
                  <DeleteIcon />
                </button>
              </td>
              <td>
                <button onClick={() => handleEdit(x)}>
                  <EditIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddModal newProduct={newProduct} listProducts={listProducts} />
      <ProductsEditModal
        editProduct={editProduct}
        product={selectedProduct}
        listProducts={listProducts}
      />
    </div>
  );
}
