import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import "./Chat.css"
import boy from '../../Assets/Alexander_Pierce.jpg'
import girl from '../../Assets/Sarah_Bullock.jpg'

function BasicExample() {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Direct Chat</Accordion.Header>
                <Accordion.Body>
                    <div className='chat-container'>
                        <div className='chat-messages'>
                            <div className='flex mt-3'>
                                <div>
                                    <p className='text-bold'>Alexander Pierce23</p>
                                    <div className="user-info">
                                        <img src={boy} className='image' alt="User Avatar"></img>
                                        <p className="breadcrumb">Is this template really for free? That's unbelievable!</p>
                                    </div>
                                </div>
                                <div>
                                    <p>23 Jan 2:00 pm</p>
                                </div>
                            </div>


                            <div className='flex mt-3'>
                                <div><p>23 Jan 2:05 pm</p></div>
                                <div>
                                    <p className='text-bold'>Sarah Bullock</p>
                                    <div className="user-info">
                                        <div> <p className="breadcrumb">You better believe it!</p></div>
                                        <div><img src={girl} className='image' alt="User Avatar"></img></div>
                                    </div>
                                </div>

                            </div>
                            <div className='flex mt-3'>
                                <div><p className='text-bold'>Alexander Pierce23</p>
                                    <div className="user-info">
                                        <div><img src={boy} className='image' alt="boy Avatar"></img></div>
                                        <div> <p className="breadcrumb">Working with AdminLTE on a great new app! Wanna join?</p></div>
                                    </div>
                                </div>
                                <div><p>23 Jan 5:37 pm</p> </div>
                            </div>

                            <div className='flex mt-3'>
                                <div><p>23 Jan 6:10 pm</p></div>

                                <div><p className='text-bold'>Sarah Bullock</p>

                                    <div className="user-info">
                                        <div> <p className="breadcrumb">I would love to.</p></div>
                                        <div><img src={girl} className='image' alt="boy Avatar"></img></div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="input-row">
                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Type Message...." />
                        <Button type="submit" className="button mb-2">Send</Button>
                    </div>

                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    );
}

export default BasicExample;