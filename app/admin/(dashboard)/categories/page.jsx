'use client';
import CategoryTable from "@/components/custom/categoryTable";
import SubCategoryTable from "@/components/custom/SubcategoryTable";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
export default function bookingPage(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectData, setSelectData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('/api/categories/getallcatsubcat/', {});
          setData(response.data);
          setLoading(false);
          const transformedCategories = response.data.categories.map(category => ({
            value: category.id_cat,
            label: category.nom
          }));
          setSelectData(transformedCategories)


        } catch (error) {
          setError(error);
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    if(loading) return <Loading/>
    if(error) return <div>{error.message}</div>
    return(
        <>
          <div>
          
              <CategoryTable salesdata={data.categories}/>
          </div>
          <div className="pt-3">
            <SubCategoryTable salesdata={data.subcategories} categorydata={selectData}/>
          </div>
        </>
    )

}