import './Hero.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
const Hero = () => {
    return (
        <div className="hero-container">








            <Carousel showArrows={true} autoPlay showThumbs={false}>
                <div>
                    <img src='https://img.freepik.com/free-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg?w=1060' alt='' />
                </div>
                <div>
                    <img src='https://img.freepik.com/premium-vector/black-friday-online-shopping-banner-online-shopping-mobile-phone-website-banner_42705-121.jpg?w=1060' alt='' />
                </div>
                <div>
                    <img src="https://img.freepik.com/free-vector/hand-drawn-thrift-store-banner-design_23-2150007708.jpg?w=1060" alt="" />
                </div>
                <div>
                    <img src="https://img.freepik.com/premium-vector/fashion-week-banner-template-promotion-fashion-banner_122059-223.jpg?w=1060" alt="" />

                </div>
                <div>
                    <img src="https://img.freepik.com/free-vector/fashion-week-template-design_52683-150895.jpg?w=1060" alt="" />

                </div>

            </Carousel>
        </div>
    )
}

export default Hero