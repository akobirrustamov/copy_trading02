import React, {useEffect, useState} from 'react';
import './range.css'
import ApiCall from '../ApiCall/ApiCall';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTelegram} from "../hooks/useTelegram";
import rasm1 from './important.png'
function Userform(props) {
    //   const {userTelegram, tg, onClose} = useTelegram();
     const userTelegram={id:5397857416}
    // function onClose(){}
    const navigate=useNavigate()
    const [birja, setBirja]=useState(0)
    const [user, setUser]=useState({})
    const [coinexLeverage, setCoinexLeverage]=useState(1)
    const [bozor, setBozor]=useState([
        {
            id:0,
            name:"",
            key:"",
            apiToken:"",
            apiKey:"",
            password:false,
            status:false,
            leverage:0
        },
        {
        id:1,
        name:"Bybit",
        key:"bybit",
        apiToken:"",
        apiKey:"",
        password:"",
        status:false,
            leverage:100
    },{
        id:2,
        name:"Bitget",
        key:"bitget",
        apiToken:"",
        apiKey:"",
        password:'',
        status:false,
        leverage: 125
    },{
        id:3,
        name:"BingX",
        key:"bingx",
        apiToken:"",
        apiKey:"",
        password:"",
        status:false,
            leverage: 125
    },{
        id:4,
        name:"Binance",
        key:"kucoin",
        apiToken:"",
        apiKey:"",
        password:'',
        status:false,
            leverage: 125
    }, {
        id:4,
        name:"Coinex",
        key:"coinex",
        apiToken:"",
        apiKey:"",
        password:'',
        status:false,
        leverage: 125
        }
        ])
 useEffect(()=>{
    getMe()
     // console.log(userTelegram)

    if(userTelegram?.id==undefined){
         navigate("/404")
    }
 },[])

 async function getMe(){
    try {
        const result = await ApiCall('/api/v1/userjon/me', 'get', null, {id: userTelegram.id});
        if (!result.error ) {
            console.log(result.data)
            setUser(result.data);
            if(result.data?.bybit!==''){
                setBirja(1)
                bozor[1].apiToken=result.data.bybit.split("//")[0]
                bozor[1].apiKey=result.data.bybit.split("//")[1]
                bozor[1].status=true
            }if (result.data?.bitget!=='') {
                setBirja(2)
                bozor[2].apiToken=result.data.bitget.split("//")[0]
                bozor[2].apiKey=result.data.bitget.split("//")[1]
                bozor[2].password=result.data.password
                bozor[2].status=true
            } if (result.data?.bingx!=='') {
                setBirja(3)
                bozor[3].apiToken=result.data.bingx.split("//")[0]
                bozor[3].apiKey=result.data.bingx.split("//")[1]
                bozor[3].status=true
            } if(result.data?.kucoin!=='') {
                setBirja(4)
                bozor[4].apiToken=result.data.kucoin.split("//")[0]
                bozor[4].apiKey=result.data.kucoin.split("//")[1]
                bozor[4].password=result.data.password
                bozor[4].status=true
            }if(result.data?.coinex!=='') {
                setBirja(5)
                bozor[5].apiToken=result.data.coinex.split("//")[0]
                bozor[5].apiKey=result.data.coinex.split("//")[1]
                bozor[5].password=result.data.password
                setCoinexLeverage(result.data.leverage)
                bozor[5].status=true
            }
            // console.log(result.data)
            // setLeverage(result.data)
        } else {

        }
    } catch (error) {
         // navigate('/404')
    }
 }
 async function save(){
         // console.log(user)
     let data=user
     let aler=false;
    if(birja>0 && birja<6 ){
        if(bozor[birja].apiToken!=="" && bozor[birja].apiKey!==""){
            data.bitget=''
            data.bybit=''
            data.bingx=''
            data.kucoin=''
            data.coinex=''
            data[bozor[birja].key]=bozor[birja].apiToken+"//"+bozor[birja].apiKey
            data.password=bozor[birja].password
        }else {

            aler=true
        }
        if (birja!==5){
            if(!(data.leverage>=0 && data.leverage<=bozor[birja].leverage && data.amount>0) ){

                aler=true
            }
            // console.log(data.tpslstatus!==0)
            if(data.tpslstatus!==0){
                if(data.tpstatus===0){
                    if(!(data.takeprofit1>0 && data.stoploss>=0)){
                        console.log("salom3" )

                        aler=true
                    }
                }else {
                    if(!(data.takeprofit1>0 && data.takeprofit2>0 && data.tp1amount>0 && data.tp2amount>0 && data.stoploss>=0)){
                        console.log("salom4" )

                        aler=true
                    }else {

                    }
                }

            }
        }else if(birja===5){
            data.leverage=coinexLeverage;
        }

    }else {
        console.log("salom")
        aler=true}
    if(aler){
        toast.error('Please enter your details completely!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

            width:100
        });
        return;
    }else {
        toast.success('Data saved successfully!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

            width:100
        });

    }
     // console.log(data)
    try {


        const result = await ApiCall('/api/v1/userjon/setting', 'put', data);
        if (!result.error) {
            // onClose()
            // If the admin is added successfully, close the modal and refresh the admin list
        } else {
            toast.error('Please enter your details completely!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

                width:100
            });
            // console.error('Error adding admin:', result.error);
        }
    } catch (error) {
        // console.error('Error adding admin:', error);
    }
 }


 const showSliderValue = (e) => {
    const value = e.target.value;
    setUser({ ...user, tp2amount: Number(100 - value), tp1amount: value });
};

const showSliderValue2 = (e) => {
    const value = e.target.value;
    setUser({ ...user, tp1amount: Number(100 - value), tp2amount: value });
};

function setKeys(e, key) {
        const updatedBozor = [...bozor];
        updatedBozor[birja] = { ...updatedBozor[birja], [key]: e.target.value };

        setBozor(updatedBozor); // Update the state with the new array
}


function validation(e) {
    let num = e.target.value;
    let err = document.getElementById('leverege');
    let maxLeverage;

    if (birja === 1) {
      maxLeverage = 125;
    } else if (birja === 2) {
      maxLeverage = 125;
    } else if (birja === 3) {
      maxLeverage = 125;
    } else if (birja === 4) {
      maxLeverage = 125;
    }
  
    if (num >= 0 && num <= maxLeverage) {
      setUser({ ...user, leverage: e.target.value });
      err.style.display = 'none';
    } else {
        err.innerText="Max value "+maxLeverage
      err.style.display = 'block';
    }
  }

  function  percentage(e, type){
    let num = e.target.value;
      // console.log(Number(num.typeof))
      let err = document.getElementById(type);

    if(num<101 && num >=0 ){
        setUser({ ...user, [type]: e.target.value });
        err.style.display = 'none';

    }else {
        err.innerText=" 1-100%"
        err.style.display = 'block';
    }
  }


    return (
        <div className='text-white p-1'>

<ToastContainer/>
            <div className={"text-center"}>
                <h1 className='text-white my-2 '><b>⚙️ Trade Setting </b></h1>

            </div>
            <div>
                {/* radio buttons start*/}
                <div className='d-flex text-white justify-content-around'>
                    <div className="">
                        <div>
                            <input
                                checked={birja === 1}
                                onChange={() => setBirja(1)}
                                className="form-check-input mx-2" type="radio" name="bybit" id="flexRadioDefault1"/>

                        </div>
                        <div>
                            <label className="form-check-label" htmlFor="bybit">
                                ByBit
                            </label>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <input
                            checked={birja === 2}
                            onChange={() => setBirja(2)}
                            className="form-check-input mx-2" type="radio" name="bitget" id="flexRadioDefault2"/>
                        </div>
                        <div>
                            <label className="form-check-label" htmlFor="bitget">
                                Bitget
                            </label>
                        </div>

                    </div>
                    <div className="">
                        <div>
                            <input
                                checked={birja === 3}
                                onChange={() => setBirja(3)}
                                className="form-check-input mx-2" type="radio" name="bingx" id="flexRadioDefault3"/>

                        </div>
                        <div>
                            <label className="form-check-label" htmlFor="bingx">
                                BingX
                            </label>
                        </div>

                    </div>
                    <div className="">
                        <div>
                            <input
                                checked={birja === 5}
                                onChange={() => {
                                    setBirja(5);
                                    setUser({ ...user, tpslstatus: 0 });
                                }}
                                className="form-check-input mx-2" type="radio" name="bingx" id="flexRadioDefault3"/>
                        </div>
                        <div>
                            <label className="form-check-label" htmlFor="bingx">
                                CoinEX
                            </label>
                        </div>

                    </div>
                    <div className="">
                        <div>
                            <input
                                checked={birja === 4}
                                onChange={() => setBirja(4)}
                                className="form-check-input mx-2" type="radio" name="kucoin" id="flexRadioDefault4"/>

                        </div>
                        <div>
                            <label className="form-check-label" htmlFor="kucoin">
                                Binance
                            </label>
                        </div>

                    </div>
                </div>
                {/* radio buttons end*/}
                {/* API tokens start */}
                <div className='text-white my-4 p-2'>
                    <div className="mb-3  d-flex justify-content-evenly">
                        <label className=" ">{bozor[birja].name} API KEY:</label>
                        <input

                            value={bozor[birja].apiToken}
                            onChange={(e) => {
                                setKeys(e, 'apiToken')
                            }}
                            type="text" className="form-control w-50" placeholder=""/>

                    </div>
                    <div className="mb-3  d-flex justify-content-evenly">
                        <label className=" ">{bozor[birja].name} API TOKEN: </label>
                        <input
                            value={bozor[birja].apiKey}
                            onChange={(e) => {
                                setKeys(e, 'apiKey')
                            }}

                            type="text" className="form-control w-50  " placeholder=""/>
                    </div>
                    {/* password start */}
                    {
                        birja === 2 ?
                            <div className="mb-2  d-flex justify-content-evenly">
                                <label className=" ">
                                    <b>
                                    </b>Api Password: </label>
                                <input
                                    value={bozor[birja].password}
                                    onChange={(e) => setKeys(e, 'password')}
                                    type="password" className="form-control w-50  " placeholder=""/>
                            </div>
                            : birja === 4 ?
                                <div className={'mx-4  gap-2'}>
                                    <p className={'text-warning'}>93.93.207.166</p>
                                    <p className={'text-warning'}>93.93.207.155</p>
                                    <p style={{fontSize: "14px"}}>Add the above two IPs to the IP whitelist.</p>
                                </div> : ""
                    }

                </div>
                {/* API tokens end */}

                {/* Leverage&Amount start  */}

                <div className='d-flex text-white p-2 justify-content-between align-items-center'>
                    {birja !== 5 &&
                        <div className='d-flex  justify-content-evenly'>
                            <div className="form-check">
                                <input
                                    checked={!(user?.leverage == 0)}
                                    onChange={(e) => setUser({...user, leverage: 1})}
                                    className="form-check-input" type="checkbox"/>
                                <label style={{fontSize: 14}} className="form-check-label text-success">
                                    My own leverage
                                </label>
                            </div>
                            <div className={"form-check mx-3 "}>
                                <input
                                    checked={user?.leverage == 0}
                                    onChange={(e) => setUser({...user, leverage: 0})} className="form-check-input"
                                    type="checkbox"/>
                                <label style={{fontSize: 14}} className="form-check-label text-success">
                                    Trader leverage
                                </label>
                            </div>
                        </div>}
                </div>
                <div className='text-white d-flex gap-2 m-2 justify-content-around'>
                    {/*leverage input*/}
                    <div className={"mb-3 d-flex gap-1 " + (user?.leverage === 0 || birja === 5 ? "d-none" : "")}>
                        <div>
                            <ruzi
                                style={{fontSize: "16px", fontWeight: "650"}}
                                title="If you set the leverage value to 0, the bot will get the leverage value for your trades from the trader's trades.">
                                Leverage
                            </ruzi>
                            {/*<label className="form-label my-1">Leverage:</label>*/}
                            <p id='leverege' style={{display: 'none', color: 'red'}}>Invalid leverage value</p>

                        </div>
                        <input
                            disabled={birja === 0}
                            value={user?.leverage}
                            style={{height: "30px", width: '58px'}}
                            onChange={(e) => validation(e)}
                            type="number"
                            className="form-control"
                            required
                        />
                        <b className='text-warning my-1' style={{fontSize: 18}}>x</b>
                    </div>
                    {/*leverage coinex*/}
                    <div>
                        <div className={"mb-3 d-flex gap-1 " + (birja === 5 ? "" : "d-none")}>


                                <label className="form-label my-1">Leverage:</label>
                                <p id='leverege' style={{display: 'none', color: 'red'}}>Invalid leverage value</p>
                                <select
                                    style={{height:"32px"}}
                                    value={coinexLeverage}
                                    onChange={(e)=>setCoinexLeverage(e.target.value)}
                                    name="timeframe"
                                    className="form-control"
                                >
                                    <option value="1">1X</option>
                                    <option value="2">2X</option>
                                    <option value="3">3X</option>
                                    <option value="5">5X</option>
                                    <option value="8">8X</option>
                                    <option value="10">10X</option>
                                    <option value="15">15X</option>
                                    <option value="20">20X</option>
                                    <option value="30">30X</option>
                                    <option value="50">50X</option>
                                </select>
                        </div>

                    </div>
                    {/*amount input*/}
                    <div className="md-3 d-flex gap-1">
                        <div>
                            <muhi
                                title="The percentage value of the overall USDT price in the future, opened for each trade."
                                className="form-label  my-1">Amount:
                            </muhi>

                            <p id='amount' style={{display: 'none', color: 'red'}}>Invalid leverage value</p>

                        </div>
                        <input
                            value={user?.amount}
                            style={{height: "30px", width: '58px'}}
                            // onChange={(e) => setUser({ ...user, amount: e.target.value })}
                            onChange={(e) => percentage(e, 'amount')}
                            type="number"
                            className="form-control"
                            required
                        />
                        <b className='text-warning my-1' style={{fontSize: 18}}>%</b>

                    </div>
                </div>
                {/* Leverage&Amount end  */}
                {/* margin start */}
                <div className='d-flex text-white p-2 justify-content-between align-items-center'>
                    <h3 className={''}>Margin:</h3>
                    <div className='d-flex  justify-content-evenly'>
                        <div className="form-check">
                            <input
                                checked={user?.margin == 0}
                                onChange={(e) => setUser({...user, margin: 0})}
                                className="form-check-input" type="checkbox"/>
                            <label style={{fontSize: 14}} className="form-check-label text-success">
                                CROSSED
                            </label>
                        </div>
                        <div className="form-check mx-2">
                            <input
                                checked={user?.margin == 1}
                                onChange={(e) => setUser({...user, margin: 1})} className="form-check-input"
                                type="checkbox"/>
                            <label style={{fontSize: 14}} className="form-check-label text-success">
                                ISOLATED
                            </label>
                        </div>
                    </div>
                </div>
                {/* margin end */}
                {/* take profit and stop loss start*/}
                <div className='d-flex p-2 justify-content-around'>
                    <h4>Take Profit and Stop Loss</h4>
                    <div className="form-check form-switch my-1 ">
                        <input

                            checked={user?.tpslstatus === 1}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            onChange={(e) => setUser({...user, tpslstatus: user?.tpslstatus === 0 ? 1 : 0})}
                        />


                    </div>
                </div>
                {/* take profit and stop loss end*/}


                {user?.tpslstatus === 1 ?
                    <div>
                        {/* 2 take profit start */}

                        <div className='d-flex p-2 justify-content-around'>
                            <h4>
                                <muhi style={{marginLeft: "30px"}}
                                      title="Setting two take profit levels for each trade">Two-step Take Profit
                                </muhi>
                            </h4>
                            <div className="form-check form-switch my-1 ">
                                <input
                                    checked={user?.tpstatus === 1}
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    onChange={(e) => {

                                        if (birja === 1 || birja===5) {
                                            toast.warning('This parameter is not supported by the exchange you selected, you can use another exchange!', {
                                                position: "top-right",
                                                autoClose: 1500,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,

                                                width: 100
                                            })

                                        } else {
                                            setUser({...user, tpstatus: user?.tpstatus === 0 ? 1 : 0})
                                        }
                                    }}
                                />

                            </div>
                        </div>
                        {/* 2 take profit end */}
                        <div>
                            {
                                (user?.tpslstatus === 1 && user?.tpstatus === 0) ?
                                    <>
                                        {/* Take Profit and Stop Loss amount start*/}
                                        <div className='p-3'>
                                            <div className="mb-3 d-flex gap-2">

                                                <div>
                                                    <label className="form-label my-1">Take Profit:</label>
                                                    <p id='takeprofit1' style={{display: 'none', color: 'red'}}>Invalid
                                                        leverage value</p>

                                                </div>
                                                <input
                                                    style={{height: "30px", width: '65px'}}
                                                    value={user?.takeprofit1}
                                                    // onChange={(e)=>setUser({...user, takeprofit1:e.target.value})}
                                                    onChange={(e) => percentage(e, 'takeprofit1')}
                                                    type="number" className="form-control "/>
                                                <b className='text-warning my-2' style={{fontSize: 18}}>%</b>
                                            </div>
                                            <div className="mb-3 d-flex gap-2">
                                                <div>
                                                    <label className="form-label  my-1">Stop Loss: </label>
                                                    <p id='stoploss' style={{display: 'none', color: 'red'}}>Invalid
                                                        leverage value</p>
                                                </div>
                                                <input
                                                    style={{height: "30px", width: '65px'}}
                                                    value={user?.stoploss}
                                                    //onChange={(e)=>setUser({...user, stoploss:e.target.value})}
                                                    onChange={(e) => percentage(e, 'stoploss')}
                                                    type="number" className="form-control "/>
                                                <b className='text-warning my-2' style={{fontSize: 18}}>%</b>
                                            </div>
                                        </div>
                                        {/* Take Profit and Stop Loss amount end */}

                                    </>
                                    :
                                    <>
                                        {/* 2 Amount Take Profit ON start */}
                                        <div className='p-1 '>
                                            <div style={{marginLeft: "15%"}} className='p-1 '>
                                                <div className="mb-3 d-flex gap-1 text-center ">
                                                    <div>
                                                        <label style={{fontSize: 14}} className="form-label my-1">
                                                            <ruzi
                                                                title="The profit value that needs to be closed at the first Take Profit">Take
                                                                Profit 1
                                                            </ruzi>
                                                        </label>
                                                        <p id='takeprofit1'
                                                           style={{display: 'none', color: 'red'}}>Invalid leverage
                                                            value</p>
                                                    </div>

                                                    <input
                                                        value={user?.takeprofit1}
                                                        onChange={(e) => percentage(e, 'takeprofit1')}
                                                        // onChange={(e)=>setUser({...user, takeprofit1:e.target.value})}
                                                        style={{height: "80%", width: 65}} type="number"
                                                        className="form-control "/>
                                                    <b className='text-warning my-1' style={{fontSize: 18}}>%</b>
                                                </div>
                                                <div className="mb-3 d-flex gap-1">
                                                    <div>
                                                        <label style={{fontSize: 14}} className="form-label my-1">
                                                            <ruzi
                                                                title="The profit value that needs to be closed at the first Take Profit">Take
                                                                Profit 2
                                                            </ruzi>
                                                        </label>
                                                        <p id='takeprofit2'
                                                           style={{display: 'none', color: 'red'}}>Invalid leverage
                                                            value</p>
                                                    </div>
                                                    <input
                                                        value={user?.takeprofit2}
                                                        onChange={(e) => percentage(e, 'takeprofit2')}
                                                        // onChange={(e)=>setUser({...user, takeprofit2:e.target.value})}
                                                        style={{height: "80%", width: 65}} type="number"
                                                        className="form-control "/>
                                                    <b className='text-warning my-1' style={{fontSize: 18}}>%</b>
                                                </div>
                                            </div>
                                            {/* range 1 */}
                                            <b style={{fontSize: 18}}>
                                                <muhi
                                                    title="The percentage portion closed at the first Take Profit of the opened trade.">Set
                                                    position fix Percent TP1:
                                                </muhi>
                                            </b>
                                            <div className='p-2 text-white'>
                                                <div style={{}}>
                                        <span style={{left: user?.tp1amount * 2}} id="rs-bullet1" className="rs-label">
                                        {user?.tp1amount}
                                        </span>
                                                    <input
                                                        id="rs-range-line"
                                                        className="rs-range"
                                                        type="range"
                                                        value={user?.tp1amount}
                                                        min="0"
                                                        max="100"
                                                        onChange={showSliderValue}
                                                    />
                                                </div>

                                                <div className="box-minmax">
                                                    <span>0</span>
                                                    <span>100%</span>
                                                </div>
                                            </div>
                                            <hr/>
                                            {/* range 2 */}
                                            <b className='my-2' style={{fontSize: 18}}>
                                                <muhi
                                                    title="The percentage portion closed at the second Take Profit of the opened trade.">Set
                                                    position fix Percent TP2:
                                                </muhi>
                                            </b>
                                            <div className='p-2 text-white'>
                                                <div style={{}}>
                                        <span style={{left: user?.tp2amount * 2}} id="rs-bullet" className="rs-label">
                                        {user?.tp2amount}
                                        </span>
                                                    <input
                                                        id="rs-range-line"
                                                        className="rs-range"
                                                        type="range"
                                                        value={user?.tp2amount}
                                                        min="0"
                                                        max="100"
                                                        onChange={showSliderValue2}
                                                    />
                                                </div>

                                                <div className="box-minmax">
                                                    <span>0</span>
                                                    <span>100%</span>
                                                </div>
                                            </div>
                                            <div style={{marginLeft: "15%", marginTop: '20px'}}
                                                 className="d-flex gap-2 ">
                                                <div>
                                                    <label style={{fontSize: '20px'}} className="form-label  my-1">Stop
                                                        Loss:</label>
                                                    <p id='stoploss' style={{display: 'none', color: 'red'}}>Invalid
                                                        leverage value</p>
                                                </div>
                                                <input
                                                    value={user?.stoploss}
                                                    onChange={(e) => percentage(e, 'stoploss')}
                                                    // onChange={(e)=>setUser({...user, stoploss:e.target.value})}
                                                    style={{height: "80%", width: 65}} type="number"
                                                    className="form-control "/>
                                                <b className='text-warning my-1' style={{fontSize: 18}}>%</b>

                                            </div>
                                        </div>
                                        {/* 2 Amount Take Profit ON end */}
                                    </>
                            }
                        </div>


                    </div>
                    :
                    <p></p>}

                <div className='text-end my-4 text-center'>
                    <button onClick={save} className='btn btn-primary w-75'> Save</button>
                </div>

            </div>
        </div>
    );
}

export default Userform;