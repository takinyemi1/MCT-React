import { Container, Navbar, Row, Col, Nav } from 'react-bootstrap';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import './App.css'
import { useState } from 'react';

function App() {
  const [userID, setUserID] = useState("");

  const getUserIDHandler = (id) => {
    console.log("The ID of the document to be edited is: ", id);
    setUserID(id);
  }
  return (
    <>
      {/* <span style={{color: "black"}}>Hello World</span> */}
      <Navbar className='header' variant='dark'>
        <Container>
          <Navbar.Brand href='#home' className='home-link'>Matrix Capital Trust Library - Firebase CRUD</Navbar.Brand>
          <br />
        </Container>
      </Navbar>

      <Container style={{width: "100%"}}>
        <Row>
          <Col>
            <AddUser id={userID} setUserID={setUserID} />
          </Col>
        </Row>
      </Container>

      <br /><br />

      <Container>
        <Row>
          <Col>
            <UserList getUserID={getUserIDHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;