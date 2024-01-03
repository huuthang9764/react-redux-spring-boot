import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../redux/slices/user'
import { useDispatch, useSelector } from "react-redux";
import './User.scss'
import ModalUser from './ModalUser';

const User = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userAbout.users);
    const status = useSelector((state) => state.userAbout.status);
    const error = useSelector((state) => state.userAbout.error);
    
    //
    const [isShow, setIsShow] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("");
    const [dataModalUser, setDataModalUser] = useState({});

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const handleAddUser = () => {
        setActionModalUser("CREATE");
        // setDataModalUser({});
        setIsShow(true);
    };
    const handleClose = ()=>{
        dispatch(fetchUsers());
        setIsShow(false);
    }
    const handleEditUser = (user)=>{
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShow(true);
    }
    const handleDeleteUser = (user)=>{
        
    }
    return (
        <>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-12 col-sm-12 d-sm-flex align-items-center mb-3'>
                        <div className='col-12 col-sm-3 mr-auto'>
                            <h2>List User</h2>
                        </div>
                        <div className='col-12 col-sm-4 me-auto mb-3 mb-sm-0'>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        <div className='col-12 col-sm-3'>
                            <button
                                className='btn btn-primary'
                                onClick={handleAddUser}
                            >Add User</button>
                        </div>
                    </div>
                    {status === 'loading' ? (
                        <div>Loading...</div>
                    ) : status === 'failed' ? (
                        <div>Error: {error}</div>
                    ) : (
                        <table className='table table-striped table-bordered table-hover table-sm' >
                            <thead>
                                <tr>
                                    <th className='table-action'>#</th>
                                    <th>Username</th>
                                    <th>firstname</th>
                                    <th>lastname</th>
                                    <th>role</th>
                                    <th>createDate</th>
                                    <th className='table-action'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, i) => (
                                    <tr key={item.id}>
                                        <td className='table-action'>{i + 1}</td>
                                        <td>{item.username}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.role}</td>
                                        <td>{item.createDate}</td>
                                        <td className='table-action'>
                                            <i className='bi bi-pencil-square m-2'
                                                onClick={() => handleEditUser(item)}
                                            ></i>
                                            <i className="bi bi-trash3 m-2"
                                                onClick={() => handleDeleteUser(item)}
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <ModalUser
                isShow={isShow}
                onHide={handleClose}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
};

export default User;