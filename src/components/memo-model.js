import { useState, useContext } from 'react';
import { AllContext } from '../context/Allprovider';
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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
    // 拆解時間(此時間也是拿來比對的 條件 有會員 且 toemail==Y)
    const sendcheck = sendtime.split(" ");

    const { member } = useContext(AllContext)
    // 顯示
    const [show, setShow] = useState(false);
    // data
    const [data, setData] = useState({ title, text, toemail, settime })
    const [timeCheck, setTimecheck] = useState({ date: sendcheck[0], time: sendcheck[1] })
    // 純關閉
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 紀錄文字
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData((v) => ({
            ...v,
            [id]: value
        }));
    };
    // 紀錄時間
    const handleDateChange = (e) => {
        const { id, value } = e.target;
        setTimecheck((v) => ({
            ...v,
            [id]: value
        }));
    };
    // 新增紐
    const addnewdata = async (data) => {
        try {
            await axios.post('http://localhost:5000/todos/add', data);
            handleFormSubmit()
        } catch (err) {
            console.log(err);
        }
    }
    // 修改紐
    const resetnewdata = async (data) => {
        try {
            console.log(data);
            // 修改資料
            await axios.post('http://localhost:5000/todos/reset', data);
            handleFormSubmit()
        } catch (err) {
            console.log(err);
        }
    }
    // 送出紐
    const handleSubmit = async (txt) => {
        if (data.toemail === 'N') {
            setTimecheck({ date: '', time: '' })
        }

        const sendtime = data.toemail === 'Y' ? `${timeCheck.date} ${timeCheck.time}` : ''

        const newdata = {
            id: id,
            names: 'allen', //等有會員時在抓
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
    };

    return (
        <>
            {/* 外部按鈕呈現顏色 */}
            <Button variant={color} onClick={handleShow}>
                {btntext === '新增' ? `${btntext}提醒事項` : btntext}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${btntext}提醒事項`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        {/* 第一項 */}
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
                        {/* 第二項 */}
                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>提醒事項備註</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={7}
                                value={data.text}
                                onChange={handleInputChange} />
                        </Form.Group>
                        {/* 缺少發送信件控制項 */}
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
                {/* 按鈕區 */}
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
    );
}
export default MemoModel;


