import React, {useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {Link, useNavigate} from "react-router-dom";
import ApiCall from "../ApiCall/ApiCall";
import statisticPhoto from "../images/monitoring.png";

function Notification(props) {
    const [message, setMessage]=useState([])
    const {userTelegram, tg} = useTelegram();
    // const userTelegram={id:5774477233}

    const navigate=useNavigate()
    useEffect(() => {
        getAdmins()
        if(userTelegram?.id==undefined){
            navigate("/404")
        }
    }, []);

    async function getAdmins() {
        console.log('asas')
        try {
            const result = await ApiCall('/api/v1/message', 'get', null, {id: userTelegram.id});
            console.log(result.data)

            if (!result.error) {
                setMessage(result.data);
            } else {
                // navigate("/404")
            }
        } catch (error) {
            // navigate("/404")
        }
    }


    return (
        <div className={"p-2"}>

                <h1 className={"text-white text-center my-1"}>Weekly notifications</h1>

                {message.map(item=>
                    <div key={item.id} className=''>
                        <div style={{borderRadius:'20px'}}  className=" m-2 ag-courses-item_link my-2 border-white ">

                            <div className="text-white">
                                <h5 className={item.status?'text-success':'text-danger'}>{item.status?"Trade:":"Error:"}</h5>
                                <p style={{fontSize:"12px"}} >{item.messagetext}</p>
                            </div>


                        </div>
                    </div>
                )}



        </div>
    );
}

export default Notification;