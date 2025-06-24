import React, { useEffect, useState } from 'react';
import ApiCall from '../ApiCall/ApiCall';
import { useTelegram } from "../hooks/useTelegram";
import { useNavigate } from "react-router-dom";


function UserTraders(props) {
    const [admins, setAdmins] = useState([])
    //   const {userTelegram, tg} = useTelegram();
    const userTelegram = { id: 5397857416 }

    const navigate = useNavigate()
    useEffect(() => {
        getAdmins()
        if (userTelegram?.id == undefined) {
            navigate("/404")
        }
    }, []);

    async function getAdmins() {

        try {
            const result = await ApiCall('/api/v1/userjon/traders', 'get', null, { id: userTelegram.id });
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


    async function setSubscriber(uid) {
        console.log(uid, userTelegram.id);
        try {
            const result = await ApiCall('/api/v1/userjon/traders', 'put', null, { id: userTelegram.id, uid: uid });

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
            <div style={{
                backgroundColor: '#111827',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
                {/* Our Picks Section */}
                <div style={{ marginBottom: '32px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '24px'
                    }}>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            background: 'linear-gradient(to right, #3b82f6, #93c5fd)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}>
                            Our Picks
                        </h1>
                        <div style={{
                            marginLeft: '16px',
                            height: '1px',
                            flex: '1',
                            background: 'linear-gradient(to right, #1e3a8a, #3b82f6, transparent)'
                        }}></div>
                    </div>

                    {admins.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px 0' }}>
                            <h2 style={{ color: '#9ca3af', fontSize: '1.125rem' }}>We don't have Trades yet!</h2>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', minWidth: 'max-content' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #1e40af' }}>
                                        <th style={{ paddingBottom: '16px', textAlign: 'left', color: '#60a5fa', fontWeight: '500' }}>№</th>
                                        <th style={{ paddingBottom: '16px', textAlign: 'left', color: '#60a5fa', fontWeight: '500' }}>Trader Name</th>
                                        <th style={{ paddingBottom: '16px', textAlign: 'right', color: '#60a5fa', fontWeight: '500' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins
                                        .filter(item => item.trader_status === 0)
                                        .map((item, index) => (
                                            <tr
                                                key={item.uid}
                                                style={{
                                                    borderBottom: '1px solid #1f2937',
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                            >
                                                <td style={{ padding: '16px 0', color: '#d1d5db' }}>{index + 1}</td>
                                                <td style={{ padding: '16px 0' }}>
                                                    <a
                                                        href={`https://www.binance.com/en/futures-activity/leaderboard/user/um?encryptedUid=${item.uid.substring(2, item.uid.length - 2)}`}
                                                        style={{
                                                            color: '#60a5fa',
                                                            transition: 'color 0.2s ease',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            textDecoration: 'none'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#93c5fd'}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#60a5fa'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {item.tradername}
                                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '16px', width: '16px', marginLeft: '4px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                </td>
                                                <td style={{ padding: '16px 0', textAlign: 'right' }}>
                                                    <label style={{
                                                        position: 'relative',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={item.active}
                                                            onChange={() => setSubscriber(item.uid)}
                                                            style={{
                                                                position: 'absolute',
                                                                opacity: '0',
                                                                width: '0',
                                                                height: '0'
                                                            }}
                                                        />
                                                        <div style={{
                                                            width: '44px',
                                                            height: '24px',
                                                            backgroundColor: '#374151',
                                                            borderRadius: '9999px',
                                                            position: 'relative',
                                                            transition: 'background-color 0.2s ease'
                                                        }}>
                                                            <div style={{
                                                                content: '""',
                                                                position: 'absolute',
                                                                top: '2px',
                                                                left: '2px',
                                                                backgroundColor: 'white',
                                                                border: '1px solid #d1d5db',
                                                                borderRadius: '9999px',
                                                                height: '20px',
                                                                width: '20px',
                                                                transition: 'all 0.2s ease',
                                                                transform: item.active ? 'translateX(20px)' : 'translateX(0)'
                                                            }}></div>
                                                        </div>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Member's Picks Section */}
                <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '24px'
                    }}>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            background: 'linear-gradient(to right, #3b82f6, #93c5fd)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}>
                            Member's Picks
                        </h1>
                        <div style={{
                            marginLeft: '16px',
                            height: '1px',
                            flex: '1',
                            background: 'linear-gradient(to right, #1e3a8a, #3b82f6, transparent)'
                        }}></div>
                    </div>

                    {admins.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px 0' }}>
                            <h2 style={{ color: '#9ca3af', fontSize: '1.125rem' }}>We don't have Trades yet!</h2>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', minWidth: 'max-content' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #1e40af' }}>
                                        <th style={{ paddingBottom: '16px', textAlign: 'left', color: '#60a5fa', fontWeight: '500' }}>№</th>
                                        <th style={{ paddingBottom: '16px', textAlign: 'left', color: '#60a5fa', fontWeight: '500' }}>Trader Name</th>
                                        <th style={{ paddingBottom: '16px', textAlign: 'right', color: '#60a5fa', fontWeight: '500' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins
                                        .filter(item => item.trader_status === 1)
                                        .map((item, index) => (
                                            <tr
                                                key={item.uid}
                                                style={{
                                                    borderBottom: '1px solid #1f2937',
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                            >
                                                <td style={{ padding: '16px 0', color: '#d1d5db' }}>{index + 1}</td>
                                                <td style={{ padding: '16px 0' }}>
                                                    <a
                                                        href={`https://www.binance.com/en/futures-activity/leaderboard/user/um?encryptedUid=${item.uid.substring(2, item.uid.length - 2)}`}
                                                        style={{
                                                            color: '#60a5fa',
                                                            transition: 'color 0.2s ease',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            textDecoration: 'none'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#93c5fd'}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#60a5fa'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {item.tradername}
                                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '16px', width: '16px', marginLeft: '4px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                </td>
                                                <td style={{ padding: '16px 0', textAlign: 'right' }}>
                                                    <label style={{
                                                        position: 'relative',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={item.active}
                                                            onChange={() => setSubscriber(item.uid)}
                                                            style={{
                                                                position: 'absolute',
                                                                opacity: '0',
                                                                width: '0',
                                                                height: '0'
                                                            }}
                                                        />
                                                        <div style={{
                                                            width: '44px',
                                                            height: '24px',
                                                            backgroundColor: '#374151',
                                                            borderRadius: '9999px',
                                                            position: 'relative',
                                                            transition: 'background-color 0.2s ease'
                                                        }}>
                                                            <div style={{
                                                                content: '""',
                                                                position: 'absolute',
                                                                top: '2px',
                                                                left: '2px',
                                                                backgroundColor: 'white',
                                                                border: '1px solid #d1d5db',
                                                                borderRadius: '9999px',
                                                                height: '20px',
                                                                width: '20px',
                                                                transition: 'all 0.2s ease',
                                                                transform: item.active ? 'translateX(20px)' : 'translateX(0)'
                                                            }}></div>
                                                        </div>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default UserTraders;