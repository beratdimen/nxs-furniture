"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const defaultUserMetadata = {
  firstName: "",
  role: "admin",
};

export async function login(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
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
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: {
        ...defaultUserMetadata,
        firstName: formData.get("name"),
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

export default async function FormValidation(prevState, formData) {
  const formObj = Object.fromEntries(formData);

  const errors = {
    fullName: !formObj.fullName && "Full Name is required.",
    address: !formObj.address && "Address is required.",
    city: !formObj.city && "City is required.",
    postalCode: !formObj.postalCode && "Postal Code is required.",
  };
  console.log(errors, "eroorrr");

  const filteredErrors = Object.fromEntries(
    Object.entries(errors).filter(([_, v]) => v)
  );

  if (Object.keys(filteredErrors).length > 0) {
    return { error: filteredErrors };
  }
}
