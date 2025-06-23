import React, {useState, useEffect} from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import binPhoto from './../images/bin.png'
import './style.css'
import Header from './Header';
import ApiCall from '../ApiCall/ApiCall';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram";
function Users(props) {
    const {userTelegram} = useTelegram();
    // const userTelegram={id:5397857416}

    const navigate=useNavigate();
        const [users, setUsers]= useState([])
        const  [showRodal, setShowRodal]=useState(false)
        const [searchTerm, setSearchTerm] = useState('');

        useEffect(() => {
            getUsers()
            setSearchTerm('')
            if(userTelegram?.id==undefined){
                navigate("/404")
            }
        }, []);
    

        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
            if (e.target.value==="") {
                getUsers()
            }
        };

        async function getUsers() {

            try {
                const result = await ApiCall('/api/v1/userjon', 'get', null, {search: searchTerm});
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
        async function handleCheckboxChange(id){
            try {
                const result = await ApiCall('/api/v1/userjon', 'put', null, {id: id});
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
                 <Header name='users'/>

                 <div className='ag-courses_box ' style={{color: 'white', fontSize: 20}}>
                
                <div id="wrapper">
                    <div className='d-flex my-1 mx-5'>
                    <input  className='form-control' type='search' value={searchTerm} onChange={handleSearchChange} />
                     <button className='btn btn-primary ' onClick={getUsers}>Search</button>
                    </div>
                   <div className='divFlex'>
                       <h1>Users</h1>
                   </div>
                   <table  id="keywords"  className='table border-0 text-white'>
                       <thead>
                       <tr>
                           <th>№</th>
                           <th><span>Telegram ID</span></th>
    
                           <th><span>Status</span></th>
                           <th></th>
                       </tr>
                       </thead>
                       <tbody>
                       {
                        users?.map((item, index)=>
                        <tr key={item.telegramid}>
                           <td style={{fontSize:"14px"}}>{index+1}</td>
                           <td className="lalign">
                               <div>
                                   <p style={{fontSize:'16px'}}>{item.telegramid}</p>
                                   <p style={{fontSize:'9px', marginTop:'-14px'}}>{item.email}</p>
                               </div>
                           </td>
                           <td>
                           <h3 style={{fontSize:14}}>{item.status==='noallowed'?<p style={{color: 'yellow'}} className=' p-0 my-1'>Not Allowed</p>:(item.status==='on'?<p  style={{color: 'green'}} className='p-0 my-1'>ON</p>:<p className='text-danger p-0 my-1'>OFF</p>)}
                                </h3>
                                </td>
                           <td>
                           <div className="form-check form-switch">
                                <input
                                    style={{width:'35px', height:'17px'}}
                                    checked={item.status !== 'noallowed'}
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    onChange={() => handleCheckboxChange(item.telegramid)}
                              />
                            </div>
                           </td>
                       </tr>
                        )
                       }
                      
                       
                      
                       
                       </tbody>
                   </table>
               </div> 
    
               <Rodal width={320} visible={showRodal} onClose={()=>setShowRodal(false)}>
                   <div>Content</div>
               </Rodal>
           </div>
            </div>
           
        );
    
}

export default Users;