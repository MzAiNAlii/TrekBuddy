import About from "./About/About"
import Footer from "../Footer/Footer"
import Packages from "./Packages/Packages"
import Search from "./Searchbar/Searchbar"
import Destinations from "./Destinations/Destinations"
import Carousel from "./Carousel"
import "./home.css"
let Home = () => {
return( 
      <>
            <Carousel/>
            <Search/>
            <Destinations/>
            <About/>
            <Packages/>
            <Footer/>
            </>
)
}

export default Home