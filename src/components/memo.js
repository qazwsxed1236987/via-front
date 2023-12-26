import { useRef, useState, useEffect, useContext } from 'react'
import { AllContext } from '../context/Allprovider'

import emailjs from '@emailjs/browser'
import axios from 'axios'
import Modal from "./memo-model"

import Button from 'react-bootstrap/Button'
import '../css/memo.css'

function Memo({
    id = 1,
    title = '',
    settime = '',
    text = '',
    toemail = 'N',
    sendtime = '',
    complete = 'N',
    resettime = '',
    handleFormSubmit,
}) {

    const [data, setData] = useState({ id, title, settime, text, toemail, sendtime, complete })

    const { member, nowtime } = useContext(AllContext)

    useEffect(() => {
        if (member.name && data.toemail === 'Y') {
            if ((nowtime - (new Date(data.sendtime))) > 0) {
                sendEmailRef.current()
                completed(data)
            }
        }
    }, [nowtime, member, data])
    //change fun
    const completed = async (data) => {
        const newdata = {
            ...data,
            complete: data.complete === 'Y' ? 'N' : 'Y',
            toemail: 'N',
            sendtime: ''
        }
        setData(newdata)
        await axios.post(`https://via-back.onrender.com/todos/completed`, newdata)
        handleFormSubmit(member)
    }

    // deleted fun
    const deleted = async (data) => {
        const check = window.confirm("確定要刪除嗎?")
        if (check) {
            await axios.post(`https://via-back.onrender.com/todos/deleted`, data)
            handleFormSubmit(member)
        }
    }

    // toemail fun
    const sendemail = () => {
        const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
        const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
        const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_email: member.email,
            to_name: member.name,
            from_title: data.title,
            message: data.text
        }, PUBLIC_KEY)
    }

    // the fun will use one
    const sendEmailRef = useRef(sendemail)

    return (
        <>
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
                            }}>{data.complete === 'Y' ? '切換為未完成' : '切換為已完成'}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Memo
