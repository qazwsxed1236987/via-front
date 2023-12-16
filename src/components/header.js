import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AllContext } from '../context/Allprovider'

import Button from 'react-bootstrap/Button'

import Membermodel from './member-model'

function Header() {

    const navigate = useNavigate()

    // initial nav
    const list = [
        { 'title': 'Todos', 'url': '/todos' },
        { 'title': '首頁', 'url': '/' }]

    const { member, setMember } = useContext(AllContext)

    // logout fun
    const logout = () => {
        setMember((v) => ({
            ...v,
            name: '',
            email: ''
        }))
        navigate('/')
    }

    return (
        <>
            <header>
                <section className='navstyle'>
                    <nav className='nav'>
                        {list.map((nav) => {
                            return (
                                <NavLink className="NavLink" to={nav.url} key={nav.title}>
                                    {nav.title}
                                </NavLink>
                            )
                        })
                        }
                    </nav>
                    <div className='btnbox'>
                        {!member.name ?
                            <>
                                <Membermodel btntxt={'登入'} />
                                <Membermodel btntxt={'註冊'} />
                            </>
                            :
                            <>
                                <h4>Hello! {member.name}</h4>
                                <Button color='' onClick={logout}>登出</Button>
                            </>
                        }
                    </div>
                </section>
            </header >

            <style>{`
                .navstyle{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    height:100px;
                    padding:0px 70px;

                }
                .nav{
                    display:flex;
                    justify-content: space-evenly;
                    flex-grow: 1;
                    padding:0 0 0 10%;
                }
                .btnbox{
                    display:flex;
                    gap: 5px;
                }
                .NavLink{
                    background:#D9B300;
                    padding: 5px 20px;
                    border-radius: 50px;
                    border: gray 1px solid;
                    color:white;
                    text-decoration: none;                    
                }
            `}</style>
        </>
    )
}

export default Header
