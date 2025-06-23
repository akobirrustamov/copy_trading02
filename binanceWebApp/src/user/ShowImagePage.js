import React, { useState, useEffect } from 'react';
import ApiCall from "../ApiCall/ApiCall";
import {useTelegram} from "../hooks/useTelegram";

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import axios from 'axios';
import {Link, useNavigate, useParams} from "react-router-dom";
import './style.css'
import eye from './image/show.png';
import imgDown from './image/image.png'

const ShowImagePage = () => {

    const { telegram_id } = useParams(); // Extract 'id' from the path
    const navigate=useNavigate()
    // const userTelegram={id:855893763}
    // const userTelegram={id:1004132145}
    // const {  onClose} = useTelegram();
    // const { tg, onClose} = useTelegram();
    const  [showRodal, setShowRodal]=useState("")

    const [image, setImage]= useState([])

    useEffect(() => {


        getImages()
    }, []);
    const [imageUrl, setImageUrl] = useState('');
    async function getImages() {
        console.log(telegram_id);
        const token = telegram_id; // Assuming the token is the same as telegram_id

        try {
            const result = await axios.get('https://akobir.co/api/v1/image', {
                params: { id: telegram_id },
                headers: {
                    "Authorization": token,
                    "Content-Type": "multipart/form-data", // Modify if needed
                },
            });

            if (!result.error) {
                setImage(result.data);
            } else {
                navigate("/404");
            }
        } catch (error) {
            navigate("/404");
            // Handle other errors if needed
        }
    }



    const downloadImage = async (id, fileName) => {

        console.log(id, fileName)
        try {
            const response = await fetch(id);
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);

            // Create an anchor element
            const link = document.createElement('a');
            link.href = objectURL;
            link.download = fileName+".jpg"; // You can set the desired file name here

            // Append the anchor element to the document
            document.body.appendChild(link);

            // Trigger a click on the anchor element
            link.click();

            // Remove the anchor element from the document
            document.body.removeChild(link);

            window.location.reload();
        } catch (error) {
            console.error('Error fetching or creating download link:', error);
        }
    };



    return (
        <div className="myContainer">
            {/*<img src={"https://t.me/c/1891587604/2245"} width={25} alt={".."} />*/}
            {/*<a onClick={() => downloadImage("https://i.ibb.co/YRD7PhR/29622418feb8.jpg", 'downloaded_image.jpg')}>*/}
            {/*    <img src={imgDown} width={25} alt="Download" />*/}
            {/*</a>*/}
            <div style={{display: "flex", flexWrap:"wrap"}} className={"my-4 d-flex justify-content-center"} >
                {image.map((perpetualPosition, positionIndex) => (

                    <div key={perpetualPosition.entryPrice}  className="ag-courses_item1">
                        <div key={positionIndex} className="ag-courses-item_link1">
                            <div className={"ag-courses-item_bg1 " + (perpetualPosition.profit ? "bg-success" : "bg-danger")}></div>
                            <div className="ag-courses-item_title1">
                                {perpetualPosition.coinName}
                            </div>
                            <div className="ag-courses-item_date-box1">
                                Position:
                                <span className="ag-courses-item_date1">
                  {perpetualPosition.position ? ' LONG' : ' SHORT'}
                </span>
                            </div>

                            <div className="ag-courses-item_date-box1">
                                Entry Price:
                                <span className="ag-courses-item_date1"> {perpetualPosition.entryPrice}</span>
                            </div>
                            <div className="ag-courses-item_date-box1">
                                Close Price:
                                <span className="ag-courses-item_date1"> {perpetualPosition.closePrice}</span>
                            </div>
                            <div className="ag-courses-item_date-box1">
                                time:
                                <span className="ag-courses-item_date1">
                                     {new Date(perpetualPosition.update_time).toLocaleString()}
                                </span>
                            </div>
                            <div className={"d-flex justify-content-end gap-3"}>
                                <img
                                    onClick={()=>{
                                        setImageUrl(perpetualPosition.photoId);
                                        setShowRodal(true)
                                    }
                                    }
                                src={eye} width={25} alt={".."}/>



                                <a onClick={() => downloadImage(perpetualPosition.photoId, perpetualPosition.coinName)}>
                                    <img src={imgDown} width={25} alt="Download" />
                                </a>


                                {/*<img src={imgDown} width={25} alt={".."} />*/}

                            </div>
                        </div>

                    </div>
                ))}

            </div>

            <Rodal width={320} height={300} visible={showRodal !== ""} onClose={() => {
                setShowRodal("")
                setImageUrl("")
            }}>
                <div className="container my-4" style={{ color: 'black', marginLeft:"-10px"}}>

                         <img  width={"250px"} height={"240px"} src={imageUrl} alt="Telegram Image" />


                </div>
            </Rodal>

        </div>
    );
};

export default ShowImagePage;
