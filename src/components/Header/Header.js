import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser] = useContext(UserContext)
    return (
        <Navbar expand="lg">
            <Navbar.Brand ><Link className='text-danger text-decoration-none' to='/home'><h3>Daily Grocery</h3></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto d-flex align-items-center">
                    <Link className='mx-2 text-danger text-decoration-none' to='/home'><h5>Home</h5></Link>
                    <Link className='mx-2 text-danger text-decoration-none' to='/orders'><h5>Orders</h5></Link>
                    <Link className='mx-2 text-danger text-decoration-none' to='/admin/admin'><h5>Admin</h5></Link>
                    <Link className='mx-2 text-danger text-decoration-none' to='/deals'><h5>Deals</h5></Link>
                    {
                        loggedInUser.email && loggedInUser.displayName ? <Link to='/login' className='mx-2 text-danger text-decoration-none' >
                            {loggedInUser.photoURL ? <img src={loggedInUser.photoURL} style={{ width: "50%", borderRadius: "50%" }} alt="..." /> : <h5>{loggedInUser.displayName}</h5>}
                        </Link> : <Link className="mx-2 btn btn-danger text-white px-4" to='/login'>Login</Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
