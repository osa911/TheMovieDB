import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router";
import { Nav, Navbar } from 'react-bootstrap';

class Header extends Component {
  static propTypes = {
    menuList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const {
      menuList
    } = this.props;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>
              Home
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {
              menuList.map((item, key) =>
                <li key={key} >
                  {
                    item.isNotLink ?
                      <a style={item.style} onClick={item.to} >{item.title}</a>
                    : <Link to={item.to}>{item.title}</Link>
                  }
                </li>
              )
          }
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
