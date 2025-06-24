import React, { useEffect, useState } from 'react';
import './range.css';
import ApiCall from '../ApiCall/ApiCall';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTelegram } from "../hooks/useTelegram";
import rasm1 from './important.png';

function Userform(props) {
    const userTelegram = { id: 5397857416 };
    const navigate = useNavigate();
    const [birja, setBirja] = useState(0);
    const [user, setUser] = useState({});
    const [coinexLeverage, setCoinexLeverage] = useState(1);
    const [bozor, setBozor] = useState([
        { id: 0, name: "", key: "", apiToken: "", apiKey: "", password: false, status: false, leverage: 0 },
        { id: 1, name: "Bybit", key: "bybit", apiToken: "", apiKey: "", password: "", status: false, leverage: 100 },
        { id: 2, name: "Bitget", key: "bitget", apiToken: "", apiKey: "", password: '', status: false, leverage: 125 },
        { id: 3, name: "BingX", key: "bingx", apiToken: "", apiKey: "", password: "", status: false, leverage: 125 },
        { id: 4, name: "Binance", key: "kucoin", apiToken: "", apiKey: "", password: '', status: false, leverage: 125 },
        { id: 5, name: "Coinex", key: "coinex", apiToken: "", apiKey: "", password: '', status: false, leverage: 125 }
    ]);

    useEffect(() => {
        getMe();
        if (userTelegram?.id == undefined) {
            navigate("/404");
        }
    }, []);

    async function getMe() {
        try {
            const result = await ApiCall('/api/v1/userjon/me', 'get', null, { id: userTelegram.id });
            if (!result.error) {
                setUser(result.data);
                const updatedBozor = [...bozor];

                if (result.data?.bybit !== '') {
                    setBirja(1);
                    updatedBozor[1].apiToken = result.data.bybit.split("//")[0];
                    updatedBozor[1].apiKey = result.data.bybit.split("//")[1];
                    updatedBozor[1].status = true;
                }
                if (result.data?.bitget !== '') {
                    setBirja(2);
                    updatedBozor[2].apiToken = result.data.bitget.split("//")[0];
                    updatedBozor[2].apiKey = result.data.bitget.split("//")[1];
                    updatedBozor[2].password = result.data.password;
                    updatedBozor[2].status = true;
                }
                if (result.data?.bingx !== '') {
                    setBirja(3);
                    updatedBozor[3].apiToken = result.data.bingx.split("//")[0];
                    updatedBozor[3].apiKey = result.data.bingx.split("//")[1];
                    updatedBozor[3].status = true;
                }
                if (result.data?.kucoin !== '') {
                    setBirja(4);
                    updatedBozor[4].apiToken = result.data.kucoin.split("//")[0];
                    updatedBozor[4].apiKey = result.data.kucoin.split("//")[1];
                    updatedBozor[4].password = result.data.password;
                    updatedBozor[4].status = true;
                }
                if (result.data?.coinex !== '') {
                    setBirja(5);
                    updatedBozor[5].apiToken = result.data.coinex.split("//")[0];
                    updatedBozor[5].apiKey = result.data.coinex.split("//")[1];
                    updatedBozor[5].password = result.data.password;
                    setCoinexLeverage(result.data.leverage);
                    updatedBozor[5].status = true;
                }
                setBozor(updatedBozor);
            }
        } catch (error) {
            // Handle error
        }
    }

    async function save() {
        let data = user;
        let aler = false;

        if (birja > 0 && birja < 6) {
            if (bozor[birja].apiToken !== "" && bozor[birja].apiKey !== "") {
                data.bitget = '';
                data.bybit = '';
                data.bingx = '';
                data.kucoin = '';
                data.coinex = '';
                data[bozor[birja].key] = bozor[birja].apiToken + "//" + bozor[birja].apiKey;
                data.password = bozor[birja].password;
            } else {
                aler = true;
            }

            if (birja !== 5) {
                if (!(data.leverage >= 0 && data.leverage <= bozor[birja].leverage && data.amount > 0)) {
                    aler = true;
                }

                if (data.tpslstatus !== 0) {
                    if (data.tpstatus === 0) {
                        if (!(data.takeprofit1 > 0 && data.stoploss >= 0)) {
                            aler = true;
                        }
                    } else {
                        if (!(data.takeprofit1 > 0 && data.takeprofit2 > 0 && data.tp1amount > 0 && data.tp2amount > 0 && data.stoploss >= 0)) {
                            aler = true;
                        }
                    }
                }
            } else if (birja === 5) {
                data.leverage = coinexLeverage;
            }
        } else {
            aler = true;
        }

        if (aler) {
            toast.error('Please enter your details completely!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        } else {
            toast.success('Data saved successfully!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        try {
            const result = await ApiCall('/api/v1/userjon/setting', 'put', data);
            if (result.error) {
                toast.error('Please enter your details completely!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            // Handle error
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
        setBozor(updatedBozor);
    }

    function validation(e) {
        let num = e.target.value;
        let err = document.getElementById('leverege');
        let maxLeverage = bozor[birja]?.leverage || 125;

        if (num >= 0 && num <= maxLeverage) {
            setUser({ ...user, leverage: e.target.value });
            err.style.display = 'none';
        } else {
            err.innerText = "Max value " + maxLeverage;
            err.style.display = 'block';
        }
    }

    function percentage(e, type) {
        let num = e.target.value;
        let err = document.getElementById(type);

        if (num < 101 && num >= 0) {
            setUser({ ...user, [type]: e.target.value });
            err.style.display = 'none';
        } else {
            err.innerText = "1-100%";
            err.style.display = 'block';
        }
    }

    return (
        <div style={{
            backgroundColor: '#0f172a',
            color: 'white',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <ToastContainer />

            <div style={{
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <h1 style={{
                    color: 'white',
                    margin: '20px 0',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #3b82f6, #93c5fd)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                }}>⚙️ Trade Settings</h1>
            </div>

            {/* Exchange Selection */}
            <div style={{
                backgroundColor: '#1e293b',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{
                    color: '#e2e8f0',
                    fontSize: '18px',
                    marginBottom: '15px',
                    fontWeight: '600'
                }}>Select Exchange</h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    {bozor.slice(1).map((exchange) => (
                        <div key={exchange.id} style={{
                            flex: '1',
                            minWidth: '80px',
                            textAlign: 'center'
                        }}>
                            <label style={{
                                display: 'block',
                                cursor: 'pointer',
                                padding: '10px',
                                borderRadius: '8px',
                                backgroundColor: birja === exchange.id ? '#3b82f6' : '#334155',
                                transition: 'all 0.2s',
                                ':hover': {
                                    backgroundColor: '#3b82f6'
                                }
                            }}>
                                <input
                                    type="radio"
                                    name="exchange"
                                    checked={birja === exchange.id}
                                    onChange={() => {
                                        if (exchange.id === 5) {
                                            setBirja(5);
                                            setUser({ ...user, tpslstatus: 0 });
                                        } else {
                                            setBirja(exchange.id);
                                        }
                                    }}
                                    style={{ display: 'none' }}
                                />
                                <span style={{
                                    color: birja === exchange.id ? 'white' : '#e2e8f0',
                                    fontWeight: '500'
                                }}>{exchange.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* API Keys Section */}
            {birja > 0 && (
                <div style={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <h2 style={{
                        color: '#e2e8f0',
                        fontSize: '18px',
                        marginBottom: '15px',
                        fontWeight: '600'
                    }}>{bozor[birja].name} API Settings</h2>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{
                            display: 'block',
                            color: '#94a3b8',
                            marginBottom: '5px',
                            fontSize: '14px'
                        }}>API Key</label>
                        <input
                            value={bozor[birja].apiToken}
                            onChange={(e) => setKeys(e, 'apiToken')}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #334155',
                                backgroundColor: '#0f172a',
                                color: 'white',
                                outline: 'none',
                                ':focus': {
                                    borderColor: '#3b82f6'
                                }
                            }}
                            placeholder="Enter API Key"
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{
                            display: 'block',
                            color: '#94a3b8',
                            marginBottom: '5px',
                            fontSize: '14px'
                        }}>API Secret</label>
                        <input
                            value={bozor[birja].apiKey}
                            onChange={(e) => setKeys(e, 'apiKey')}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #334155',
                                backgroundColor: '#0f172a',
                                color: 'white',
                                outline: 'none',
                                ':focus': {
                                    borderColor: '#3b82f6'
                                }
                            }}
                            placeholder="Enter API Secret"
                        />
                    </div>

                    {birja === 2 && (
                        <div>
                            <label style={{
                                display: 'block',
                                color: '#94a3b8',
                                marginBottom: '5px',
                                fontSize: '14px'
                            }}>API Password</label>
                            <input
                                type="password"
                                value={bozor[birja].password}
                                onChange={(e) => setKeys(e, 'password')}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #334155',
                                    backgroundColor: '#0f172a',
                                    color: 'white',
                                    outline: 'none',
                                    ':focus': {
                                        borderColor: '#3b82f6'
                                    }
                                }}
                                placeholder="Enter API Password"
                            />
                        </div>
                    )}

                    {birja === 4 && (
                        <div style={{
                            marginTop: '15px',
                            padding: '10px',
                            backgroundColor: '#1e40af20',
                            borderRadius: '8px',
                            borderLeft: '3px solid #3b82f6'
                        }}>
                            <p style={{
                                color: '#93c5fd',
                                fontSize: '14px',
                                marginBottom: '5px'
                            }}>Add these IPs to your whitelist:</p>
                            <p style={{
                                color: '#60a5fa',
                                fontSize: '13px',
                                margin: '5px 0'
                            }}>93.93.207.166</p>
                            <p style={{
                                color: '#60a5fa',
                                fontSize: '13px',
                                margin: '5px 0'
                            }}>93.93.207.155</p>
                        </div>
                    )}
                </div>
            )}

            {/* Trading Settings */}
            {birja > 0 && (
                <div style={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <h2 style={{
                        color: '#e2e8f0',
                        fontSize: '18px',
                        marginBottom: '15px',
                        fontWeight: '600'
                    }}>Trading Settings</h2>

                    {/* Leverage Settings */}
                    {birja !== 5 && (
                        <div style={{
                            marginBottom: '20px',
                            paddingBottom: '20px',
                            borderBottom: '1px solid #334155'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '15px'
                            }}>
                                <h3 style={{
                                    color: '#e2e8f0',
                                    fontSize: '16px'
                                }}>Leverage Mode</h3>
                                <div style={{
                                    display: 'flex',
                                    gap: '15px'
                                }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        cursor: 'pointer'
                                    }}>
                                        <input
                                            type="radio"
                                            checked={!(user?.leverage == 0)}
                                            onChange={() => setUser({ ...user, leverage: 1 })}
                                            style={{
                                                accentColor: '#3b82f6'
                                            }}
                                        />
                                        <span style={{
                                            color: user?.leverage != 0 ? '#3b82f6' : '#94a3b8',
                                            fontWeight: user?.leverage != 0 ? '500' : 'normal'
                                        }}>Custom</span>
                                    </label>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        cursor: 'pointer'
                                    }}>
                                        <input
                                            type="radio"
                                            checked={user?.leverage == 0}
                                            onChange={() => setUser({ ...user, leverage: 0 })}
                                            style={{
                                                accentColor: '#3b82f6'
                                            }}
                                        />
                                        <span style={{
                                            color: user?.leverage == 0 ? '#3b82f6' : '#94a3b8',
                                            fontWeight: user?.leverage == 0 ? '500' : 'normal'
                                        }}>Trader</span>
                                    </label>
                                </div>
                            </div>

                            {user?.leverage !== 0 && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{
                                            display: 'block',
                                            color: '#94a3b8',
                                            marginBottom: '5px',
                                            fontSize: '14px'
                                        }}>Leverage</label>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}>
                                            <input
                                                value={user?.leverage}
                                                onChange={(e) => validation(e)}
                                                type="number"
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #334155',
                                                    backgroundColor: '#0f172a',
                                                    color: 'white',
                                                    outline: 'none',
                                                    maxWidth: '80px',
                                                    ':focus': {
                                                        borderColor: '#3b82f6'
                                                    }
                                                }}
                                            />
                                            <span style={{
                                                color: '#3b82f6',
                                                fontWeight: 'bold'
                                            }}>x</span>
                                        </div>
                                        <p id="leverege" style={{
                                            display: 'none',
                                            color: '#ef4444',
                                            fontSize: '12px',
                                            marginTop: '5px'
                                        }}></p>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <label style={{
                                            display: 'block',
                                            color: '#94a3b8',
                                            marginBottom: '5px',
                                            fontSize: '14px'
                                        }}>Amount (%)</label>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}>
                                            <input
                                                value={user?.amount}
                                                onChange={(e) => percentage(e, 'amount')}
                                                type="number"
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #334155',
                                                    backgroundColor: '#0f172a',
                                                    color: 'white',
                                                    outline: 'none',
                                                    maxWidth: '80px',
                                                    ':focus': {
                                                        borderColor: '#3b82f6'
                                                    }
                                                }}
                                            />
                                            <span style={{
                                                color: '#3b82f6',
                                                fontWeight: 'bold'
                                            }}>%</span>
                                        </div>
                                        <p id="amount" style={{
                                            display: 'none',
                                            color: '#ef4444',
                                            fontSize: '12px',
                                            marginTop: '5px'
                                        }}></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Coinex Leverage Selector */}
                    {birja === 5 && (
                        <div style={{
                            marginBottom: '20px',
                            paddingBottom: '20px',
                            borderBottom: '1px solid #334155'
                        }}>
                            <label style={{
                                display: 'block',
                                color: '#94a3b8',
                                marginBottom: '10px',
                                fontSize: '14px'
                            }}>Leverage</label>
                            <select
                                value={coinexLeverage}
                                onChange={(e) => setCoinexLeverage(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #334155',
                                    backgroundColor: '#0f172a',
                                    color: 'white',
                                    outline: 'none',
                                    ':focus': {
                                        borderColor: '#3b82f6'
                                    }
                                }}
                            >
                                {[1, 2, 3, 5, 8, 10, 15, 20, 30, 50].map((value) => (
                                    <option key={value} value={value}>{value}X</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Margin Mode */}
                    <div style={{
                        marginBottom: '20px',
                        paddingBottom: '20px',
                        borderBottom: '1px solid #334155'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{
                                color: '#e2e8f0',
                                fontSize: '16px'
                            }}>Margin Mode</h3>
                            <div style={{
                                display: 'flex',
                                gap: '15px'
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    cursor: 'pointer'
                                }}>
                                    <input
                                        type="radio"
                                        checked={user?.margin == 0}
                                        onChange={() => setUser({ ...user, margin: 0 })}
                                        style={{
                                            accentColor: '#3b82f6'
                                        }}
                                    />
                                    <span style={{
                                        color: user?.margin == 0 ? '#3b82f6' : '#94a3b8',
                                        fontWeight: user?.margin == 0 ? '500' : 'normal'
                                    }}>Cross</span>
                                </label>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    cursor: 'pointer'
                                }}>
                                    <input
                                        type="radio"
                                        checked={user?.margin == 1}
                                        onChange={() => setUser({ ...user, margin: 1 })}
                                        style={{
                                            accentColor: '#3b82f6'
                                        }}
                                    />
                                    <span style={{
                                        color: user?.margin == 1 ? '#3b82f6' : '#94a3b8',
                                        fontWeight: user?.margin == 1 ? '500' : 'normal'
                                    }}>Isolated</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* TP/SL Settings */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px'
                    }}>
                        <h3 style={{
                            color: '#e2e8f0',
                            fontSize: '16px'
                        }}>Take Profit/Stop Loss</h3>
                        <label style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '50px',
                            height: '24px'
                        }}>
                            <input
                                type="checkbox"
                                checked={user?.tpslstatus === 1}
                                onChange={(e) => setUser({ ...user, tpslstatus: user?.tpslstatus === 0 ? 1 : 0 })}
                                style={{
                                    opacity: '0',
                                    width: '0',
                                    height: '0'
                                }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: '0',
                                left: '0',
                                right: '0',
                                bottom: '0',
                                backgroundColor: user?.tpslstatus === 1 ? '#3b82f6' : '#64748b',
                                transition: '.4s',
                                borderRadius: '24px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    height: '16px',
                                    width: '16px',
                                    left: '4px',
                                    bottom: '4px',
                                    backgroundColor: 'white',
                                    transition: '.4s',
                                    borderRadius: '50%',
                                    transform: user?.tpslstatus === 1 ? 'translateX(26px)' : 'translateX(0)'
                                }}></span>
                            </span>
                        </label>
                    </div>

                    {user?.tpslstatus === 1 && (
                        <>
                            {/* Two-step TP */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '15px'
                            }}>
                                <h3 style={{
                                    color: '#e2e8f0',
                                    fontSize: '16px'
                                }}>Two-step Take Profit</h3>
                                <label style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    width: '50px',
                                    height: '24px'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={user?.tpstatus === 1}
                                        onChange={(e) => {
                                            if (birja === 1 || birja === 5) {
                                                toast.warning('This parameter is not supported by the exchange you selected', {
                                                    position: "top-right",
                                                    autoClose: 1500,
                                                });
                                            } else {
                                                setUser({ ...user, tpstatus: user?.tpstatus === 0 ? 1 : 0 });
                                            }
                                        }}
                                        style={{
                                            opacity: '0',
                                            width: '0',
                                            height: '0'
                                        }}
                                    />
                                    <span style={{
                                        position: 'absolute',
                                        cursor: 'pointer',
                                        top: '0',
                                        left: '0',
                                        right: '0',
                                        bottom: '0',
                                        backgroundColor: user?.tpstatus === 1 ? '#3b82f6' : '#64748b',
                                        transition: '.4s',
                                        borderRadius: '24px'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            height: '16px',
                                            width: '16px',
                                            left: '4px',
                                            bottom: '4px',
                                            backgroundColor: 'white',
                                            transition: '.4s',
                                            borderRadius: '50%',
                                            transform: user?.tpstatus === 1 ? 'translateX(26px)' : 'translateX(0)'
                                        }}></span>
                                    </span>
                                </label>
                            </div>

                            {/* Simple TP/SL */}
                            {user?.tpstatus === 0 ? (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '15px'
                                }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            color: '#94a3b8',
                                            marginBottom: '5px',
                                            fontSize: '14px'
                                        }}>Take Profit (%)</label>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}>
                                            <input
                                                value={user?.takeprofit1}
                                                onChange={(e) => percentage(e, 'takeprofit1')}
                                                type="number"
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #334155',
                                                    backgroundColor: '#0f172a',
                                                    color: 'white',
                                                    outline: 'none',
                                                    ':focus': {
                                                        borderColor: '#3b82f6'
                                                    }
                                                }}
                                            />
                                            <span style={{
                                                color: '#3b82f6',
                                                fontWeight: 'bold'
                                            }}>%</span>
                                        </div>
                                        <p id="takeprofit1" style={{
                                            display: 'none',
                                            color: '#ef4444',
                                            fontSize: '12px',
                                            marginTop: '5px'
                                        }}></p>
                                    </div>

                                    <div>
                                        <label style={{
                                            display: 'block',
                                            color: '#94a3b8',
                                            marginBottom: '5px',
                                            fontSize: '14px'
                                        }}>Stop Loss (%)</label>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}>
                                            <input
                                                value={user?.stoploss}
                                                onChange={(e) => percentage(e, 'stoploss')}
                                                type="number"
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #334155',
                                                    backgroundColor: '#0f172a',
                                                    color: 'white',
                                                    outline: 'none',
                                                    ':focus': {
                                                        borderColor: '#3b82f6'
                                                    }
                                                }}
                                            />
                                            <span style={{
                                                color: '#3b82f6',
                                                fontWeight: 'bold'
                                            }}>%</span>
                                        </div>
                                        <p id="stoploss" style={{
                                            display: 'none',
                                            color: '#ef4444',
                                            fontSize: '12px',
                                            marginTop: '5px'
                                        }}></p>
                                    </div>
                                </div>
                            ) : (
                                /* Advanced TP/SL */
                                <div>
                                    <div style={{
                                        display: 'flex-column',
                                        
                                        gap: '15px',
                                        marginBottom: '15px'
                                    }}>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                color: '#94a3b8',
                                                marginBottom: '5px',
                                                fontSize: '14px'
                                            }}>TP1 (%)</label>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}>
                                                <input
                                                    value={user?.takeprofit1}
                                                    onChange={(e) => percentage(e, 'takeprofit1')}
                                                    type="number"
                                                    style={{
                                                        flex: 1,
                                                        padding: '10px',
                                                        borderRadius: '8px',
                                                        border: '1px solid #334155',
                                                        backgroundColor: '#0f172a',
                                                        color: 'white',
                                                        outline: 'none',
                                                        ':focus': {
                                                            borderColor: '#3b82f6'
                                                        }
                                                    }}
                                                />
                                                <span style={{
                                                    color: '#3b82f6',
                                                    fontWeight: 'bold'
                                                }}>%</span>
                                            </div>
                                            <p id="takeprofit1" style={{
                                                display: 'none',
                                                color: '#ef4444',
                                                fontSize: '12px',
                                                marginTop: '5px'
                                            }}></p>
                                        </div>

                                        <div>
                                            <label style={{
                                                display: 'block',
                                                color: '#94a3b8',
                                                marginBottom: '5px',
                                                fontSize: '14px'
                                            }}>TP2 (%)</label>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}>
                                                <input
                                                    value={user?.takeprofit2}
                                                    onChange={(e) => percentage(e, 'takeprofit2')}
                                                    type="number"
                                                    style={{
                                                        flex: 1,
                                                        padding: '10px',
                                                        borderRadius: '8px',
                                                        border: '1px solid #334155',
                                                        backgroundColor: '#0f172a',
                                                        color: 'white',
                                                        outline: 'none',
                                                        ':focus': {
                                                            borderColor: '#3b82f6'
                                                        }
                                                    }}
                                                />
                                                <span style={{
                                                    color: '#3b82f6',
                                                    fontWeight: 'bold'
                                                }}>%</span>
                                            </div>
                                            <p id="takeprofit2" style={{
                                                display: 'none',
                                                color: '#ef4444',
                                                fontSize: '12px',
                                                marginTop: '5px'
                                            }}></p>
                                        </div>
                                    </div>

                                    {/* TP1 Amount Slider */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{
                                            display: 'block',
                                            color: '#94a3b8',
                                            marginBottom: '10px',
                                            fontSize: '14px'
                                        }}>TP1 Position Size: {user?.tp1amount}%</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={user?.tp1amount}
                                                onChange={showSliderValue}
                                                style={{
                                                    width: '100%',
                                                    height: '6px',
                                                    borderRadius: '3px',
                                                    background: '#334155',
                                                    outline: 'none',
                                                    appearance: 'none',
                                                    '::-webkit-slider-thumb': {
                                                        appearance: 'none',
                                                        width: '18px',
                                                        height: '18px',
                                                        borderRadius: '50%',
                                                        background: '#3b82f6',
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            />
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: '5px'
                                            }}>
                                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>0%</span>
                                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>100%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* TP2 Amount Slider */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{
                                            display: 'block',
                                            color: '#94a3b8',
                                            marginBottom: '10px',
                                            fontSize: '14px'
                                        }}>TP2 Position Size: {user?.tp2amount}%</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={user?.tp2amount}
                                                onChange={showSliderValue2}
                                                style={{
                                                    width: '100%',
                                                    height: '6px',
                                                    borderRadius: '3px',
                                                    background: '#334155',
                                                    outline: 'none',
                                                    appearance: 'none',
                                                    '::-webkit-slider-thumb': {
                                                        appearance: 'none',
                                                        width: '18px',
                                                        height: '18px',
                                                        borderRadius: '50%',
                                                        background: '#3b82f6',
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            />
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: '5px'
                                            }}>
                                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>0%</span>
                                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>100%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stop Loss */}
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            color: '#94a3b8',
                                            marginBottom: '5px',
                                            fontSize: '14px'
                                        }}>Stop Loss (%)</label>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}>
                                            <input
                                                value={user?.stoploss}
                                                onChange={(e) => percentage(e, 'stoploss')}
                                                type="number"
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #334155',
                                                    backgroundColor: '#0f172a',
                                                    color: 'white',
                                                    outline: 'none',
                                                    ':focus': {
                                                        borderColor: '#3b82f6'
                                                    }
                                                }}
                                            />
                                            <span style={{
                                                color: '#3b82f6',
                                                fontWeight: 'bold'
                                            }}>%</span>
                                        </div>
                                        <p id="stoploss" style={{
                                            display: 'none',
                                            color: '#ef4444',
                                            fontSize: '12px',
                                            marginTop: '5px'
                                        }}></p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Save Button */}
            <button
                onClick={save}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    ':hover': {
                        opacity: '0.9'
                    }
                }}
            >
                Save Settings
            </button>
        </div>
    );
}

export default Userform;