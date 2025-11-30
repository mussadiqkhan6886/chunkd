"use client";

import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import imageCompression from "browser-image-compression";

const AddProduct = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [data, setData] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    category: "classic",
    images: [] as string[],
    allergens: [] as string[],
    storage: "",
    heating: ""
  });

  // Slug generator
  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  // Auto computed slugs
  const productSlug = useMemo(() => toSlug(data.title), [data.title]);

  // Update slugs into state ONLY when needed
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      slug: productSlug,
    }));
  }, [productSlug]);

  // Generic input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append all fields
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, JSON.stringify(item)));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Compress images before upload
      for (const file of files) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        formData.append("images", compressedFile);
      }

      const res = await axios.post("/api/products", formData);


      if (res.status === 201) {
        setResult("✅ Product added successfully!");
        setData({
          slug: "",
          title: "",
          description: "",
          price: "",
          images: [],
          allergens: [],
          storage: "",
          heating: "",
          category: "classic"
        });
        setFiles([]);
        setPreviews([]);
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col items-center lg:px-20 md:px-17 px-5">
      <h1 className="text-2xl font-bold mb-6">Add New Cookie</h1>

      <form className="grid gap-4 w-full md:w-[50%]" onSubmit={handleSubmit}>
        {/* Collection */}
        <div>
          <label className="block font-semibold mb-1">Type: </label>
          <input
            name="category"
            value={data.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 cursor-not-allowed bg-gray-100"
            readOnly
          />
        </div>
        {/* Product Name & Slug */}
        <div>
          <label className="block font-semibold mb-1">Cookie Name</label>
          <input
            name="title"
            value={data.title}
            onChange={handleChange}
            type="text"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Slug</label>
          <input
            name="slug"
            value={data.slug}
            readOnly
            className="w-full border rounded-lg p-2 cursor-not-allowed bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            name="price"
            type="number"
            value={data.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

       <div>
        <label className="block font-semibold mb-1">Allergies</label>
        <input
          name="allergens"
          type="text"
          placeholder="allergens separate by comma, e.g (milk, egg)"
          value={data.allergens.join(", ")} // display array as comma-separated string
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              allergens: e.target.value.split(",").map(item => item.trim()), // update array
            }))
          }
          className="w-full border rounded-lg p-2"
          required
        />
      </div>
        <div>
          <label className="block font-semibold mb-1">Heating</label>
          <input
            name="heating"
            type="text"
            value={data.heating}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div> 
        <div>
          <label className="block font-semibold mb-1">Storage</label>
          <input
            name="storage"
            type="text"
            value={data.storage}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>



        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Cookie Images</label>
          <input type="file" multiple accept="image/*" required onChange={handleImageChange} className="w-full border rounded-lg p-2" />
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {previews.map((url, idx) => (
                <Image key={idx} src={url} width={80} height={80} alt={`Preview ${idx}`} className="w-28 h-28 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 mt-4 rounded">
          {loading ? "Uploading..." : "Add Cookie"}
        </button>
        <p>{result}</p>
      </form>
    </main>
  );
};

export default AddProduct;
