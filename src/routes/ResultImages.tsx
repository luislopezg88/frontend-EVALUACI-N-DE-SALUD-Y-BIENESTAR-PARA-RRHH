import { useEffect, useState } from "react";

const ReaultImages = () => {


    //const searchParams = useSearchParams(); 
    const searchParams = new URLSearchParams(document.location.search);
    const [img, setImg] = useState<any>('')


    useEffect(() => {
        console.log(searchParams.get('img'))
        setImg(searchParams.get('img'))
    }, [])


    return (
        <div 
            style={{
                height: '100vh',
                width: '100%'
            }}
        >
            <div 
                style={{
                    background: "#cccccc",
                    backgroundImage: `url(ia/${img})`
                }}
                className="bg-result"
            >
            </div>
        </div> 
    );
}
 
export default ReaultImages;
