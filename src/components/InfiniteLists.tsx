// src/InfiniteList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfiniteList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [end, setEnd] = useState(false);

    const limit = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
                    .then((response) => {
                        setProducts(prevProducts => [...prevProducts, ...response.data]);
                        setLoading(false);
                    })
            }
            catch (error) {
                console.log(error)
            }
        };
        fetchData()
    }, [offset]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [offset]);
    
      function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            setEnd(true)
            return;
        }
        const nextProducts = offset + limit;
        setOffset(nextProducts);
      }

    return (
        <div>
            <h1>List of Products</h1>
            <ol style={{ fontSize: '30px' }}>
                {products.map(product => (
                    <li key={product.id}>{product.title} ${product.price}</li>
                ))}
            </ol>
            {loading && <p>Loading...</p>}
            {end && <p>End of Products</p>}
        </div>
    );
};

export default InfiniteList;