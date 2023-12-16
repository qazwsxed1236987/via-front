import Memo from "../components/memo"
import Button from 'react-bootstrap/Button'
import Modal from "../components/memo-model"
import { useEffect, useState, useContext } from 'react'
import { AllContext } from '../context/Allprovider'
import axios from "axios"

function Todos() {
    // console.log('REACT_APP_URL', process.env.REACT_APP_APIPORT)
    const { member } = useContext(AllContext)

    // initial memo
    const [memos, setMemos] = useState([])
    // fliter memo
    const [fliterMemos, setFliterMemos] = useState([])
    // change page btn
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        handleFormSubmit(member)
    }, [member])

    useEffect(() => {
        let newmemos
        if (isComplete) {
            newmemos = memos.filter((v) => v.complete === 'Y')
        } else {
            newmemos = memos.filter((v) => v.complete === 'N')
        }
        setFliterMemos(newmemos)
    }, [isComplete, memos])

    // get data
    const handleFormSubmit = async (member) => {
        if (member.name) {
            try {
                const res = await axios.post(`https://via-back.onrender.com/todos`, member);
                setMemos(res.data[0]);
                const newmemos = res.data[0].filter((v) => v.complete === 'N')
                setFliterMemos(newmemos)
            } catch (err) {
                console.log(err)
            }
        }
    };

    return (<>
        {member.name ?
            <div style={{ paddingInline: '70px' }}>
                {/* change btn */}
                <div className="btnbox">
                    <Modal btntext={'新增'} handleFormSubmit={handleFormSubmit} />
                    <Button variant="secondary" onClick={() => { setIsComplete(!isComplete) }}>
                        {isComplete ? '切換未完成事項' : '切換已完成事項'}</Button>
                </div>
                {/* use db create Memo */}
                {fliterMemos.map((v) => (
                    <Memo key={v.id}
                        id={v.id} title={v.title} settime={v.settime}
                        text={v.text} toemail={v.toemail} sendtime={v.sendtime}
                        resettime={v.resettime} complete={v.complete}
                        handleFormSubmit={handleFormSubmit} setMemos={setMemos}
                    />
                ))}
            </div>
            :
            <h3 style={{ textAlign: 'center', marginTop: '50px' }}>請登入後查看</h3>
        }
    </>
    )
}

export default Todos