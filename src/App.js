import CardComponent from "./Components/Card/Cards"
import './App.css';
import AreaChart from "./Components/Chart/Chart";
import Chat from "./Components/Chat/Chat";

function App() {
  return (
    <>
    <div>
      <CardComponent/>
    </div>
     <div className="chart">
     <AreaChart/>
   </div>
   <div className="chat">
     <Chat/>
   </div>
   </>
  );
}

export default App;
