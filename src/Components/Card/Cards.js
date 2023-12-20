import Card from 'react-bootstrap/Card';
import './Card.css'

let BootstrapCard = () =>{
  return (
    <div className='card-section'>
    <div className='card-item'>
    <Card className='background'>
      <Card.Body>
        <Card.Title className='bold'>150</Card.Title>
        <Card.Text>
          New Orders
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">More Info<i className='bx bx-right-arrow-circle'></i></Card.Footer>
    </Card>
    </div>

     <div className='card-item'>
     <Card className='background'>
       <Card.Body>
         <Card.Title className='bold'>53%</Card.Title>
         <Card.Text>
           Bounce Rate
         </Card.Text>
       </Card.Body>
       <Card.Footer className="text-center">More Info<i className='bx bx-right-arrow-circle'></i></Card.Footer>
     </Card>
     </div>

      <div className='card-item'>
      <Card className='background'>
        <Card.Body>
          <Card.Title className='bold'>44</Card.Title>
          <Card.Text>
            User Registrations
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">More Info<i className='bx bx-right-arrow-circle'></i></Card.Footer>
      </Card>
      </div>

       <div className='card-item'>
       <Card className='background'>
         <Card.Body>
           <Card.Title className='bold'>65</Card.Title>
           <Card.Text>
             Unique Visitors
           </Card.Text>
         </Card.Body>
         <Card.Footer className="text-center">More Info<i className='bx bx-right-arrow-circle'></i></Card.Footer>
       </Card>
       </div>
       </div>
  );
}

export default BootstrapCard ;