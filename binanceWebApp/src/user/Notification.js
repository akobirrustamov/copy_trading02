import React, { useEffect, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";
import { Link, useNavigate } from "react-router-dom";
import ApiCall from "../ApiCall/ApiCall";
import statisticPhoto from "../images/monitoring.png";

function Notification(props) {
    const [message, setMessage] = useState([])
    // const {userTelegram, tg} = useTelegram();
    const userTelegram = { id: 5774477233 }

    const navigate = useNavigate()
    useEffect(() => {
        getAdmins()
        if (userTelegram?.id == undefined) {
            navigate("/404")
        }
    }, []);

    async function getAdmins() {
        try {
            const result = await ApiCall('/api/v1/message', 'get', null, { id: userTelegram.id });
            if (!result.error) {
                setMessage(result.data);
            }
        } catch (error) {
            // Handle error
        }
    }

    return (
        <div style={{
            backgroundColor: '#0f172a',
            minHeight: '100vh',
            padding: '16px'
        }}>
            <h1 style={{
                color: 'white',
                textAlign: 'center',
                margin: '8px 0 24px 0',
                fontSize: '24px',
                fontWeight: '600',
                background: 'linear-gradient(90deg, #3b82f6, #93c5fd)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
            }}>Weekly Notifications</h1>

            {message.map(item => (
                <div key={item.id} style={{
                    marginBottom: '16px'
                }}>
                    <div style={{
                        borderRadius: '16px',
                        padding: '16px',
                        backgroundColor: '#1e293b',
                        border: `1px solid ${item.status ? '#10b981' : '#ef4444'}`,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s ease',
                        ':hover': {
                            transform: 'translateY(-2px)'
                        }
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: item.status ? '#10b981' : '#ef4444',
                                marginRight: '8px'
                            }}></div>
                            <h5 style={{
                                color: item.status ? '#10b981' : '#ef4444',
                                margin: '0',
                                fontSize: '16px',
                                fontWeight: '600'
                            }}>{item.status ? "Trade" : "Error"}</h5>
                            <span style={{
                                marginLeft: 'auto',
                                fontSize: '12px',
                                color: '#94a3b8'
                            }}>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p style={{
                            color: '#e2e8f0',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            margin: '8px 0 0 0'
                        }}>{item.messagetext}</p>
                    </div>
                </div>
            ))}

            {message.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 0',
                    color: '#94a3b8'
                }}>
                    <p style={{
                        fontSize: '16px'
                    }}>No notifications yet</p>
                </div>
            )}
        </div>
    );
}

export default Notification;