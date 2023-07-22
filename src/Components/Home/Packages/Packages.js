import "./Packages.css"
import EconomyClassicon from "../../Assets/EconomyClass-icon.png"
import BusinessClassIcon from "../../Assets/BusinessClass-icon.png"
import FirstClassIcon from "../../Assets/FirstClass-icon.png"
let Packages = () =>{
    return(
        <>
            <div className="Package_container" >
                <div>
            <h1 className = "header">What We Offer</h1>
            </div>
            <div className="section_container">
                
                <div className="content_container">
                <div className="Section_content">
                <img src={EconomyClassicon} alt="Econnomy Class Icon"/>
                <h3 >Economy Class</h3>
                <p >Budget-friendly accommodation with affordable dining options</p>
                <button>Explore</button>
                </div>

                 <div className="Section_content">
                <img src={FirstClassIcon} alt="First Class Icon"/>
                <h3 >First Class</h3>
                <p >Premium hotels with fine dining experiences, showcasing local & international cuisine</p>
                <button>Explore</button>
                </div>
                 
                 <div className="Section_content">
                <img src={BusinessClassIcon} alt="Business Class Icon"/>
                <h3>Business Class</h3>
                <p>High-end Accommodation with exclusive private guided tours</p>
                <button>Explore</button>
                </div>
                </div>
                </div>
        </div>
        </>
    )
}

export default Packages