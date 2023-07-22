import "./Destinations.css"
import MureeHills from "../../Assets/MureeHills.jpg"
import KPK from "../../Assets/KPK.jpg"
import KaghanValley from "../../Assets/KaghanValley.jpg"
import GilgitBaltistan from "../../Assets/Gilgit-Baltistan.jpg"
import HunzaValley from "../../Assets/HunzaValley.jpg"
import Kashmir from "../../Assets/AzadKashmir.jpg"
let Destinations = () => {
  return (
    <>
      <h2 className="section_title">Top Destinations</h2>
      <span className="section_subtitle">Explore the beauty of North Pakistan</span>

      <div className="Destinations_container">
        <div className="flex-item">
          <img src={MureeHills} alt="Muree" />
          <div className="caption">Muree Hills</div>
        </div>

        <div className="flex-item">
          <img src={KPK} alt="KPK" />
          <div className="caption">KPK</div>
        </div>

        <div className="flex-item">
          <img src={KaghanValley} alt="Kaghan" />
          <div className="caption">Kaghan Valley</div>
        </div>

        <div className="flex-item">
          <img src={HunzaValley} alt="Hunza" />
          <div className="caption">Hunza Valley</div>
        </div>

        <div className="flex-item">
          <img src={GilgitBaltistan} alt="Gilgit" />
          <div className="caption">Gilgit Baltistan</div>
        </div>

        <div className="flex-item">
          <img src={Kashmir} alt="Azad Kasmir" />
          <div className="caption">Kashmir</div>
        </div>

      </div>
    </>
  )
}

export default Destinations