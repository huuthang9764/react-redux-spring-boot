import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import userService from '../../service/user.service';

const ModalUser = (props) => {
    const { action, dataModalUser } = props;
    const userState = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        isActive: "",
        id: null
    }
    const validInputDefault = {
        username: true,
        fullname: true,
        email: true,
        password: true,
        isActive: true,
    }
    const [userData, setUserData] = useState(userState);
    const [validInput, setValidInput] = useState(validInputDefault);


    useEffect(()=>{
        if(action ==="UPDATE"){
            setUserData({...dataModalUser});
        }
    },[dataModalUser,action]);
    const handleInputChange = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setValidInput(prevValidInput => ({
            ...prevValidInput,
            [name]: value.trim() !== '' 
        }));
    }
    const checkValidateInput = () => {
        setValidInput(validInputDefault);
        const fieldsToCheck = ['username', 'fullname', 'email', 'password', 'isActive'];
        let check = true;

        for (const fieldName in userData) {
            if (Object.hasOwnProperty.call(userData, fieldName)) {
                if (fieldsToCheck.includes(fieldName) && userData[fieldName].trim() === '') {
                    setValidInput(prevValidInput => ({
                        ...prevValidInput,
                        [fieldName]: false
                    }));
                    check = false;
                }
            }
        }
        return check; // Trả về giá trị cuối cùng của check
    };
    const confirmAddUser = async(e) => {
        e.preventDefault();
        let check = checkValidateInput();
        if(check === true){
            let res = action === "CREATE" ?
            await userService.createUser(userData)
            : await userService.updateUser(userData);
            if(res && res.status ===201){
                props.onHide();
                setUserData({...userState})
                Swal.fire({
                    title: 'Success!',
                    text: res.data.EM,
                    icon: 'success'
                 });
            }
            if(res && res.status !==201){
                Swal.fire({
                    title: 'Error!',
                    text: res.data.EM,
                    icon: 'error'
                 });
                 setValidInput({...validInput})
            }
        }
    }
    const handleCloseModal = () => {
        props.onHide();
        setUserData(userState);
        setValidInput(validInputDefault);
    }
    return (
        <>
            <Modal
                show={props.isShow}
                fullscreen='sm'
                className='modal-user'
                onHide={() => handleCloseModal()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.action === "CREATE" ? "CREATE NEW USER" : "UPDATE A NEW"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form  >
                        <div className='content-body row'>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>User Name :</label>
                                <input type="text"
                                    className={validInput.username ? 'form-control' : 'form-control is-invalid'}
                                    name="username"
                                    value={userData.username || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>fullname :</label>
                                <input type="text"
                                    className={validInput.fullname ? 'form-control' : 'form-control is-invalid'}
                                    name="fullname"
                                    value={userData.fullname || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Email(<span className='red'>*</span>):</label>
                                <input disabled={action === "CREATE" ? false : true}
                                    type="email"
                                    className={validInput.email ? 'form-control' : 'form-control is-invalid'}
                                    name="email"
                                    value={userData.email || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {
                                action === "CREATE"
                                &&
                                <div className='col-12 col-sm-6 form-group'>
                                    <label>Password(<span className='red'>*</span>):</label>
                                    <input type="password"
                                        className={validInput.password ? 'form-control' : 'form-control is-invalid'}
                                        name="password"
                                        value={userData.password || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            }

                            <div className='col-12 col-sm-6 form-group'>
                                <label>isActive:</label>
                                <select
                                    className={validInput.isActive ? 'form-select' : 'form-control is-invalid'}
                                    name="isActive"
                                    value={userData.isActive || ''}
                                    onChange={handleInputChange}
                                >
                                    <option defaultValue="Published">Published</option>
                                    <option value="Pending">Pending</option>

                                </select>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmAddUser}>
                        {action === "CREATE" ? "SAVE" : "UPDATE"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;