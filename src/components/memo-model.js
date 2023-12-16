import { useState, useContext } from 'react'
import { AllContext } from '../context/Allprovider'
import axios from "axios"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

function MemoModel({
    id = 1,
    title = '',
    text = '',
    settime = '',
    toemail = 'N',
    sendtime = '',
    handleFormSubmit,
    btntext = '',
    color = 'primary'
}) {
    const sendcheck = sendtime.split(" ")

    const { member } = useContext(AllContext)
    // show
    const [show, setShow] = useState(false)
    // data
    const [data, setData] = useState({ title, text, toemail, settime })
    const [timeCheck, setTimecheck] = useState({ date: sendcheck[0], time: sendcheck[1] })
    // close or show
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // change text fun
    const handleInputChange = (e) => {
        const { id, value } = e.target
        setData((v) => ({
            ...v,
            [id]: value
        }))
    }
    // change time fun
    const handleDateChange = (e) => {
        const { id, value } = e.target
        setTimecheck((v) => ({
            ...v,
            [id]: value
        }))
    }
    // add btn
    const addnewdata = async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_APIPORT}/todos/add`, data)
            handleFormSubmit(member)
        } catch (err) {
            console.log(err)
        }
    }
    // reset btn
    const resetnewdata = async (data) => {
        console.log(data);
        try {
            await axios.post(`${process.env.REACT_APP_APIPORT}/todos/reset`, data)
            handleFormSubmit(member)
        } catch (err) {
            console.log(err)
        }
    }
    // Submit btn
    const handleSubmit = async (txt) => {
        if (data.toemail === 'N') {
            setTimecheck({ date: '', time: '' })
        }
        const sendtime = data.toemail === 'Y' ? `${timeCheck.date} ${timeCheck.time}` : ''
        const newdata = {
            id: id,
            names: member.name,
            title: data.title,
            text: data.text,
            settime: data.settime,
            toemail: data.toemail,
            sendtime: sendtime
        };

        if (txt === 'add') {
            addnewdata(newdata)
            setData({
                title: '',
                text: '',
                toemail: 'N',
                settime: ''
            })
        } else {
            resetnewdata(newdata)
        }
        setShow(false)
    }

    return (
        <>
            <Button variant={color} onClick={handleShow}>
                {btntext === '新增' ? `${btntext}提醒事項` : btntext}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${btntext}提醒事項`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        {/* title */}
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>提醒事項主題</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="主題"
                                autoFocus
                                value={data.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {/* text */}
                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>提醒事項備註</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={7}
                                value={data.text}
                                onChange={handleInputChange} />
                        </Form.Group>
                        {/* check to email */}
                        <Form.Group className="mb-3" style={{ display: 'flex', columnGap: '15px' }}>
                            <Form.Label>是否寄出提醒通知信</Form.Label>
                            <Form.Check
                                type="radio"
                                label="是"
                                name="complete"
                                id="Yes"
                                value={'Y'}
                                checked={data.toemail === 'Y'}
                                onChange={() => { setData({ ...data, toemail: 'Y' }) }}
                            />
                            <Form.Check
                                type="radio"
                                label="否"
                                name="complete"
                                id="No"
                                value={'N'}
                                checked={data.toemail === 'N'}
                                onChange={() => {
                                    setData({ ...data, toemail: 'N' })
                                }}
                            />
                        </Form.Group>
                        {/* date and time picker */}
                        {data.toemail === 'Y' ?
                            <>
                                <Form.Group className="mb-3" controlId="date">
                                    <Form.Label>選擇日期</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={timeCheck.date}
                                        onChange={handleDateChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="time">
                                    <Form.Label>選擇時間</Form.Label>
                                    <Form.Control
                                        type="time"
                                        value={timeCheck.time}
                                        onChange={handleDateChange}
                                    />
                                </Form.Group>
                            </> : ''}
                    </Form>
                </Modal.Body>
                {/* btn */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        關閉
                    </Button>
                    <Button variant={color}
                        onClick={() => btntext === "新增" ? handleSubmit('add') : handleSubmit('reset')}
                    >{btntext}</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
export default MemoModel


