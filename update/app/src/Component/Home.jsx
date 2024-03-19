import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {


    const [data, setData] = useState([])
    const [loading , setLoading] = useState(true)

    // Get request ==========================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products')
                console.log(response.data)
                setData(response.data)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        };
        fetchData()
    }, [])


    // Post request  ==========================

    const Addproduct = {
        id: Date.now(),
        title: "men's clothing",
        price: 100,
    }

    const HandlePostReQ = async () => {
        try {
            const response = await axios.post(`https://fakestoreapi.com/products`, Addproduct)
            setData([...data, response.data])
        } catch (error) {
            console.log(error)
        }
    };


    //   Delet request    ==========================
    const HandleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://fakestoreapi.com/products/${id}`)
            // console.log(response)
            const UpdateDeletedData = data.filter(product => product.id !== id)
            setData(UpdateDeletedData)
        } catch (error) {
            console.log(error)
        }
    };



   // Put request ==========================
const UpdateProduct = {
    id: 2,
    price: 10,
    category: 'Product update'
}

const handlePutReq = async (Id) => {
    try {
        const response = await axios.put(`https://fakestoreapi.com/products/${Id}`, UpdateProduct)
        console.log(response.data)
        const updatedPutdata = (prev)=> prev.map((product)=> product.id === Id ? {...product , ...UpdateProduct}:product )
        setData(updatedPutdata)
    } catch (error) {
        console.log(error)
    }
}





    return (
        <>
            <div className="navbar">
                <div className="category">
                    <h4 >Smartphones</h4>
                    <h4 >laptops</h4>
                    <h4>fragrances</h4>
                    <h4>skincare</h4>
                    <h4>groceries</h4>
                </div>
                    <button className='add-btn' onClick={()=> handlePutReq(2) } > Update product </button>
            </div>


            <div className="container">
                {
                    data.map((product) => (
                        <div key={product.id} className="card">
                            <img className="images" src={product.image} alt="" />
                            <h4>Title  :- {product.category} </h4>
                            <h4>Title  :-  {product.title} </h4>
                            <h4>Price  :- {product.price} </h4>
                            <br />
                            <button className='delet-btn' onClick={() => HandleDelete(product.id)} > Delete</button>
                        </div>
                    ))
                }
                {loading && <h1 className='loadingtext'>Loading...</h1>}
            </div>
            <div className='add-btn-div'>
                <button className='add-btn' onClick={HandlePostReQ} > Add</button>
            </div>



            <div className="container">
                {
                    data.map((product) => (
                        <div key={product.id} className="card">
                            <img className="images" src={product.image} alt="" />
                            <h4>Title  :- {product.category} </h4>
                            <h4>Title  :-  {product.title} </h4>
                            <h4>Price  :- {product.price} </h4>
                            <br />
                            <button className='delet-btn' onClick={() => HandleDelete(product.id)} > Delete</button>
                        </div>
                    ))
                }
                {loading && <h1 className='loadingtext'>Loading...</h1>}
            </div>
            <div className='add-btn-div'>
                <button className='add-btn' onClick={HandlePostReQ} > Add</button>
            </div>
        </>
    )
}

export default Home;








