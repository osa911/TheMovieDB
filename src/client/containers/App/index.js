import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import Header from '../../components/Header';
import selectors from './selectors';
import { loginValidator } from './schema';
import * as actions from './actions';


const ControlLabel = {
  textAlign: 'right',
  marginBottom: 0,
  paddingTop: '7px'
};

class App extends Component {
  static propTypes = {
    isOpenModal: PropTypes.bool,
    toggleModal: PropTypes.func,
    postLogin: PropTypes.func,
    loginInfo: PropTypes.shape({
      isLogined: PropTypes.bool,
      login: PropTypes.string,
      password: PropTypes.string
    }),
  };

  toggleModal = () => {
    const {
      toggleModal,
      isOpenModal
    } = this.props;
    toggleModal(!isOpenModal);
  };

  generateMenuList = () => {
    const { loginInfo: {
        isLogined
      }
    } = this.props;
    const Popular = {
      title: 'Popular',
      to: '/popular'
    };
    const Favorites = {
      title: 'Favorites',
      to: '/favorites'
    };
    const signIn = {
      style: { cursor: 'pointer' },
      isNotLink: true,
      title: 'Sign in',
      to: this.toggleModal
    }

    return isLogined ? [Popular, Favorites] : [Popular, signIn];
  }

  onChangeParam = (key, value) => (e) => {
    const { changeParam } = this.props;
    // записуем введенные параметры юзером в нашу форму по названию поля(для text).
    changeParam(key, value || e.target.value);
  };

  login = () => {
    const {
      postLogin,
      loginInfo,
      toggleModal
    } = this.props;

    const isValidData = loginValidator.validate({
      name: loginInfo.login,
      password: loginInfo.password
    });

    if (isValidData) {
      postLogin(isValidData); 
      toggleModal(false);
    } else {
      console.log('Login_Error', loginValidator.getErrors());
    }
  };

  render() {
    const {
      isOpenModal,
      loginInfo: {
        isLogined
      }
    } = this.props;

    return (
      <div className='wrapper'>
        <Header
          menuList={this.generateMenuList()}
        />
        <Row className='show-grid'>
          <Col xs={12} md={12}>
            {this.props.children}
          </Col>
        </Row>

        <Modal show={isOpenModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Форма авторизации</Modal.Title>
          </Modal.Header>
          {
            !isLogined ?
              <Modal.Body>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalEmail">
                    <Col style={ControlLabel} sm={2}>
                      Email
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        onChange={this.onChangeParam('login')}
                        type="text"
                        placeholder="Login"
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalPassword">
                    <Col style={ControlLabel} sm={2}>
                      Pass
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        onChange={this.onChangeParam('password')}
                        type="password"
                        placeholder="Password"
                        onKeyPress={(e) => e.charCode === 13 && this.login()}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button onClick={this.login} bsStyle="primary">
                        Войти
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              : <Modal.Body> А нельзя :) </Modal.Body>
          }
        </Modal>

      </div>
    );
  }
}

export default connect(selectors, actions)(App);
