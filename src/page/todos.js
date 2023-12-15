import Memo from "../components/memo";
import Button from 'react-bootstrap/Button';
import Modal from "../components/memo-model";
import { useEffect, useState } from 'react';
import axios from "axios";

function Todos() {

    // 存放Memo總資料區塊
    const [memos, setMemos] = useState([])
    // 存放Memo總資料區塊
    const [fliterMemos, setFliterMemos] = useState([])
    // 當false 未完成 true 完成
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        // 初始頁面
        handleFormSubmit()
    }, [])
    useEffect(() => {
        // console.log(isComplete);
        let newmemos = fliterMemos
        if (isComplete) {
            newmemos = memos.filter((v) => v.complete === 'Y')
        } else {
            newmemos = memos.filter((v) => v.complete === 'N')
        }
        setFliterMemos(newmemos)
    }, [isComplete, memos])

    // 取得資料用
    const handleFormSubmit = async () => {
        try {
            const res = await axios.get('http://localhost:5000/todos');
            setMemos(res.data[0]);
            const newmemos = res.data[0].filter((v) => v.complete === 'N')
            setFliterMemos(newmemos)
        } catch (err) {
            console.log(err);
        }
    };

    return (<>
        <div style={{ paddingInline: '70px' }}>
            <div className="btnbox">
                <Modal btntext={'新增'} handleFormSubmit={handleFormSubmit} />
                <Button variant="secondary" onClick={() => { setIsComplete(!isComplete) }}>
                    {isComplete ? '切換未完成事項' : '切換已完成事項'}</Button>
            </div>
            {/* 利用資料庫來產生Memo */}
            {fliterMemos.map((v) => (
                <Memo key={v.id}
                    id={v.id} title={v.title} settime={v.settime}
                    text={v.text} toemail={v.toemail} sendtime={v.sendtime}
                    resettime={v.resettime} complete={v.complete}
                    handleFormSubmit={handleFormSubmit} setMemos={setMemos}
                />
            ))}
        </div>
    </>
    );
}

export default Todos;