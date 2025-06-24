import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import binPhoto from './../images/bin.png'
import './style.css'
import Header from './Header';
import ApiCall from '../ApiCall/ApiCall';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";

function Statistic(props) {
    // const {userTelegram} = useTelegram();
    const userTelegram = { id: 5397857416 }
    const navigate = useNavigate();

    const [showRodal, setShowRodal] = useState(false)
    const [admins, setAdmins] = useState([])
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState({})
    const [traderStatus, setTraderStatus] = useState(0)
    const [newAdmin, setNewAdmin] = useState({
        tradername: '',
        uid: '',
        trader_status: 0
    });
    useEffect(() => {
        if (userTelegram?.id == undefined) {
            navigate("/404")
        }
        getAdmins()
    }, []);

    async function getAdmins() {
        try {
            const result = await ApiCall('/api/v1/traders', 'get', null);
            if (!result.error) {
                setAdmins(result.data);
            } else {
                navigate("/404")
                // console.error('Error fetching admins:', result.error);
            }
        } catch (error) {
            // navigate("/404")

            // console.error('Error fetching admins:', error);
        }
    }
    const handleAddAdmin = async (event) => {
        event.preventDefault();
        newAdmin.trader_status = traderStatus;
        console.log(newAdmin)
        try {
            const result = await ApiCall('/api/v1/traders', 'post', newAdmin);
            if (!result.error) {
                // If the admin is added successfully, close the modal and refresh the admin list
                setShowRodal(false);
                toast.success('Admin saved successfully!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,

                });

                getAdmins();
            } else {
                navigate("/404")
                // console.error('Error adding admin:', result.error);
            }
        } catch (error) {
            navigate("/404")
            // console.error('Error adding admin:', error);
        }
        setNewAdmin({
            tradername: '',
            uid: '',
        })
    };

    const deleteAdmin = async (adminId) => {
        try {
            const result = await ApiCall(`/api/v1/traders/${adminId}`, 'delete', null);
            if (!result.error) {
                toast.success('Admin deleted successfully!', {
                    position: "top-right",
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
            // console.error('Error deleting admin:', error);
        }
    };




    return (
        <div className={''}>
            <ToastContainer />
            <Header name='traders' />
            <div className="traders-dashboard" style={{
                backgroundColor: '#0f0f13',
                color: 'white',
                padding: 'clamp(1rem, 3vw, 2rem)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Our Picks Section */}
                <div className="section-container" style={{
                    backgroundColor: '#1a1a21',
                    borderRadius: '12px',
                    padding: 'clamp(1rem, 2vw, 1.5rem)',
                    marginBottom: 'clamp(1rem, 3vw, 2rem)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
                        paddingBottom: 'clamp(0.75rem, 2vw, 1rem)',
                        borderBottom: '1px solid #2e2e3a',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <h1 style={{
                            margin: 0,
                            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                            fontWeight: '600',
                            background: 'linear-gradient(90deg, #4361ee, #3a0ca3)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            whiteSpace: 'nowrap'
                        }}>Our Picks</h1>
                        {admins.length <= 11 && (
                            <button
                                onClick={() => {
                                    setShowRodal(true);
                                    setTraderStatus(0);
                                }}
                                style={{
                                    backgroundColor: '#4361ee',
                                    color: 'white',
                                    border: 'none',
                                    padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                                    transition: 'all 0.2s ease',
                                    fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                                    ':hover': {
                                        backgroundColor: '#3a56d4',
                                        transform: 'translateY(-1px)'
                                    }
                                }}
                            >
                                <span style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}>+</span> Add Trader
                            </button>
                        )}
                    </div>

                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            minWidth: '600px'
                        }}>
                            <thead>
                                <tr style={{
                                    backgroundColor: '#252531',
                                    borderBottom: '1px solid #2e2e3a'
                                }}>
                                    <th style={{
                                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                        color: '#a0a0a8',
                                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                    }}>№</th>
                                    <th style={{
                                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                        color: '#a0a0a8',
                                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                    }}>Name</th>
                                    <th style={{
                                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                        color: '#a0a0a8',
                                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                    }}>UID</th>
                                    <th style={{
                                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                        color: '#a0a0a8',
                                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                    }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.filter(item => item.trader_status === 0).map((item, index) => (
                                    <tr key={item.uid} style={{
                                        borderBottom: '1px solid #252531',
                                        transition: 'background 0.2s ease',
                                        ':hover': {
                                            backgroundColor: '#252531'
                                        }
                                    }}>
                                        <td style={{
                                            padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                        }}>{index + 1}</td>
                                        <td style={{
                                            padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                        }}>
                                            <a
                                                href={"https://www.binance.com/en/futures-activity/leaderboard/user/um?encryptedUid=" + item.uid}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: '#4361ee',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'all 0.2s ease',
                                                    ':hover': {
                                                        color: '#3a56d4',
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                {item.tradername}
                                            </a>
                                        </td>
                                        <td
                                            style={{
                                                padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                                cursor: 'pointer',
                                                color: '#b0b0b8',
                                                transition: 'color 0.2s ease',
                                                fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                                                ':hover': {
                                                    color: '#4361ee'
                                                }
                                            }}
                                            onClick={() => { setInfo(item); setShowInfo(true); }}
                                        >
                                            {item.uid.substring(0, 4)}...
                                            <span style={{
                                                marginLeft: 'clamp(0.3rem, 1vw, 0.5rem)',
                                                fontSize: 'clamp(0.6rem, 2vw, 0.7rem)',
                                                color: '#4361ee'
                                            }}>(view)</span>
                                        </td>
                                        <td
                                            style={{
                                                padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => deleteAdmin(item.uid)}
                                        >
                                            <div style={{
                                                width: 'clamp(28px, 3vw, 36px)',
                                                height: 'clamp(28px, 3vw, 36px)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'background 0.2s ease',
                                                ':hover': {
                                                    backgroundColor: 'rgba(255, 80, 80, 0.2)'
                                                }
                                            }}>
                                                <svg
                                                    width="clamp(16px, 2.5vw, 20px)"
                                                    height="clamp(16px, 2.5vw, 20px)"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#ff5050"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Member's Picks Section */}
                <div className="section-container" style={{
                    backgroundColor: '#1a1a21',
                    borderRadius: '12px',
                    padding: 'clamp(1rem, 2vw, 1.5rem)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
                        paddingBottom: 'clamp(0.75rem, 2vw, 1rem)',
                        borderBottom: '1px solid #2e2e3a',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <h1 style={{
                            margin: 0,
                            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                            fontWeight: '600',
                            background: 'linear-gradient(90deg, #4895ef, #3f37c9)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            whiteSpace: 'nowrap'
                        }}>Member's Picks</h1>
                        {admins.length <= 11 && (
                            <button
                                onClick={() => {
                                    setShowRodal(true);
                                    setTraderStatus(1);
                                }}
                                style={{
                                    backgroundColor: '#4895ef',
                                    color: 'white',
                                    border: 'none',
                                    padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                                    transition: 'all 0.2s ease',
                                    fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                                    ':hover': {
                                        backgroundColor: '#3f86d4',
                                        transform: 'translateY(-1px)'
                                    }
                                }}
                            >
                                <span style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}>+</span> Add Trader
                            </button>
                        )}
                    </div>

                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            minWidth: '600px'
                        }}>
                            <thead>
                                <tr style={{
                                    backgroundColor: '#252531',
                                    borderBottom: '1px solid #2e2e3a'
                                }}>
                                    <th style={{
                                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                        color: '#a0a0a8',
                                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                    }}>№</th>
                                    <th style={{
                                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                        color: '#a0a0a8',
                                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                    }}>Name</th>
                                    <th style={{
                                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                        color: '#a0a0a8',
                                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                    }}>UID</th>
                                    <th style={{
                                        padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                        color: '#a0a0a8',
                                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                    }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.filter(item => item.trader_status === 1).map((item, index) => (
                                    <tr key={item.uid} style={{
                                        borderBottom: '1px solid #252531',
                                        transition: 'background 0.2s ease',
                                        ':hover': {
                                            backgroundColor: '#252531'
                                        }
                                    }}>
                                        <td style={{
                                            padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                        }}>{index + 1}</td>
                                        <td style={{
                                            padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                                        }}>
                                            <a
                                                href={"https://www.binance.com/en/futures-activity/leaderboard/user/um?encryptedUid=" + item.uid}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: '#4895ef',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'all 0.2s ease',
                                                    ':hover': {
                                                        color: '#3f86d4',
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                {item.tradername}
                                            </a>
                                        </td>
                                        <td
                                            style={{
                                                padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                                cursor: 'pointer',
                                                color: '#b0b0b8',
                                                transition: 'color 0.2s ease',
                                                fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                                                ':hover': {
                                                    color: '#4895ef'
                                                }
                                            }}
                                            onClick={() => { setInfo(item); setShowInfo(true); }}
                                        >
                                            {item.uid.substring(0, 4)}...
                                            <span style={{
                                                marginLeft: 'clamp(0.3rem, 1vw, 0.5rem)',
                                                fontSize: 'clamp(0.6rem, 2vw, 0.7rem)',
                                                color: '#4895ef'
                                            }}>(view)</span>
                                        </td>
                                        <td
                                            style={{
                                                padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => deleteAdmin(item.uid)}
                                        >
                                            <div style={{
                                                width: 'clamp(28px, 3vw, 36px)',
                                                height: 'clamp(28px, 3vw, 36px)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'background 0.2s ease',
                                                ':hover': {
                                                    backgroundColor: 'rgba(255, 80, 80, 0.2)'
                                                }
                                            }}>
                                                <svg
                                                    width="clamp(16px, 2.5vw, 20px)"
                                                    height="clamp(16px, 2.5vw, 20px)"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#ff5050"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Trader Info Modal */}
                <Rodal
                    width={Math.min(400, window.innerWidth - 40)}
                    height={300}
                    visible={showInfo}
                    onClose={() => { setShowInfo(false); setInfo({}); }}
                    customStyles={{
                        backgroundColor: '#1a1a21',
                        color: 'white',
                        borderRadius: '12px',
                        padding: 'clamp(1rem, 2vw, 1.5rem)',
                        border: '1px solid #2e2e3a',
                        boxSizing: 'border-box',
                        maxWidth: 'calc(100vw - 40px)',
                        maxHeight: 'calc(100vh - 40px)'
                    }}
                >
                    <h2 style={{
                        color: '#ffffff',
                        marginTop: 0,
                        marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
                        fontSize: 'clamp(1.1rem, 4vw, 1.25rem)'
                    }}>Trader Details</h2>

                    <div style={{ marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            <span style={{
                                color: '#4361ee',
                                fontWeight: '500',
                                minWidth: '100px',
                                fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                            }}>Name:</span>
                            <span style={{
                                fontWeight: '500',
                                fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                            }}>{info?.tradername}</span>
                        </div>

                        <div>
                            <div style={{
                                color: '#4361ee',
                                fontWeight: '500',
                                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                                fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                            }}>UID:</div>
                            <div style={{
                                backgroundColor: '#252531',
                                padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                                borderRadius: '6px',
                                fontFamily: 'monospace',
                                wordBreak: 'break-all',
                                fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                                overflowWrap: 'break-word'
                            }}>{info?.uid}</div>
                        </div>
                    </div>
                </Rodal>

                {/* Add Trader Modal */}
                <Rodal
                    width={Math.min(400, window.innerWidth - 40)}
                    height={350}
                    visible={showRodal}
                    onClose={() => setShowRodal(false)}
                    customStyles={{
                        backgroundColor: '#1a1a21',
                        color: 'white',
                        borderRadius: '12px',
                        padding: 'clamp(1rem, 2vw, 1.5rem)',
                        border: '1px solid #2e2e3a',
                        boxSizing: 'border-box',
                        maxWidth: 'calc(100vw - 40px)',
                        maxHeight: 'calc(100vh - 40px)'
                    }}
                >
                    <h2 style={{
                        color: '#ffffff',
                        marginTop: 0,
                        marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
                        fontSize: 'clamp(1.1rem, 4vw, 1.25rem)'
                    }}>Add New Trader</h2>

                    <form onSubmit={handleAddAdmin} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'clamp(0.75rem, 2vw, 1.5rem)',
                        height: '100%'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                                color: '#a0a0a8',
                                fontWeight: '500',
                                fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                            }}>Name</label>
                            <input
                                type="text"
                                required
                                value={newAdmin.tradername}
                                onChange={(e) => setNewAdmin({ ...newAdmin, tradername: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                                    borderRadius: '6px',
                                    border: '1px solid #2e2e3a',
                                    backgroundColor: '#252531',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'border 0.2s ease',
                                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                                    ':focus': {
                                        borderColor: '#4361ee'
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                                color: '#a0a0a8',
                                fontWeight: '500',
                                fontSize: 'clamp(0.9rem, 3vw, 1rem)'
                            }}>Trader UID</label>
                            <input
                                type="text"
                                required
                                value={newAdmin.uid}
                                onChange={(e) => setNewAdmin({ ...newAdmin, uid: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                                    borderRadius: '6px',
                                    border: '1px solid #2e2e3a',
                                    backgroundColor: '#252531',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'border 0.2s ease',
                                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                                    ':focus': {
                                        borderColor: '#4361ee'
                                    }
                                }}
                            />
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: traderStatus === 0 ? '#4361ee' : '#4895ef',
                                    color: 'white',
                                    border: 'none',
                                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    width: '100%',
                                    maxWidth: '100%', // ← Bu qatorni qo'shing
                                    fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                                    ':hover': {
                                        backgroundColor: traderStatus === 0 ? '#3a56d4' : '#3f86d4'
                                    }
                                }}
                            >
                                Save Trader
                            </button>
                        </div>
                    </form>
                </Rodal>
            </div>
        </div>

    );
}

export default Statistic;