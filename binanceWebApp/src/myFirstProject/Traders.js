import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import binPhoto from './../images/bin.png';
import '../pages/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import ApiCall from "../ApiCall/ApiCall";

function Statistic(props) {
    const {userTelegram} = useTelegram();
    // const userTelegram = { id: 8558293763 };
    const navigate = useNavigate();
    const [showRodal, setShowRodal] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [info, setInfo] = useState({});
    const [newAdmin, setNewAdmin] = useState({
        tradername: '',
        uid: '',
    });

    useEffect(() => {
        if (userTelegram?.id === undefined) {
            navigate('/404');
        }
        getAdmins();
    }, []);

    async function getAdmins() {
        try {
            const result = await ApiCall('/api/v1/newtraders', 'GET');
            console.log(result.data.body)
            if (!result.error) {
                setAdmins(result.data.body);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    }

    const handleAddAdmin = async (event) => {
        event.preventDefault();
        try {
            const result = await ApiCall('/api/v1/newtraders', 'POST', newAdmin);
            if (!result.error) {
                setShowRodal(false);
                toast.success('Admin saved successfully!', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                getAdmins();
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
        setNewAdmin({
            tradername: '',
            uid: '',
        });
    };

    const deleteAdmin = async (adminId) => {
        try {
            const result = await ApiCall(`/api/v1/newtraders/${adminId}`, 'DELETE');
            if (!result.error) {
                toast.success('Admin deleted successfully!', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                getAdmins();
            } else {
                console.error('Error deleting admin:', result.error);
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div className="">
            <ToastContainer />
            <div className="ag-courses_box ">
                <div id="wrapper">
                    <div className="divFlex">
                        <h1 style={{ paddingTop: "8px", color:"white" }}>Traders</h1>
                        {admins.length < 10 && (
                            <button onClick={() => setShowRodal(true)} className="submit">
                                + Add
                            </button>
                        )}
                    </div>
                    <div>
                        <table id="keywords" className="table border-0 text-white">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>
                                    <span>Name</span>
                                </th>
                                <th>
                                    <span>UID</span>
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {admins.map((item, index) => (
                                <tr key={item.uid}>
                                    <td>{index + 1}</td>
                                    <td className="lalign" style={{ fontSize: '18px' }}>
                                        {item.tradername}
                                    </td>
                                    <td style={{ fontSize: '14px' }} onClick={() => { setInfo(item); setShowInfo(true); }}>
                                        {item.uid.substring(0, 4)}...
                                    </td>
                                    <td onClick={() => deleteAdmin(item.uid)}>
                                        <img width={30} src={binPhoto} alt="..." />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Rodal width={320} height={250} visible={showInfo} onClose={() => { setShowInfo(false); setInfo({}); }}>
                    <div className="container" style={{ color: 'black' }}>
                        <h1> Trader Info</h1>
                        <div className="d-flex">
                            <p className="text-warning">Trader name: </p> <h4 className="mx-1">{info?.tradername}</h4>
                        </div>
                        <p className="text-warning">Trader UID:</p>
                        <h6>{info?.uid}</h6>
                    </div>
                </Rodal>
                <Rodal width={320} height={280} visible={showRodal} onClose={() => setShowRodal(false)}>
                    <div className="container m-0" style={{ color: 'black' }}>
                        <div className="">Add new Trader</div>
                        <form onSubmit={handleAddAdmin}>
                            <div className="form-row">
                                <div className="input-data">
                                    <label htmlFor="">Name</label>
                                    <input className={'form-control'} type="text" required value={newAdmin.tradername} onChange={(e) => setNewAdmin({ ...newAdmin, tradername: e.target.value })} />
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <label htmlFor="">Trader UID</label>
                                    <input className={'form-control'} type="text" required value={newAdmin.uid} onChange={(e) => setNewAdmin({ ...newAdmin, uid: e.target.value })} />
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className="form-row submit-btn">
                                <button type="submit" className="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </Rodal>
            </div>
        </div>
    );
}

export default Statistic;
