import Hero from '../Hero/Hero'
import Ad from '../Utils/Ad'
import Product from "../Utils/Product"
import ServiceInfoCard from '../Utils/ServiceInfoCard'
import Wrapper from '../Utils/Wrapper'
import Footer from '../layout/Footer/Footer'
import MetaData from '../layout/MetaData'
import './Home.css'



const service = [
    {
        title: "Find Answers to Common Queries",
        desc: 'Explore our FAQs for solutions and tips on safe shopping in our stores.',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e55b939fea169c0292_faq-min.png'
    },
    {
        title: "Effortless Online Payment Methods",
        desc: 'Discover seamless online payment processes for a hassle-free shopping experience.',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e6707380718425e697_onlie%20payment-min.png'
    },
    {
        title: "Convenient Home Delivery Services",
        desc: 'Enjoy doorstep delivery options tailored to your needs for added convenience.',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e544663ba3d0fd2bb8_home%20delivery-min.png'
    }
]
const Home = () => {
    return (

        <>
            <MetaData title="ShopSwift - Your Shortcut to Shopping Satisfaction" />
            <Hero />
            <Product heading={'Back In Stock This Week'} />
            <Ad />
            <Product heading={'Top Rated Products'} />
            <div className="product-container-wrapper" id='container'>
                <Wrapper Card={ServiceInfoCard} data={service} heading="Service To Help You Shop " hw={'18rem'} />
            </div>
            <Footer />
        </>


    )
}

export default Home