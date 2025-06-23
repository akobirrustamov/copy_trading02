import React, { useState, useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import binPhoto from './../images/bin.png'
import './style.css'
import Header from './Header';
import ApiCall from '../ApiCall/ApiCall';
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
function Users(props) {
    // const {userTelegram} = useTelegram();
    const userTelegram = { id: 5397857416 }

    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [showRodal, setShowRodal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getUsers()
        setSearchTerm('')
        if (userTelegram?.id == undefined) {
            navigate("/404")
        }
    }, []);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") {
            getUsers()
        }
    };

    async function getUsers() {

        try {
            const result = await ApiCall('/api/v1/userjon', 'get', null, { search: searchTerm });
            // console.log(result.data)
            if (!result.error) {
                setUsers(result.data);
            } else {
            }
        } catch (error) {
            navigate("/404")
            // console.error('Error fetching user:', error);
        }
    }
    async function handleCheckboxChange(id) {
        try {
            const result = await ApiCall('/api/v1/userjon', 'put', null, { id: id });
            if (!result.error) {
                getUsers()

            } else {
                navigate("/404")
                // console.error('Error fetching admins:', result.error);
            }
        } catch (error) {
            navigate("/404")
            // console.error('Error fetching user:', error);
        }
    }

    return (
        <div>
            <Header name='users' />
            <div className='users-container' style={{ backgroundColor: '#0a0a0a', color: 'white', padding: '2rem' }}>
                <div className='search-section' style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
                    <input
                        className='search-input'
                        type='search'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid #333',
                            backgroundColor: '#111',
                            color: 'white',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                        }}
                        placeholder="Search users..."
                    />
                    <button
                        className='search-button'
                        onClick={getUsers}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#4361ee',
                            color: 'white',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Search
                    </button>
                </div>

                <div className='table-container' style={{ backgroundColor: '#111', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #222' }}>
                        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Users</h1>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#1a1a1a' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#aaa' }}>№</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#aaa' }}>Telegram ID</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#aaa' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#aaa' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((item, index) => (
                                <tr
                                    key={item.telegramid}
                                    style={{
                                        borderBottom: '1px solid #222',
                                        transition: 'background 0.2s ease',
                                        ':hover': { backgroundColor: '#1a1a1a' }
                                    }}
                                >
                                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{index + 1}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div>
                                            <p style={{ fontSize: '0.95rem', margin: '0 0 0.25rem 0', fontWeight: '500' }}>{item.telegramid}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#777', margin: 0 }}>{item.email}</p>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {item.status === 'noallowed' ? (
                                            <span style={{
                                                color: '#ffcc00',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                backgroundColor: '#332b00',
                                                fontSize: '0.75rem',
                                                fontWeight: '500'
                                            }}>
                                                Not Allowed
                                            </span>
                                        ) : item.status === 'on' ? (
                                            <span style={{
                                                color: '#00cc66',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                backgroundColor: '#00331a',
                                                fontSize: '0.75rem',
                                                fontWeight: '500'
                                            }}>
                                                ACTIVE
                                            </span>
                                        ) : (
                                            <span style={{
                                                color: '#ff3333',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                backgroundColor: '#330000',
                                                fontSize: '0.75rem',
                                                fontWeight: '500'
                                            }}>
                                                INACTIVE
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <label className="switch">
                                            <input
                                                checked={item.status !== 'noallowed'}
                                                type="checkbox"
                                                onChange={() => handleCheckboxChange(item.telegramid)}
                                                style={{ display: 'none' }}
                                            />
                                            <span className="slider" style={{
                                                position: 'relative',
                                                display: 'inline-block',
                                                width: '44px',
                                                height: '24px',
                                                backgroundColor: item.status === 'noallowed' ? '#333' : '#4361ee',
                                                borderRadius: '24px',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    content: '""',
                                                    height: '18px',
                                                    width: '18px',
                                                    left: item.status === 'noallowed' ? '3px' : '23px',
                                                    bottom: '3px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    transition: 'all 0.3s ease'
                                                }} />
                                            </span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Rodal
                    width={400}
                    visible={showRodal}
                    onClose={() => setShowRodal(false)}
                    customStyles={{
                        backgroundColor: '#111',
                        color: 'white',
                        borderRadius: '12px',
                        border: '1px solid #333',
                        boxShadow: '0 10px 50px rgba(0,0,0,0.5)'
                    }}
                >
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginTop: 0, color: '#eee' }}>User Details</h3>
                        {/* Add your modal content here */}
                    </div>
                </Rodal>
            </div>
        </div>

    );

}

export default Users;