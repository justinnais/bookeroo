import React, { Component } from 'react';
// import { Navbar, Container, Nav, Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      // <Navbar expand='lg'>
      //   <Container>
      //     <Navbar.Brand href='#home'>BOOKEROO</Navbar.Brand>
      //     <Navbar.Toggle aria-controls='basic-navbar-nav' />
      //     <Navbar.Collapse
      //       id='basic-navbar-nav'
      //       className='justify-content-between'
      //     >
      //       <div></div>
      //       <Nav>
      //         <Nav.Link href='#home'>Search</Nav.Link>
      //         <Nav.Link href='#link'>Books</Nav.Link>
      //         <Nav.Link href='#link'>Sell Books</Nav.Link>
      //       </Nav>
      //       <Nav>
      //         <Nav.Link
      //           href='#link'
      //           className='primary'
      //           style={{ paddingRight: '1rem', paddingLeft: '1rem' }}
      //         >
      //           Sign In
      //         </Nav.Link>
      //         <Button>Sign Up</Button>
      //       </Nav>
      //     </Navbar.Collapse>
      //   </Container>
      // </Navbar>
      <div>
        <nav className='navbar navbar-expand-sm navbar-dark bg-primary mb-4'>
          <div className='container'>
            <a className='navbar-brand' href='Dashboard'>
              Person Management Tool
            </a>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#mobile-nav'
            >
              <span className='navbar-toggler-icon' />
            </button>

            <div className='collapse navbar-collapse' id='mobile-nav'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <a className='nav-link' href='/dashboard'>
                    Dashboard
                  </a>
                </li>
              </ul>

              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <a className='nav-link ' href='register'>
                    Sign Up
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='login'>
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
