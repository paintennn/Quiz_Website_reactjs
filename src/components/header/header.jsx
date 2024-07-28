import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const Header = () =>{
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/*<Navbar.Brand href="#home" className='border'>NgocBao</Navbar.Brand>*/}
        <NavLink to="/" className='navbar-brand'>NgocBao</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="/users" className='nav-link'>User</NavLink>
            <NavLink to="/admins" className='nav-link'>Admin</NavLink>
          </Nav>
          <Nav>
            <button type='button' className='btn-login'>LogIn</button>
            <button type='button' className='btn-signup'>SignUp</button>
            {/*<NavDropdown title="Profiles" id="basic-nav-dropdown">
                <NavDropdown.Item >Log In</NavDropdown.Item>
                <NavDropdown.Item >Log Out</NavDropdown.Item>
                <NavDropdown.Item >Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >Helps</NavDropdown.Item>
              </NavDropdown>*/}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;