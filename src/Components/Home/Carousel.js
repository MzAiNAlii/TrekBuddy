import carousel_img1 from "../Assets/carousel_img1.jpg"
import carousel_img2 from "../Assets/carousel_img2.jpg"
import carousel_img3 from "../Assets/carousel_img3.jpg"
import carousel_img4 from "../Assets/carousel_img4.jpg"
import "./Carousel.css"
let Carousel = () =>{
    return(
        <>
        <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel" data-bs-theme="light">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class="active" aria-current="true"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item">
        <img src={carousel_img1} class="d-block w-100" alt="carousel_img1"/>
        <div class="container">
          <div class="carousel-caption text-start">
            <h1>Trek Buddy</h1>  
            <p>Your ultimate destination for safe and affordable travel experiences in the breathtaking Northern areas of Pakistan .We are dedicated to curating unforgettable journeys that capture the essence of Pakistan's natural wonders and cultural richness.Whether you are a local adventurer seeking to embark on a soul-stirring escapade or an international traveler eager to immerse yourself in the enchanting beauty of Pakistan, we have designed our services to cater to all your travel dreams.</p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img src={carousel_img4} class="d-block w-100" alt="carousel_img4"/>
        <div class="container">
          <div class="carousel-caption text-start">
            <h1>Trek Buddy</h1>  
            <p>Your ultimate destination for safe and affordable travel experiences in the breathtaking Northern areas of Pakistan .We are dedicated to curating unforgettable journeys that capture the essence of Pakistan's natural wonders and cultural richness.Whether you are a local adventurer seeking to embark on a soul-stirring escapade or an international traveler eager to immerse yourself in the enchanting beauty of Pakistan, we have designed our services to cater to all your travel dreams.</p>
          </div>
        </div>
      </div>
      <div class="carousel-item active">
        <img src={carousel_img3} class="d-block w-100" alt="carousel_img3"/>
        <div class="container">
          <div class="carousel-caption text-start">
            <h1>Trek Buddy</h1>  
            <p>Your ultimate destination for safe and affordable travel experiences in the breathtaking Northern areas of Pakistan .We are dedicated to curating unforgettable journeys that capture the essence of Pakistan's natural wonders and cultural richness.Whether you are a local adventurer seeking to embark on a soul-stirring escapade or an international traveler eager to immerse yourself in the enchanting beauty of Pakistan, we have designed our services to cater to all your travel dreams.</p>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
        </>
    )
}

export default Carousel