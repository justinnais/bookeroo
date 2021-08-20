import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      color: theme.palette.secondary.main,
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    title: {
      textTransform: 'uppercase',
      color: 'inherit',
      textDecoration: 'inherit',
    },

    button: {
      textTransform: 'capitalize',
    },
  })
);

export default function Header() {
  const classes = useStyles();

  const HeaderButton = () => {};
  // todo not sure about container in header
  return (
    <AppBar position='static' className={classes.root}>
      <Container>
        <Toolbar className={classes.toolbar} disableGutters>
          <div>
            <Typography
              variant='h6'
              className={classes.title}
              component={RouterLink}
              to='/'
            >
              Bookeroo
            </Typography>
          </div>
          <div>
            <Button color='inherit' className={classes.button}>
              Sign In
            </Button>
            <Button color='inherit' className={classes.button}>
              Sign In
            </Button>
            <Button color='inherit' className={classes.button}>
              Sign In
            </Button>
          </div>
          <div>
            <Button color='inherit' className={classes.button}>
              Sign In
            </Button>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              disableElevation
            >
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// class Header extends Component {
//   render() {
//     return (
//       // <Navbar expand='lg'>
//       //   <Container>
//       //     <Navbar.Brand href='#home'>BOOKEROO</Navbar.Brand>
//       //     <Navbar.Toggle aria-controls='basic-navbar-nav' />
//       //     <Navbar.Collapse
//       //       id='basic-navbar-nav'
//       //       className='justify-content-between'
//       //     >
//       //       <div></div>
//       //       <Nav>
//       //         <Nav.Link href='#home'>Search</Nav.Link>
//       //         <Nav.Link href='#link'>Books</Nav.Link>
//       //         <Nav.Link href='#link'>Sell Books</Nav.Link>
//       //       </Nav>
//       //       <Nav>
//       //         <Nav.Link
//       //           href='#link'
//       //           className='primary'
//       //           style={{ paddingRight: '1rem', paddingLeft: '1rem' }}
//       //         >
//       //           Sign In
//       //         </Nav.Link>
//       //         <Button>Sign Up</Button>
//       //       </Nav>
//       //     </Navbar.Collapse>
//       //   </Container>
//       // </Navbar>
//       <div>
//         <nav className='navbar navbar-expand-sm navbar-dark bg-primary mb-4'>
//           <div className='container'>
//             <a className='navbar-brand' href='Dashboard'>
//               Person Management Tool
//             </a>
//             <button
//               className='navbar-toggler'
//               type='button'
//               data-toggle='collapse'
//               data-target='#mobile-nav'
//             >
//               <span className='navbar-toggler-icon' />
//             </button>

//             <div className='collapse navbar-collapse' id='mobile-nav'>
//               <ul className='navbar-nav mr-auto'>
//                 <li className='nav-item'>
//                   <a className='nav-link' href='/dashboard'>
//                     Dashboard
//                   </a>
//                 </li>
//               </ul>

//               <ul className='navbar-nav ml-auto'>
//                 <li className='nav-item'>
//                   <a className='nav-link ' href='register'>
//                     Sign Up
//                   </a>
//                 </li>
//                 <li className='nav-item'>
//                   <a className='nav-link' href='login'>
//                     Login
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }
// export default Header;
