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
    const {  onClose} = useTelegram();
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

    const fetchImageUrl = async (id) => {
        const botToken = '6304969016:AAHzARbmjmrCmdWDRPzQzM5oxeHTKqkI5fw';
        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${id}`);
            const data = await response.json();
            if (data.ok) {
                const file_path = data.result.file_path;
                const fullImageUrl = `https://api.telegram.org/file/bot${botToken}/${file_path}`;
                console.log(fullImageUrl)
                setImageUrl(fullImageUrl);
            } else {console.error('Error fetching image URL from Telegram API');}
        } catch (error) {console.error('Error fetching image URL:', error);return null;}
    };


    const downloadImage = async (id) => {
        console.log(id);
        // id="AgACAgIAAxkBAAEYc5VlvOCuVFEoUTG9uihzS34M09jNIgAC_NUxGysG6UlYEPOQuTYFtgEAAwIAA3kAAzQE"
        const botToken = '6304969016:AAHzARbmjmrCmdWDRPzQzM5oxeHTKqkI5fw';

        try {
            // Step 1: Get the file path using the getFile API
            const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Image not found');
                } else {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
            }
            const data = await response.json();

            // Log the full image URL
            const file_path = data.result.file_path;
            const fullImageUrl = `https://api.telegram.org/file/bot${botToken}/${file_path}`;
            console.log('Full Image URL:', fullImageUrl);

            const link = document.createElement('a');
            link.href = fullImageUrl;

            // Extract filename from the file_path and add ".png" extension
            const fileName = `${file_path.split('/').pop()}.png`;
            console.log(fileName);
            link.download = fileName;

            // Programmatically click the link to start the download
            link.click();
        } catch (error) {
            console.error('Error fetching image URL:', error.message);
        }
    };


    return (
        <div className="myContainer">
            {/*<img src={"https://t.me/c/1891587604/2245"} width={25} alt={".."} />*/}

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
                                        setShowRodal(perpetualPosition.photoId);
                                        fetchImageUrl(perpetualPosition.photoId);}
                                    }
                                    src={eye} width={25} alt={".."}/>




                                <a
                                    onClick={()=> {
                                        console.log(perpetualPosition.photoId)
                                        downloadImage(perpetualPosition.photoId);
                                    }}
                                >
                                    <img src={imgDown} width={25} alt={".."} />
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

                    <img  width={"250px"} height={"240px"} src={"https://i.ibb.co/YRD7PhR/29622418feb8.jpg"} alt="Telegram Image" />


                </div>
            </Rodal>

        </div>
    );
};

export default ShowImagePage;
