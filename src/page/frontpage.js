import { useEffect, useState } from 'react'

//boostrape
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//arrow img
import arrowicon from '../img/arrow.png'

//swiper
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules'

//css
import '../css/frontpage.css'
import '../css/animate.css'

function Front_page() {

    const [fadeArray, setFadeArray] = useState([])

    useEffect(() => {
        setFadeArray(document.querySelectorAll(".nofade"))
    }, [])

    // fadeIn animate
    useEffect(() => {
        const handleScroll = () => {
            for (let i = 0; i < fadeArray.length; i++) {
                let elem = fadeArray[i]
                let distInView = elem.getBoundingClientRect().top - window.innerHeight + 20
                if (distInView < 0) {
                    elem.classList.add("fadeIn")
                } else {
                    elem.classList.remove("fadeIn")
                }
            }
        };
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, [fadeArray])

    // initial img:
    const imglist =
        [{ id: 1, src: 'img1.jpg' },
        { id: 2, src: 'img2.jpg' },
        { id: 3, src: 'img3.jpg' },
        { id: 4, src: 'img4.jpg' },
        { id: 5, src: 'img5.jpg' },]

    const piglist =
        [{ id: 1, src: 'pic1.webp' },
        { id: 2, src: 'pic2.webp' },
        { id: 3, src: 'pic3.jpg' },
        { id: 4, src: 'pic4.jpg' },]

    return (
        <>
            <section className='frontpage'>
                <h1 className='text'>下方為輪播圖</h1>
                <div className='swiperbox'>
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
                        autoplay={{
                            delay: 5000,
                        }}
                        loop={true}
                        className="mySwiper"
                    >
                        {imglist.map((v) => {
                            return (
                                <SwiperSlide key={v.id}>
                                    <img src={require(`../img/${v.src}`)} alt={v.id} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <img src={arrowicon} className="arrow-left arrow" alt='arrow'></img>
                <img src={arrowicon} className="arrow-right arrow" alt='arrow'></img>
            </section >
            <section className='frontpage'>
                <h1 className='text'>下方為淡入淡出特效展示</h1>
            </section >
            <section className='frontpage'>
                <h2 className='nofade left'>National Park</h2>
                <h5 className='nofade right'>國家公園</h5>
                <Container className='parkbox nofade right'>
                    <Row>
                        <Col>墾丁國家公園</Col>
                        <Col>玉山國家公園</Col>
                    </Row>
                    <Row>
                        <Col>陽明山國家公園</Col>
                        <Col>雪霸國家公園</Col>
                    </Row>
                </Container>
                <h2 className='nofade left'>picture</h2>
                <h5 className='nofade right'>各式圖片</h5>
                <Container className='picturebox'>
                    <Row>
                        {piglist.map((v) => {
                            return (
                                <Col key={v.id}>
                                    <img className='nofade left' src={require(`../img/${v.src}`)} alt={v.id} />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </section >
        </>
    )
}
export default Front_page
