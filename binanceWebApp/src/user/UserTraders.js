import React, {useEffect, useState} from 'react';
import ApiCall from '../ApiCall/ApiCall';
import {useTelegram} from "../hooks/useTelegram";
import {useNavigate} from "react-router-dom";


function UserTraders(props) {
     const [admins, setAdmins]=useState([])
      const {userTelegram, tg} = useTelegram();
    // const userTelegram={id:5397857416}

    const navigate=useNavigate()
    useEffect(() => {
        getAdmins()
        if(userTelegram?.id==undefined){
            navigate("/404")
        }
    }, []);

    async function getAdmins() {
        
        try {
            const result = await ApiCall('/api/v1/userjon/traders', 'get', null, {id: userTelegram.id});
            console.log(result.data)

            if (!result.error) {
                 setAdmins(result.data);
            } else {
                // navigate("/404")
            }
        } catch (error) {
            // navigate("/404")
        }
    }
 

   async function setSubscriber(uid){
     console.log(uid, userTelegram.id);
        try {
            const result = await ApiCall('/api/v1/userjon/traders', 'put', null, {id: userTelegram.id, uid: uid});

            if (!result.error) {
                console.log(9)
                console.log(result.data);
                 // setAdmins(result.data);
                getAdmins()
            } else {
                // console.error('Error fetching admins:', result.error);
            }
        } catch (error) {
            // navigate("/404")
            // console.error('Error fetching admins:', error);
        }
    }

    return (
        <div className={''}>

            <div className='ag-courses_box ' style={{color: 'white', fontSize: 20}}>

                <div id="wrapper">
                    <div className='divFlex'>
                        <h1 style={{marginTop: 10}}>Our Picks</h1>
                    </div>
                    {admins.length === 0 ?
                        <h2>We don't have Trades yet!</h2>
                        :
                        <>
                            <div>
                                <table id="keywords" className='table border-0 text-white'>
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th><span>Trader Name</span></th>

                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        admins.filter(item => item.trader_status ===0)?.map((item, index) => (
                                            <tr key={item.uid}>
                                                <td>{index + 1}</td>
                                                <td style={{fontSize: 14}} className="lalign">
                                                    <a href={"https://www.binance.com/en/futures-activity/leaderboard/user/um?encryptedUid=" + item.uid.substring(2, item.uid.length - 2)}>
                                                        {item.tradername}
                                                    </a>
                                                </td>

                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            checked={item.active}
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            onChange={() => setSubscriber(item.uid)}


                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                </div>
                <br/>
                <div id="wrapper">
                    <div className='divFlex'>
                        <h1 style={{marginTop: 10}}>Member's Picks</h1>
                    </div>
                    {admins.length === 0 ?
                        <h2>We don't have Trades yet!</h2>
                        :
                        <>
                            <div>
                                <table id="keywords" className='table border-0 text-white'>
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th><span>Trader Name</span></th>

                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        admins.filter(item => item.trader_status === 1)?.map((item, index) => (
                                            <tr key={item.uid}>
                                                <td>{index + 1}</td>
                                                <td style={{fontSize: 14}} className="lalign">
                                                    <a href={"https://www.binance.com/en/futures-activity/leaderboard/user/um?encryptedUid=" + item.uid.substring(2, item.uid.length - 2)}>
                                                        {item.tradername}
                                                    </a>
                                                </td>

                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            checked={item.active}
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            onChange={() => setSubscriber(item.uid)}


                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>

    );
}

export default UserTraders;