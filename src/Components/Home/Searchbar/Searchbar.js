import "./Searchbar.css"
let Form = () => {
    return (< div id ="searchbar">
        <button>Book With Us!</button>
        <h1>Find Next Place To Visit</h1>
        <p>Discover amazing places at exclusive deals. Embrace adventure, serenity, and cultural insights</p>
        <form className="form_container">
          
            <div >
                <label id = "label">Location</label>
                <div >
                    <input id = "input_container" name="tour-search" type="text" placeholder="Where are you going" value="" />
                </div>
            </div>

            <div >
                <label id = "label">Destination</label>
                <div >
                    <select id = "input_container">
                        <option value="">Any</option>
                        <option value="Muree Hills">Muree Hills</option>
                        <option value="kaghan Valley">kaghan Valley</option>
                        <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                        <option value="Azad Kashmir">Azad Kashmir</option>
                        <option value="Hunza Valley">Hunza Valley</option>
                        <option value="KPK">KPK</option>
                    </select>
                </div>
            </div>

            <div >
                <label id = "label">Duration</label>
                <div >
                    <select id = "input_container" name="duration">
                        <option value="">Any</option>
                        <option value="1">1 Day Tour</option>
                        <option value="2">2-4 Days Tour</option>
                        <option value="5">5-7 Days Tour</option>
                        <option value="7">7+ Days Tour</option>
                    </select>
                </div>
            </div>

            <div className="search">
                <button>Search</button>
            </div>
        </form>
    </div>)
}
export default Form