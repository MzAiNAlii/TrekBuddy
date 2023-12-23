import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Card.scss'

let BootstrapCard = () => {
  return (
    <div className='card-section'>
           <div >
      <Card className='card text-Mode-card'>
        <Card.Body className='text-mode' style={{padding : ' 3.4vw 0.2vw'}}>
            TUESDAY
        </Card.Body>
      </Card>
      </div>

      <div className='card-padding'>
      <Card className='card'>
        <Card.Body>
          <div className='card-Text'>
            <div className='text-FlexItem text-bold'>O2</div>
            <div className='text-FlexItem text-center'>
              <div>-1</div>
              <div>DEC</div>
            </div>
          </div>
        </Card.Body>
      </Card>
      </div>

      <div>
      <Card  className='card'>
        <Card.Body>
          <Card.Title style={{fontWeight: '545'}}>NUNC SED IACULIS LEO</Card.Title>
          <Card.Text>
            <h6> OCT (Oct 04, 2021) 10:30 AM- (Oct 17, 2021) 7:30 PM</h6>
            <p style={{color: '#7e8082'}}>761 Camden Street. Reno, NV</p>
          </Card.Text>
          <div className='button-flex'>
            <p style={{paddingTop : '3%'}}>Dress Code Express Yourself</p>
            <Button className='button'>SEE AGENDA</Button>
          </div>
        </Card.Body>
      </Card>
      </div>
    </div>
  );
}

export default BootstrapCard;