import { Product } from "../models/productsModels.js";
const getAllProducts = async (req, res) => {
    const {title,price} = req.query;
    const queryObject = {};
    if(title){
        queryObject.title = title;
    }
    if(price){
       
        queryObject.price = price;
    }
    console.log(queryObject);
    
    
    const myData = await Product.find(queryObject);
 res.status(200).json({ myData });
  };
  
  const getAllProductsTesting = async (req, res) => {
    const myData = await Product.find({});
 res.status(200).json(myData);
  };
  export { getAllProducts, getAllProductsTesting };