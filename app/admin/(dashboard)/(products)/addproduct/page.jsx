"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import Button from "@/components/Button";
import SelectComponent from "react-select";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function bookingPage() {
  //// general data
  const [ChildCategory, setChildCategory] = useState([]);

  ////select box data
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [SubCategoryOptions, setSubCategoryOptions] = useState([]);

  ////Selected Box data
  const [SelectedCategory, SelectedsetCategory] = useState("");
  const [SelectedSubCategory, SelectedsetSubCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [SelectedSubCategories, setSelectedSubCategories] = useState([]);

  ///  handling VARS
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ExistSubs, setExistSubs] = useState(false);
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  const [data, setData] = useState({
    categoryId: "",
    SubCategoryId: "",
    ProductName: "",
    Description: "",
    color: "",
    brand: "",
    images: [],
    price: 0,
    weight: 0,
    initialStock: 0,
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   const categoryValues = selectedCategories.map((category) => category.value);
  //   const subcategoryValues = SelectedSubCategories.map((subcategory) => subcategory.value);

  //   formData.append("categoryId", categoryValues);
  //   formData.append("SubCategoryId", subcategoryValues);
  //   formData.append("ProductName", data.ProductName);
  //   formData.append("Description", data.Description);
  //   formData.append("color", data.color);
  //   formData.append("brand", data.brand);

  //   for (let i = 0; i < selectedFiles2.length; i++) {
  //     formData.append("images", selectedFiles2[i]);
  //   }

  //   formData.append("price", data.price);
  //   formData.append("weight", data.weight);
  //   formData.append("initialStock", data.initialStock);

  //   try {
  //     const response = await axios.post("/api/products/addProduct", formData);
  //     console.log(response);
  //     if (response.data.success) {
  //       toast.success("Product added successfully");
  //       setData({
  //         categoryId: "",
  //         SubCategoryId: "",
  //         ProductName: "",
  //         Description: "",
  //         color: "",
  //         brand: "",
  //         images: [],
  //         price: 0,
  //         weight: 0,
  //         initialStock: 0,
  //       });
  //       setSelectedCategories([]);
  //       setSelectedSubCategories([]);
  //       setSelectedFiles2([]);
  //     } else {
  //       toast.error("Error adding product");
  //     }
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //     toast.error("Error adding product");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Populate formData
    const categoryValues = selectedCategories.map((category) => category.value);
    const subcategoryValues = SelectedSubCategories.map((subcategory) => subcategory.value);
    formData.append("categoryId", categoryValues);
    formData.append("SubCategoryId", subcategoryValues);
    formData.append("ProductName", data.ProductName);
    formData.append("Description", data.Description);
    formData.append("color", data.color);
    formData.append("brand", data.brand);
  
    // Add images
    for (let i = 0; i < selectedFiles2.length; i++) {
      formData.append("images", selectedFiles2[i]);
    }
  
    formData.append("price", data.price);
    formData.append("weight", data.weight);
    formData.append("initialStock", data.initialStock);
  
    try {
      const response = await axios.post("/api/products/addProduct", formData);
      if (response.data.success) {
        toast.success("Product added successfully");
  
        // Reset the form state
        setData({
          categoryId: "",
          SubCategoryId: "",
          ProductName: "",
          Description: "",
          color: "",
          brand: "",
          images: [],
          price: 0,
          weight: 0,
          initialStock: 0,
        });
        setSelectedCategories([]);
        setSelectedSubCategories([]);
        setSelectedFiles2([]);
        setTimeout(() => {
          window.location.reload();
        }
        , 2000);
      } else {
        toast.error("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };
  

  const handleFileChangeMultiple2 = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).filter((file) => file.type.startsWith("image/"));

    setSelectedFiles2((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/categories/getallcatsubcat/", {});

      const transformedCategories = response.data.categories.map((category) => ({
        value: category.id_cat,
        label: category.nom,
      }));
      const transformedSubCategories = response.data.subcategories.map((subcategory) => ({
        value: subcategory.id_subcat,
        id_cat: subcategory.categoryId,
        label: subcategory.nom,
      }));
      setLoading(false);

      setCategoryOptions(transformedCategories);
      setChildCategory(transformedSubCategories);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    }
  };

  const changeparent = (selectedCategories) => {
    setSelectedCategories(selectedCategories);

    const selectedCategoryIds = selectedCategories.map((cat) => cat.value);

    const filteredSubCategories = ChildCategory.filter((subcategory) =>
      selectedCategoryIds.includes(subcategory.id_cat)
    );

    if (filteredSubCategories.length === 0) {
      setExistSubs(false);
    } else {
      setExistSubs(true);
    }
    setSubCategoryOptions(filteredSubCategories);

    setSelectedSubCategories([]);
  };

  useEffect(() => {
    fetchData();
    setExistSubs(false);
  }, []);

  const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, color: "#626262", paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: "none" } : base;
    },
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Card title="Ajouter un produit">
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="xl:flex lg:flex md:block sm:block">
              <div className="fromGroup xl:w-1/2 lg:w-1/2 md:w-full sm:w-full xl:ml-1 lg:ml-1 md:ml-1 sm:mt-1">
                <label className="block capitalize form-label  ">Categories</label>
                <SelectComponent
                  isMulti
                  options={categoryOptions}
                  value={selectedCategories}
                  onChange={changeparent}
                  placeholder="Choisir La Categorie"
                  className="md:w-full sm:w-full xl:ml-1 lg:ml-1 md:ml-1 sm:mt-1 "
                />
              </div>
              <div className="fromGroup xl:w-1/2 lg:w-1/2 md:w-full sm:w-full xl:ml-1 lg:ml-1 md:ml-1 sm:mt-1">
                <label className="block capitalize form-label  ">Sous Categories</label>
                <SelectComponent
                  isMulti
                  options={SubCategoryOptions}
                  value={SelectedSubCategories}
                  onChange={setSelectedSubCategories}
                  placeholder="Choisir La Sous-Categorie"
                  className=" md:w-full sm:w-full xl:ml-1 lg:ml-1 md:ml-1 sm:mt-1 "
                  isDisabled={!ExistSubs}
                />
              </div>
            </div>
            <Textinput
              label="Nom du produit"
              type="text"
              placeholder="Nom du produit"
              value={data.ProductName}
              onChange={(e) => setData({ ...data, ProductName: e.target.value })}
            />
            <div className="form-group">
              <label className="block capitalize form-label">Description</label>
              <ReactQuill
                theme="snow"
                value={data.Description}
                onChange={(value) => setData({ ...data, Description: value })}
                placeholder="Description"
              />
            </div>

            <div className="xl:flex lg:flex md:block sm:block gap-3">
              <Textinput
                classGroup="my-2 w-full"
                label="Couleur"
                type="text"
                placeholder="Couleur"
                value={data.color}
                onChange={(e) => setData({ ...data, color: e.target.value })}
              />
              <Textinput
                classGroup="my-2  w-full"
                label="Marque"
                type="text"
                placeholder="Marque"
                value={data.brand}
                onChange={(e) => setData({ ...data, brand: e.target.value })}
              />
            </div>
            <div className="xl:flex lg:flex md:block sm:block gap-3">
              <Textinput
                classGroup="my-2 w-full"
                label="Volume"
                type="number"
                placeholder="Volume"
                value={data.volume}
                onChange={(e) => setData({ ...data, volume: e.target.value })}
              />
              <Textinput
                classGroup="my-2 w-full"
                label="Poids"
                type="number"
                placeholder="Poids"
                value={data.weight}
                onChange={(e) => setData({ ...data, weight: e.target.value })}
              />
            </div>
            <div className="xl:flex lg:flex md:block sm:block gap-3">
              <Textinput
                classGroup="my-2 w-full"
                label="Prix"
                type="number"
                placeholder="Prix"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
              <Textinput
                classGroup="my-2 w-full"
                label="Stock"
                type="number"
                placeholder="Stock"
                value={data.initialStock}
                onChange={(e) => setData({ ...data, initialStock: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex-0 mr-6 md:w-[100px] w-[60px] break-words mt-3.5	">
                Images
              </label>
              <Fileinput
                name="basic"
                selectedFiles={selectedFiles2}
                onChange={handleFileChangeMultiple2}
                multiple
                preview
              />
            </div>
            <Button type="submit" className="bg-primary text-white mt-3">
              Ajouter
            </Button>
          </form>
        </div>
      </Card>
    </>
  );
}
