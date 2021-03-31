import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser] = useContext(UserContext)
    return (
        <Container>
            <Navbar expand="lg">
                <Navbar.Brand ><Link className='text-warning text-decoration-none' to='/home'><h2>Daily Grocery</h2></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className='mx-2 text-warning text-decoration-none' to='/home'><h4>Home</h4></Link>
                        <Link className='mx-2 text-warning text-decoration-none' to='/orders'><h4>Orders</h4></Link>
                        <Link className='mx-2 text-warning text-decoration-none' to='/admin'><h4>Admin</h4></Link>
                        <Link className='mx-2 text-warning text-decoration-none' to='/deals'><h4>Deals</h4></Link>
                        {
                            loggedInUser.email && loggedInUser.displayName ? <Link to='/login' className='mx-2 text-warning text-decoration-none' ><h4>{loggedInUser.displayName}</h4></Link> : <Link className="mx-2 btn btn-warning text-white px-4" to='/login'>Login</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;
