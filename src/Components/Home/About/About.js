import "./about.css"
import aboutUs from "../../Assets/aboutUs.jpg"
let About = () => {
    return(
      <section >
        <div className="about_container">

        <div className="about__section">
        <h2 className="section__title">Why Plan your trip with </h2>
        <h2 className="section__title1">Trek Buddy</h2>
        <div className="about__content">
         <p>Our travel website, provides you with unforgettable journeys and seamless travel experiences. We are dedicated to providing you with a seamless platform to discover, plan, and book your dream vacations.</p>
         </div>
         <div className="about__data">
            <div>
            <p> <i className='bx bxs-check-circle'></i> Explore a wide range of destinations across Pakistan</p>
            </div>
            <div>  
            <p> <i className='bx bxs-check-circle'></i> Efforlessly choose rentals that suits your preferences and budget.</p>
            </div>
            <div>  
            <p> <i className='bx bxs-check-circle'></i> Immerse yourself in a world of exciting activities and attractions.</p> 
            </div>        
            <div>
            <p> <i className='bx bxs-check-circle'></i> Embark on an extraordinary travel adventure with our travel website</p>  
            </div>            
          </div> 
          </div> 

            <div className="about__img">
            <img src={aboutUs}/>
            </div>

            </div>       
      </section> 
    )
}

export default About