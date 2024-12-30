"use client";
import React, { use } from 'react';
import { useState , useEffect } from 'react';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import Textinput from '@/components/ui/Textinput';
import Textarea from '@/components/ui/Textarea';
import Fileinput from '@/components/ui/Fileinput';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import axios from 'axios';


export default function page({params}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([])
    const [SubCategoryOptions, setSubCategoryOptions] = useState([])
    const [SelectedCategory, SelectedsetCategory] = useState("")
    const [ChildCategory, setChildCategory] = useState([]);
    const [SelectedSubCategory, SelectedsetSubCategory] = useState("");
    const [ExistSubs, setExistSubs] = useState(false);
    const [productId , setProductId] = useState(params.id[0]);

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
        initialStock: 0
        
    }); 
    
    // if (loading) return <Loading />
    // if (error) return <p>{error.message}</p>;
    useEffect(() => {
        if (params.id) {
            setProductId(params.id[0]);
        }
    }
    , [params.id]);
    useEffect(() => {
        const fetchData = async () => {
            console.log(productId);
            if(productId){
                try {
                    const response = await axios.post('/api/products/getProductById', {productId});
                    const product = response.data.product;
                    setData({
                        categoryId: product.categoryId,
                        SubCategoryId: product.SubCategoryId,
                        ProductName: product.ProductName,
                        Description: product.Description,
                        color: product.color,
    
                        brand: product.brand,
                        images: product.images,
                        price: product.price,
                        weight: product.weight,
                        initialStock: product.initialStock
                    });
                    setLoading(false);
                    console.log("data",response.data.product);
                } catch (error) {
                    setError(error);
                    console.error('Error fetching data:', error);
                }
            }
        }
        fetchData();
    }, [productId]);

    const changeparent = (e) => {
        const selectedParentCategory = e.target.value;
        SelectedsetCategory(selectedParentCategory);

        const filteredSubCategories = ChildCategory.filter(subcategory => subcategory.id_cat === selectedParentCategory);
        if (filteredSubCategories.length === 0) {
            setExistSubs(false);
        } else {
            setExistSubs(true);
        }
        setSubCategoryOptions(filteredSubCategories);
    };
    const fetchData = async () => {
        try {
            const response = await axios.post('/api/categories/getallcatsubcat/', {});

            const transformedCategories = response.data.categories.map(category => ({
                value: category.id_cat,
                label: category.nom
            }));
            const transformedSubCategories = response.data.subcategories.map(subcategory => ({
                value: subcategory.id_subcat,
                id_cat: subcategory.categoryId,
                label: subcategory.nom
            }));
            setLoading(false);

            setCategoryOptions(transformedCategories);
            setChildCategory(transformedSubCategories);

        } catch (error) {
            setError(error);
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchData();
        setExistSubs(false);
    }, []);


    return (
        <>
            <Card title="Ajouter un produit">
                <div className="space-y-4">
                    <form >
                        <div className="xl:flex lg:flex md:block sm:block">

                            <Select
                                classGroup="xl:w-1/2 lg:w-1/2 md:w-full sm:w-full"
                                label={"Choisir La Categorie"}
                                id={"id_cat"}
                                options={categoryOptions} // Ensure this is an array
                                placeholder={"Choisir La Categorie"}
                                value={SelectedCategory}
                                onChange={changeparent}

                            />
                            <Select

                                classGroup="xl:w-1/2 lg:w-1/2 md:w-full sm:w-full xl:ml-1 lg:ml-1 md:ml-1 sm:mt-1 "
                                label={"Choisir La Sous-Categorie"}
                                id={"id_cat"}
                                options={SubCategoryOptions}
                                placeholder={"Choisir La Sous-Categorie"}
                                value={SelectedSubCategory}
                                disabled={!ExistSubs}
                                onChange={(e) => { SelectedsetSubCategory(e.target.value); }}

                            />

                        </div>
                        <Textinput
                            label="Nom du produit"
                            type="text"
                            placeholder="Nom du produit"
                            defaultValue="data.ProductName"
                        />
                        <Textarea
                            label="Description"
                            type="text"
                            placeholder="Description"
                        />

                        <div className="xl:flex lg:flex md:block sm:block ">
                            <div className="md:flex md:flex-col xl:flex xl:flex-col lg:flex lg:flex-col w-2/4	"  >
                                <Textinput
                                    classGroup="my-2 w-full"

                                    label="Couleur"
                                    type="text"
                                    placeholder="Couleur"
                                />
                                <Textinput
                                    classGroup="my-2  w-full"

                                    label="Marque"
                                    type="text"
                                    placeholder="Nom du produit"
                                />

                            </div>
                            <div className="md:flex md:flex-col xl:flex xl:flex-col lg:flex lg:flex-col w-2/4	lg:ml-1 md:ml-1 sm:mt-1"  >
                                <Textinput
                                    classGroup="my-2 w-full"

                                    label="Volume"
                                    type="number"
                                    placeholder="Poids"
                                />
                                <Textinput
                                    classGroup="my-2 w-full"

                                    label="Poids"
                                    type="number"
                                    placeholder="Poids"
                                />


                            </div>

                        </div>
                        <Button
                            type="submit"
                            className="bg-primary text-white"
                        >
                            Ajouter
                        </Button>
                    </form>

                </div>
            </Card>


        </>
    )
}
