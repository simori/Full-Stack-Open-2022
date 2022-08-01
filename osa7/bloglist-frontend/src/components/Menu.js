import { Navbar, Nav } from 'react-bootstrap'
import Header from './Header'
import { Link } from 'react-router-dom'

const Menu = ({ user, logout }) => {
  const padding = {
    paddingRight: 5,
    color: 'white'
  }
  return (
    <div className="container nav justify-content-center">
      <Header />
      <Navbar collapseOnSelect expand="lg justify-content-center" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
            Logged in as {user}
              <button className="btn btn-danger" id="logout" onClick={logout}>
                  logout!
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu