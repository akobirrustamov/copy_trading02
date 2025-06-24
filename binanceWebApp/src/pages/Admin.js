import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { FiTrash2, FiPlus, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';
import Header from './Header';
import ApiCall from '../ApiCall/ApiCall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";

function Admin(props) {
    // const { userTelegram } = useTelegram();
    const userTelegram = { id: 5397857416 }
    const navigate = useNavigate();
    const [showRodal, setShowRodal] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({
        adminname: '',
        adminid: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    // SVG trash icon component
    const TrashIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    );

    useEffect(() => {
        getAdmins();
        if (!userTelegram?.id) {
            navigate("/404");
        }
    }, []);

    async function getAdmins() {
        setIsLoading(true);
        try {
            const result = await ApiCall('/api/v1/admins', 'get', null);
            if (!result.error) {
                setAdmins(result.data);
            } else {
                navigate("/404");
            }
        } catch (error) {
            navigate("/404");
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddAdmin = async (event) => {
        event.preventDefault();
        try {
            const result = await ApiCall('/api/v1/admins', 'post', newAdmin);
            if (!result.error) {
                setShowRodal(false);
                toast.success('Admin saved successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                getAdmins();
            } else {
                toast.error('Error adding admin');
            }
        } catch (error) {
            toast.error('Error adding admin');
        }
        setNewAdmin({
            adminname: '',
            adminid: '',
        });
    };

    const deleteAdmin = async (adminId) => {
        try {
            const result = await ApiCall(`/api/v1/admins/${adminId}`, 'delete', null);
            if (!result.error && result.data !== "!") {
                toast.success('Admin deleted successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                getAdmins();
            }
        } catch (error) {
            toast.error('Error deleting admin');
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        },
        exit: { opacity: 0, x: -50 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        },
        exit: { opacity: 0, scale: 0.9 }
    };

    return (
        <motion.div
            className="admin-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ToastContainer
                toastStyle={{
                    backgroundColor: '#1e1e1e',
                    color: '#f8f9fa',
                    border: '1px solid #333'
                }}
            />
            <Header name='admins' />
            <div className="admin-content">
                <div className="admin-header">
                    <motion.h1
                        className="admin-title"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <FiUser className="icon" /> Admin Management
                    </motion.h1>
                    <motion.button
                        onClick={() => setShowRodal(true)}
                        className="add-admin-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <FiPlus className="icon" /> Add Admin
                    </motion.button>
                </div>

                <div className="admin-table-container">
                    {isLoading ? (
                        <div className="loading-spinner">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    border: '4px solid #3f37c9',
                                    borderTopColor: 'transparent'
                                }}
                            />
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Name</th>
                                    <th>Telegram ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {admins.map((item, index) => (
                                        <motion.tr
                                            key={item.adminid}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            whileHover={{ backgroundColor: 'rgba(67, 97, 238, 0.1)' }}
                                        >
                                            <td>{index + 1}</td>
                                            <td>{item.adminname}</td>
                                            <td>{item.adminid}</td>
                                            <td>
                                                <motion.button
                                                    onClick={() => deleteAdmin(item.adminid)}
                                                    className="delete-btn"
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <TrashIcon />
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {showRodal && (
                    <Rodal
                        width={400}
                        height={350}
                        visible={showRodal}
                        onClose={() => setShowRodal(false)}
                        customStyles={{
                            borderRadius: '12px',
                            padding: '25px',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            boxSizing: 'border-box'
                        }}
                    >
                        <motion.div
                            className="modal-content"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <h2 className="modal-title">Add New Admin</h2>
                            <form onSubmit={handleAddAdmin} className="admin-form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <motion.input
                                        type="text"
                                        className="form-input"
                                        required
                                        value={newAdmin.adminname}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, adminname: e.target.value })}
                                        whileFocus={{
                                            boxShadow: '0 0 0 2px rgba(67, 97, 238, 0.5)'
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Telegram ID</label>
                                    <motion.input
                                        className="form-input"
                                        type="number"
                                        required
                                        value={newAdmin.adminid}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, adminid: e.target.value })}
                                        whileFocus={{
                                            boxShadow: '0 0 0 2px rgba(67, 97, 238, 0.5)'
                                        }}
                                    />
                                </div>
                                <div className="form-actions">
                                    <motion.button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setShowRodal(false)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        className="save-btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Save Admin
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </Rodal>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Admin;