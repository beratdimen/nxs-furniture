"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const defaultUserMetadata = {
  firstName: "",
  role: "customer",
};

export async function login(formData) {
  const supabase = createClient();
  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  console.log("giriş oldum");

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        ...defaultUserMetadata,
        firstName: formData.name,
      },
    },
  };

  const { error } = supabase.auth.signUp(data);

  console.log("kayıt oldu");

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
