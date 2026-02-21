import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";


export default function AdminUpdateProductPage(){
    const location = useLocation() //to get the product data passed from the admin products page
    const [name, setName] = useState(location.state.name);
    const [productId, setProductId] = useState(location.state.productId);
    const [description, setDescription] = useState(location.state.description);
    const [altNames, setAltNames] = useState((location.state.altNames || location.state.alternativeNames)?.join(",") || "");
    const [price, setPrice] = useState(location.state.price);
    const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
    const [category, setCategory] = useState(location.state.category || "others");
    const [brand, setBrand] = useState(location.state.brand || "Standard");
    const [model, setModel] = useState(location.state.model || "");
    const [isVisible, setIsVisible] = useState(location.state.isVisible);
    const [imageFile, setImageFile] = useState([]);
    const navigate = useNavigate(); //to redirect after successful update
    

    async function handleUpdateProduct(){
        try{

            const token = localStorage.getItem("token");//check if token exists
            if(token == null){
                toast.error("You must be logged in to update a product.");
                window.location.href = "/login";
                return;
            }

            const fileUploadPromises = []//create an array of promises for uploading files

            for(let i = 0; i < imageFile.length; i++){//loop through the selected files and create a promise for each upload
                fileUploadPromises[i] = uploadFile(imageFile[i])
            }

            let imageURLs = await Promise.all(fileUploadPromises);//wait for all the upload promises to resolve and get the image URLs
            
            if(imageURLs.length == 0){
                imageURLs = location.state.images;//if no new images are selected, use the existing images
            }

            await axios.put(import.meta.env.VITE_API_URL + "/products/" + productId,{
                
                name: name,
                description: description,
                images: imageURLs,
                altNames: altNames.split(",").map(name => name.trim()),
                price: price,
                labeledPrice: labeledPrice,
                category: category,
                brand: brand,
                model: model,
                isVisible: isVisible
            },{
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product updated successfully.");
            //redirect admin product page
            navigate("/admin/products");


        }catch(error){
           // toast.error("Failed to add product.");
            toast.error(error?.response?.data?.message || "Failed to update product.");
            return;
        }

    }

    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll hide-scroll-track">
            <h1 className="w-full text-3xl font-bold mb-4 sticky top-0 bg-primary">Edit Product</h1>
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Product ID</label>
                <input value={productId} disabled onChange={(e)=>{setProductId(e.target.value)}} type="text" placeholder="Ex: ID001" className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
            </div>
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Product Name</label>
                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Ex: Laptop " className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
            </div>
            <div className="w-full h-[170px] flex flex-col">
                <label className="font-bold m-2">Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" placeholder="Ex: Laptop " className="border-4 border-accent rounded-[10px] h-[100px] p-2 ml-2 focus:outline-none"/>
            </div>
            <div className="w-full h-[120px] flex flex-col">
                <label className="font-bold m-2">Product Image</label>
                <input onChange={(e)=>{setImageFile(e.target.files)}} multiple type="file" className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
            </div>  
            <div className="w-full h-[120px] flex flex-col">
                <label className="font-bold m-2">Alternative Names(Comma Separated)</label>
                <input value={altNames} onChange={(e)=>{setAltNames(e.target.value)}} type="text" placeholder="Ex: Laptop, Notebook, PC " className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
            </div>
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Price</label>
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="number" placeholder="Ex: 1000" className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
            </div>
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Labeled Price</label>
                <input value={labeledPrice} onChange={(e)=>{setLabeledPrice(e.target.value)}} type="number" placeholder="Ex: $1000" className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
            </div>
            <div className="w-[25%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Category</label>
                <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none">
                    <option value="laptops">Laptops</option>
                    <option value="desktops">Desktops</option>
                    <option value="storage">Storage</option>
                    <option value="accessories">Accessories</option>
                    <option value="others">Others</option>
                </select>

            </div>
            <div className="w-[25%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Brand</label>
                <select value={brand} onChange={(e)=>{setBrand(e.target.value)}} className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none">
                    <option value="Standard">Standard</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Apple">Apple</option>
                    <option value="Asus">Asus</option>
                </select>
            </div>
            <div className="w-[25%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Model</label>
                <input value={model} onChange={(e)=>{setModel(e.target.value)}} type="text" placeholder="Ex: XPS 13" className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
            </div>
            <div className="w-[25%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Visibility</label>
                <select value={isVisible} onChange={(e)=>{setIsVisible(e.target.value === "true")}} className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none">
                    <option value={true}>Visible</option>
                    <option value={false}>Hidden</option>
                </select>
            </div>

            <div className="w-full h-[80px] bg-white sticky bottom-0 rounded-b-2xl flex justify-end items-center gap-4">
                <button onClick={()=>{navigate("/admin/products")}} className="bg-gray-500 text-white font-bold px-6 py-2 rounded-[10px] hover:bg-gray-600">Cancel</button>
                <button onClick={handleUpdateProduct} className="bg-green-500 text-white font-bold px-6 py-2 rounded-[10px] hover:bg-green-600">Update Product</button>
                

            </div>

        </div>
    )
}