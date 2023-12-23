import CardComponent from "./Components/Card/index"
import CirclesComponent from "./Components/Circles/Circles"
import Calendar from "./Components/Calender/Calendar";
import './App.scss';

function App() {
  return (
    <>
    <div>
      <Calendar/>
    </div>
    <div className="flex-components">
    <div>
      <CirclesComponent/>
    </div>
    <div>
      <CardComponent/>
    </div>
    </div>
   </>
  );
}

export default App;
