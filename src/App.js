import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import AlertDismissable from './components/AlertDismissable';
import Routes from './Routes';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    const reloadMsg = `
      New content is available.<br />
      Please <a href='javascript:location.reload();'>reload</a>.<br />
      <small>If reloading doesn't work, close all tabs/windows of this web application,
      and then reopen the application.</small>
    `;
    this.state = {
      showUpdateAlert: true,
      reloadMsg: reloadMsg
    };
  }

  dismissUpdateAlert = event => {
    this.setState({ showUpdateAlert: false });
  }

  render() {
    return (
      <Router basename="/311SmartCategorization">
        <div className="App">
          <Container>
            <Navbar collapseOnSelect className="app-nav-bar hidden" variant="dark" expand="lg">
              <Navbar.Brand as={Link} to="/">GSOC Prototype 0703</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="">
                  <Link className="nav-link" to="/">Classify</Link>
                  <Link className="nav-link" to="/about">About</Link>
                  <Link className="nav-link" to="/frame1">(WIP) Frame 1</Link>
                  <Link className="nav-link" to="/frame2">Frame 2</Link>
                  <Link className="nav-link" to="/frame3">Frame 3</Link>
                  <Link className="nav-link" to="/frame4">Frame 4</Link>
                  <Link className="nav-link" to="/frame5">Frame 5</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            { this.props.updateAvailable && this.state.showUpdateAlert &&
              <div style={{paddingTop: '10px'}}>
                <AlertDismissable
                  title=""
                  variant="info"
                  message={this.state.reloadMsg}
                  show={this.props.updateAvailable && this.state.showUpdateAlert}
                  onClose={this.dismissUpdateAlert} />
              </div>
            }
          </Container>
          <Container>
            <Routes />
          </Container>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  updateAvailable: PropTypes.bool.isRequired,
};

export default App;
