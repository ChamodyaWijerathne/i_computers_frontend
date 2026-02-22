import { useState } from "react";

export default function ImageSlideShow(props){
    const images = props.images
    const [activeImage, setActiveImage] = useState(0)

    function getClasses(index){
        if(index==activeImage){
            return "w-[90px] h-[90px] object-contain rounded-[20px] border-3 border-accent/80 cursor-pointer"
        }else{
            return "w-[90px] h-[90px] object-contain rounded-[20px]  cursor-pointer opacity-100"
        }
    }
    

    return(
        <div className="w-[500px] h-[600px] flex flex-col">
            <img src={images[activeImage]} alt="Product Image" className="w-full h-[500px] object-cover"/>
            <div className="w-full h-[100px] flex flex-row px-4 gap-4 justify-center items-center">
                {
                    images.map(
                        (img, index) =>{
                            return <img 
                            onClick={
                                ()=>{
                                    setActiveImage(index)
                                }
                            }
                            key={index} src={img} className={getClasses(index)}/>
                        }
                    )
                }

            </div>
        </div>

    )
}