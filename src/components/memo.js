import { useRef, useState, useEffect, useContext } from 'react';
import { AllContext } from '../context/Allprovider';

import emailjs from '@emailjs/browser'
import axios from 'axios';
import Modal from "./memo-model";


import Button from 'react-bootstrap/Button';
import '../css/memo.css'

function Memo({
    id = 1,
    title = '',
    settime = '',
    text = '',
    toemail = 'N',
    sendtime = '',
    complete = 'N',
    resettime = '',//只有修正過後才有
    handleFormSubmit,
}) {

    const [data, setData] = useState({ id, title, settime, text, toemail, sendtime, complete })

    const { member, nowtime } = useContext(AllContext)

    const sendemail = () => {
        const SERVICE_ID = 'service_9vaq7e9'
        const TEMPLATE_ID = 'template_9qd529j'
        const PUBLIC_KEY = 'qjhzRtiuCQ8BS5Pfc'
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: 'qazwsxed369@gmail.com',//給誰
            to_name: 'wei',//給會員名稱
            from_title: '111',//標題
            message: '1111'//訊息
        }, PUBLIC_KEY)
    }

    // 讓函式只執行一次(重要)
    const sendEmailRef = useRef(sendemail);



    useEffect(() => {
        if (member.name && data.toemail === 'Y') {
            if ((nowtime - (new Date(sendtime))) > 0) {
                sendEmailRef.current();
                completed(data)
            }
        }
    }, [nowtime])

    // 刪除用
    const deleted = async (data) => {
        const check = window.confirm("確定要刪除嗎?")
        if (check) {
            await axios.post('http://localhost:5000/todos/deleted', data)
            handleFormSubmit()
        }
    }
    //切換用
    const completed = async (data) => {
        const newdata = {
            ...data,
            complete: data.complete === 'Y' ? 'N' : 'Y',
            toemail: 'N',
            sendtime: ''
        }
        console.log(newdata);
        setData(newdata)
        await axios.post('http://localhost:5000/todos/completed', newdata)
        handleFormSubmit()
    }
    // 寄信

    return (
        <>
            {/* 需要擋註冊 */}
            <div className="memobox" >
                <h1>{title}</h1>
                <p className='time'>
                    {resettime ? `新增於${settime}，修正於${resettime}` : `新增於${settime}`}
                </p>
                <p className='text'>{text}</p>
                <div className="btnbox">
                    <div>
                        <Modal
                            id={id}
                            title={title}
                            text={text}
                            settime={settime}
                            toemail={toemail}
                            sendtime={sendtime}
                            handleFormSubmit={handleFormSubmit}
                            btntext='修改'
                            color='warning' />
                        <Button variant="danger" onClick={() => {
                            deleted(data)
                        }}>刪除</Button>
                    </div>
                    <div>
                        <Button variant="info"
                            onClick={() => {
                                completed(data)
                            }}>{data.complete === 'Y' ? '切換未完成' : '切換已完成'}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Memo;
