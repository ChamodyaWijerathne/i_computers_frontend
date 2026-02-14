import { useState } from "react";

export default function AdminAddProductPage(){
    const [name, setName] = useState("");
    const [productId, setProductId] = useState("");
    const [description, setDescription] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [category, setCategory] = useState("others");
    const [brand, setBrand] = useState("Standard");
    const [model, setModel] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll hide-scroll-track">
            <h1 className="w-full text-3xl font-bold mb-4 sticky top-0 bg-primary">Add New Product</h1>
            <div className="w-[50%] h-[120px] flex flex-col">
                <label className="font-bold m-2">Product ID</label>
                <input value={productId} onChange={(e)=>{setProductId(e.target.value)}} type="text" placeholder="Ex: ID001" className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
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
                <label className="font-bold m-2">Alternative Names(Comma Separated)</label>
                <input value={alternativeNames} onChange={(e)=>{setAlternativeNames(e.target.value)}} type="text" placeholder="Ex: Laptop, Notebook, PC " className="border-4 border-accent rounded-[10px] h-[50px] p-2 ml-2 focus:outline-none"/>
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
                    <option value="components">Components</option>
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

            <div className="w-full h-[80px] bg-red-900 sticky bottom-0 rounded-b-2xl flex justify-end items-center gap-4">
                <button className="bg-gray-500 text-white font-bold px-6 py-2 rounded-[10px] m-4 hover:bg-gray-600">Cancel</button>
                <button className="bg-green-500 text-white font-bold px-6 py-2 rounded-[10px] m-4 hover:bg-green-600">Add Product</button>
                

            </div>

        </div>
    )
}
