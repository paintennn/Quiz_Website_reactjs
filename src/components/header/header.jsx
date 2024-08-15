import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { logOut } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Profile from './Profile';
import { useState } from 'react';

const Header = () =>{
  const [isShowModalProfile, setShowModalProfile] = useState(false);

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const handleRegister = () => {
    navigate('/register');
  }


  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const dispatch = useDispatch()
  console.log(account, isAuthenticated)

  const handleLogOut = async() => {
    let res = await logOut("account.email", account.refresh_token)
    console.log("rs", res)
    if(res && res.EC === 0){
      //clear data user
      dispatch(doLogout())
      navigate('/login')
    }else{
      toast.error(res.EM)
    }
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/*<Navbar.Brand href="#home" className='border'>NgocBao</Navbar.Brand>*/}
          <NavLink to="/" className='navbar-brand'>NgocBao</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className='nav-link'>Home</NavLink>
              <NavLink to="/quiz" className='nav-link'>Quiz</NavLink>
              <NavLink to="/admins" className='nav-link'>Admin</NavLink>
            </Nav>
            <Nav>
              {isAuthenticated === false ? 
                <>
                  <button type='button' className='btn-login' onClick={() => handleLogin()}>LogIn</button>
                  <button type='button' className='btn-signup' onClick={() => handleRegister()}>SignUp</button>
                </> :
                <NavDropdown title="Settings">
                  <NavDropdown.Item onClick={() => handleLogOut()}>Log Out</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setShowModalProfile(true)}>Profile</NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={isShowModalProfile} setShow={setShowModalProfile}/>
    </>
    
  );
}

export default Header;