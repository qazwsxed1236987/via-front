import { useState, useContext } from 'react';
import { AllContext } from '../context/Allprovider';
import { useNavigate } from 'react-router-dom';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

import Modal from 'react-bootstrap/Modal';
// 此表為登入+註冊使用
function Membermodel({ btntxt = '' }) {
    // 跳轉用
    const navigate = useNavigate();
    // 預設錯誤訊息
    const txterror = {
        Email: 'Well never share your email with anyone else.',
        Password: ''
    }

    // 會員狀態
    const { member, setMember } = useContext(AllContext)

    // show
    const [show, setShow] = useState(false);
    // data
    const [data, setData] = useState({ Names: '', Email: '', Password: '' })
    // 錯誤訊息
    const [txtError, setTxtError] = useState(txterror)



    // 純關閉
    const handleClose = () => setShow(false);
    const handleShow = () => { setTxtError(txterror); setShow(true) };

    // 紀錄文字
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData((v) => ({
            ...v,
            [id]: value
        }));
    };

    const emailcheck = (email) => {
        // 抄別人的
        const Rule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return Rule.test(email);
    };

    const login = async (data) => {
        await axios.post('http://localhost:5000/member/login', data)
            .then((res) => {
                const data = res.data[0][0]
                if (!data) {
                    setTxtError((v) => ({
                        ...v,
                        Email: '請輸入有效帳號',
                        Password: '請輸入有效密碼',
                    }))
                } else {
                    setMember({
                        name: data.name,
                        email: data.email,
                    })
                    setShow(false)
                    navigate('/todos');
                }
            });
    }

    // 送出紐
    const handleSubmit = async (data) => {
        if (btntxt !== '登入') {
            if (!emailcheck(data.Email)) {
                setTxtError((v) => ({ ...v, Email: '請輸入有效電子郵件' }))
            } else {
                await axios.post('http://localhost:5000/member/regsiter', data)
                    .then((res) => { console.log(res.data); });
                login(data)
            }
        } else {
            login(data)
        }
    };

    return (
        <>
            <Button variant='success' onClick={handleShow}>
                {btntxt}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ display: 'flex', justifyContent: 'center' }}>
                    <Modal.Title>{btntxt !== '登入' ? 'Regsiter' : 'Login'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        {/* 第一項 Name */}
                        {btntxt !== '登入' && (
                            < Form.Group className="mb-3" controlId="Names">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    autoFocus
                                    value={data.Names}
                                    onChange={handleInputChange}
                                    autoComplete="username"
                                />
                            </Form.Group>
                        )}
                        {/* 第二項 email*/}
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={data.Email}
                                onChange={handleInputChange}
                                autoComplete="Email"
                            />
                            <Form.Text className="text-muted">
                                {txtError.Email}
                            </Form.Text>
                        </Form.Group>
                        {/* 第三項 Password */}
                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={data.Password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                            />
                            <Form.Text className="text-muted">
                                {txtError.Password}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        關閉
                    </Button>
                    <Button onClick={() => { handleSubmit(data) }}>送出</Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default Membermodel;


