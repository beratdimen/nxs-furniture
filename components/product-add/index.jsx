import { useEffect, useState } from "react";
import "./style.css";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function ProductAdd() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    debugger;
    const filePath = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("products")
      .upload(filePath, file);

    console.log("data :>> ", data);

    if (error) console.log("error :>> ", error);
  };

  const imageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    setFile(file);

    console.log("file :>> ", file);

    if (file) {
      const objectURL = URL.createObjectURL(file);

      console.log("objectURL :>> ", objectURL);

      setImage(objectURL);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formCont">
      <p>Title</p>
      <input type="text" name="title" />
      <p>Desc.</p>

      <textarea name="content" id=""></textarea>

      <p>İmg.</p>

      <img src={image} alt="" />

      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={(e) => imageChange(e)}
      />

      <button>Gönder</button>
    </form>
  );
}
