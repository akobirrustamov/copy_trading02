import React, { useEffect, useState } from 'react';
import ApiCall from '../ApiCall/ApiCall';
import eye from "../user/image/show.png";
import imgDown from "../user/image/image.png";
import axios from "axios";

function ForMe(props) {
    const [admins, setAdmins] = useState([]);
    const [trader, setTrader] = useState('');

    useEffect(() => {
        getOrders();
    }, []);

    async function getOrders() {
        console.log("ko")
        try {
            const result = await axios.get('https://akobir.co/api/v1/ordertraders', {
                headers: {
                    "Authorization": 5397857416,
                }
            });
            console.log(result.data);
            if (!result.error) {
                setAdmins(result.data);
                setTrader(result.data[0].uid);
            } else {
                // Handle error if needed
            }
        } catch (error) {
            // Handle error if needed
        }
    }

    return (
        <div>
            <div>hi</div>

            <div className={''}>
                <label className={'text-white mx-1'}>Select Trader</label>
                <select
                    className="w-75 mx-1 form-select"
                    aria-label="Default select example"
                    onChange={(e) => setTrader(e.target.value)}
                    value={trader}
                >
                    {admins?.map((item) => (
                        <option key={item.uid} value={item.uid}>
                            {item.tradername}
                        </option>
                    ))}
                </select>
            </div>

            <div className={"my-2"}>

                    {trader && admins?.filter((item) => item.uid === trader)?.map((item) => (
                        <div key={item.uid}>
                            {JSON.parse(item.traderpositions)?.map((position) => (
                                <div key={position.symbol}  className="ag-courses_item2">
                                    <div className="ag-courses-item_link1">
                                        <div className={"ag-courses-item_bg1 " }></div>
                                        <div className="ag-courses-item_title1">
                                            {position.symbol}
                                        </div>
                                        <div className="ag-courses-item_date-box1">
                                            Position:
                                            <span className="ag-courses-item_date1">
                                              {position.long ? ' LONG' : ' SHORT'}  <span className="ag-courses-item_date1 text-white">
                                                     {position.pnl}%
                                                </span>
                                            </span>
                                        </div>

                                        <div className="ag-courses-item_date-box1">
                                            Entry Price: <span className="ag-courses-item_date1">
                                                {position.entryPrice}
                                            </span>
                                        </div>
                                        <div className="ag-courses-item_date-box1">
                                            Close Price: <span className="ag-courses-item_date1">
                                                {position.markPrice}
                                            </span>
                                        </div>
                                        <div className="ag-courses-item_date-box1">
                                            Laverage: <span className="ag-courses-item_date1">
                                                {position.leverage}X
                                            </span>
                                        </div>
                                        <div className="ag-courses-item_date-box1">
                                            time: <span className="ag-courses-item_date1">
                                                 {new Date(position.updateTimeStamp).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ForMe;
