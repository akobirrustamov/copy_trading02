import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
import Header from './Header';
import adminPhoto from './../images/admin.png'
import usersPhoto from './../images/man.png'
import statisticPhoto from './../images/monitoring.png'
function Home(props) {
    // const {user, onClose} = useTelegram();

    return (
        <div>
            <Header name='home' />
            <div className="dashboard-container">
                <div className="grid-container">
                    {/* Admins Card */}
                    <div className="dashboard-card">
                        <Link to={'admins'} className="card-link">
                            <div className="card-icon-container">
                                <img src={adminPhoto} alt="Admins" className="card-icon" />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">Admins</h3>
                                <div className="card-hover-effect"></div>
                            </div>
                        </Link>
                    </div>
                    {/* Users Card */}
                    <div className="dashboard-card">
                        <Link to={'/users'} className="card-link">
                            <div className="card-icon-container">
                                <img src={usersPhoto} alt="Users" className="card-icon" />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">Users</h3>
                                <div className="card-hover-effect"></div>
                            </div>
                        </Link>
                    </div>
                    {/* Traders Card */}
                    <div className="dashboard-card">
                        <Link to={'/traders'} className="card-link">
                            <div className="card-icon-container">
                                <img src={statisticPhoto} alt="Traders" className="card-icon" />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">Traders</h3>
                                <div className="card-hover-effect"></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;