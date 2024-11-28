import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const listProductsForCategory = async (slug) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select(
        `
        *,
        productsCategories (
          products (
            *,
            productsCategories (
              categories (*)
            )
          )
        )
      `
      )
      .eq("slug", slug)
      .single();

    if (error) console.log(error);

    if (!data) console.log("Category not found");

    const products = data.productsCategories.map((item) => ({
      ...item.products,
      categories: item.products.productsCategories.map((pc) => pc.categories),
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    return [];
  }
};

export const listProductsAllCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select(
      `
          *,
          productsCategories (
            products (
              *,
              productsCategories (
                categories (*)
              )
            )
          )
        `
    );

    if (error) {
      console.error("Error fetching categories and products:", error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log("No categories or products found");
      return [];
    }

    // Tüm kategoriler ve ürünleri ayıkla
    const categoriesWithProducts = data.map((category) => ({
      ...category,
      products: category.productsCategories.map((item) => ({
        ...item.products,
        categories: item.products.productsCategories.map((pc) => pc.categories),
      })),
    }));

    return categoriesWithProducts;
  } catch (error) {
    console.error(
      "Error fetching all products with categories:",
      error.message
    );
    return [];
  }
};

export const listAllProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select(
      `
          *,
          productsCategories (
           categories (*)
          ) , product_images(*)
      `
    );

    if (error) {
      console.error("Error fetching categories and products:", error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log("No categories or products found");
      return [];
    }

    return data;
  } catch (error) {
    console.error(
      "Error fetching all products with categories:",
      error.message
    );
    return [];
  }
};

export const listCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select(`*`);

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log("No categories found");
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching all categories:", error.message);
    return [];
  }
};

export const viewPost = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    const { error: updateError } = await supabase
      .from("products")
      .update({ view: (data.view || 0) + 1 })
      .eq("id", id);

    if (updateError) throw new Error(updateError.message);

    return {
      data,
    };
  } catch (err) {
    return { error: err.message };
  }
};

export const listAllProjects = async () => {
  try {
    const { data, error } = await supabase.from("projects").select(
      ` *,
          project_images(*)
      `
    );

    if (error) {
      console.error("Error fetching  projects:", error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log("No projects found");
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching all projects :", error.message);
    return [];
  }
};