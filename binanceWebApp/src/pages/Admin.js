import React, {useEffect, useState} from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import binPhoto from './../images/bin.png'
import './style.css'
import Header from './Header';
import ApiCall from '../ApiCall/ApiCall';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram";

function Admin(props) {
    const {userTelegram} = useTelegram();
    // const userTelegram={id:5397857416}

    const navigate=useNavigate();
    const  [showRodal, setShowRodal]=useState(false)
    const [admins, setAdmins]=useState([])
    const [newAdmin, setNewAdmin] = useState({
        adminname: '',
        adminid: '',
    });
    useEffect(() => {
        getAdmins()
        if(userTelegram?.id==undefined){
            navigate("/404")
        }
    }, []);

    async function getAdmins() {
        try {
            const result = await ApiCall('/api/v1/admins', 'get', null);
            if (!result.error) {
                setAdmins(result.data)
            } else {
                navigate("/404")
                // console.error('Error fetching admins:', result.error);
            }
        } catch (error) {
            navigate("/404")
            // console.error('Error fetching admins:', error);
        }
    }
    const handleAddAdmin = async (event) => {
        event.preventDefault();
        try {
            const result = await ApiCall('/api/v1/admins', 'post', newAdmin);
            if (!result.error) {
                // If the admin is added successfully, close the modal and refresh the admin list
                setShowRodal(false);
                toast('Admin saved successfully!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
        
                    width:100
                    });
                getAdmins();
            } else {
                console.error('Error adding admin:', result.error);
            }
        } catch (error) {
            console.error('Error adding admin:', error);
        }
        setNewAdmin({
            adminname: '',
            adminid: '',
        })
    };

    const deleteAdmin = async (adminId) => {
        try {
            const result = await ApiCall(`/api/v1/admins/${adminId}`, 'delete', null);
            if (!result.error && result.data!=="!") {
                toast.success('Admin deleted successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                getAdmins();
            } else {

            }
        } catch (error) {
            // console.error('Error deleting admin:', error);
        }
    };

    return (
        <div>
         <ToastContainer />
             <Header name='admins'/>
             <div className='ag-courses_box ' style={{color: 'white', fontSize: 20}}>
            
            <div id="wrapper">
               <div className='divFlex'>
                   <h1 style={{marginTop:5}}>Admins</h1>
                   <button onClick={()=>setShowRodal(true)} className='submit'>+Add</button>
               </div>
               <div style={{}}>
                <table  id="keywords"  className='table border-0 text-white'>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th><span>Name</span></th>

                        <th><span>Telegram ID</span></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                        admins.map((item, index)=>
                            <tr key={item.adminid}>
                                <td>{index+1}</td>
                                <td className="lalign">{item.adminname}</td>
                                <td>{item.adminid}</td>
                                <td onClick={()=>deleteAdmin(item.adminid)}>
                                    <img width={30} src={binPhoto} alt='...'/>
                                </td>
                            </tr>  
                        )
                    }
                    
                    
                    
                    </tbody>
                </table>
               </div> 
           </div> 

           <Rodal width={320} height={300} visible={showRodal} onClose={() => setShowRodal(false)}>
                <div className="container" style={{ color: 'black' }}>
                    <div className="">
                        Add new Admin
                    </div>
                    <form onSubmit={handleAddAdmin}>
                        <div className="form-row">
                            <div className="input-data">
                                <label htmlFor="">Name</label>

                                <input type="text" className={"form-control"} required value={newAdmin.adminname} onChange={(e) => setNewAdmin({ ...newAdmin, adminname: e.target.value })} />
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-data">
                                <label htmlFor="">Telegram ID</label>

                                <input className={"form-control"} type="number" required value={newAdmin.adminid} onChange={(e) => setNewAdmin({ ...newAdmin, adminid: e.target.value })} />
                                <div className="underline"></div>
                            </div>
                        </div>
                        <div className="form-row submit-btn">
                            <button type='submit' className='submit'>save</button>
                        </div>
                    </form>
                </div>
            </Rodal>
       </div>
        </div>
       
    );
}

export default Admin;