'use client';
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

// Dynamically import the ProductTable component with SSR disabled
const ProductTable = dynamic(() => import("@/components/custom/ProductTable"), { 
  ssr: false,
  loading: () => <Loading />
});

export default function ProductPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/products/getAllProducts', {});

                console.log('Data fetched:', response.data);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div>{error.message}</div>;

    return (
        <>
            <div>
                <ProductTable salesdata={data.products} />
            </div>
        </>
    );
}
