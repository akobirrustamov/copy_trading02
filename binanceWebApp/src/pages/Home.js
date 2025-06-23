import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import adminPhoto from './../images/admin.png'
import usersPhoto from './../images/man.png'
import statisticPhoto from './../images/monitoring.png'
function Home(props) {
    // const {user, onClose} = useTelegram();

    return (
       <div >
        <Header name='home'/>
       
        <div className="ag-courses_box my-3" >
        
        <div id="response-container" style={{color: 'aliceblue'}}>
            {/*add admins */}
            <div className='ag-courses_item'>
            <Link to={'admins'} className="ag-courses-item_link">
                {/* <div className="ag-courses-item_bg"></div> */}
                <div>
                    <img width={'120'} height={100} src={adminPhoto} alt='..'/>
                </div>
                <div className="ag-courses-item_title">
                     Admins
                </div> 
                
                
            </Link>
            </div>
            {/* users */}
            <div className='ag-courses_item'>
            <Link to={'/users'} className="ag-courses-item_link">
                {/* <div className="ag-courses-item_bg"></div> */}
                <div>
                    <img width={'120'} height={100} src={usersPhoto} alt='..'/>
                </div>
                <div className="ag-courses-item_title">
                    Users
                </div> 
                
                
            </Link>
            </div>
            {/* static */}
            <div className='ag-courses_item'>
            <Link to={'/traders'} className="ag-courses-item_link">
                {/* <div className="ag-courses-item_bg"></div> */}
                <div>
                    <img width={'120'} height={100} src={statisticPhoto} alt='..'/>
                </div>
                <div className="ag-courses-item_title">
                    Traders
                </div> 
                
                
            </Link>
            </div>
        </div>
    
        

    </div>
       </div>
          
       
    );
}

export default Home;