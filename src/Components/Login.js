import React, {PureComponent} from 'react';

import CountdownTimer from 'react-component-countdown-timer'
import {Button, Form, Modal} from "react-bootstrap";
import {GlobalHotKeys} from "react-hotkeys";

const keyMap = {
  PREVIEW: "Enter",
};

class Login extends PureComponent {
  state = {
    phone: null,
    error: null,
    show: null,
    status: null,
    level: 1,
    verify: null,
    code: null,
    modal: false,
    modalphone: false,
  };

  constructor(props) {
    super(props);
    this.input1 = React.createRef()
    this.input2 = React.createRef()
  }

  handlers = {
    PREVIEW: event => {
      if (this.state.level === 1) {
        this.setLevel()
      } else if (this.state.level === 3) {
        this.setState({level: 1})
      } else {
        this.loginUp()
      }
    }
  };

  setChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  setLevel() {
    if (this.state.level === 1) {
      if (this.state.phone === null) {
        this.setState({modalphone: true})
      } else {
        this.setState({level: 2})
        setTimeout(() => {
          this.loginUp();
        }, 100)
      }
    }
  }

  setdefault() {
    this.setState({level: 1})
  }

  onKeyEnter(event) {
    event.which = event.which || event.keyCode;
    if (event.which === 13) {
      switch (event.target.id) {
        case "input-1":
          this.setLevel()
          break;
        case "input-2":
          this.loginUp()
          break;

        default:
          break;
      }
    }
  }

  loginUp() {
    if (this.state.code === null) {
      let {phone} = this.state;
      fetch('https://cv.skenap.ir/api/v1/registerR', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
        }),
      }).then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.stats === 'success') {
            localStorage.setItem('apiToken', result.data.user.api_token);
            localStorage.setItem('userId', result.data.user.user_id);
            localStorage.setItem('status', result.data.status);
            setTimeout(() => {
              this.setState({
                code: result.data.randomString2,
                state12: {status: result.data.status}
              })
            }, 500)
          } else if (result.stats === 'error') {
            this.setState({
              error: result.data,
              show: true
            })
          } else if (result.stats === 'failed') {
            this.setState({
              error: result.data,
              show: true

            })
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      setTimeout(() => {
        if (parseInt(this.state.verify) === this.state.code) {
          this.props.history.push({
            pathname: './form',
            state: this.state.state12
          })
        } else {
          this.setState({
            level: 3,
            modal: true,
            code: null,
            phone: null,
          })
        }
      }, 300)
    }
  }

  setFalse() {
    this.setState({modal: false})
    this.setState({modalphone: false})
  }

  render() {
    return (
      <div className='bg-8'>
        <div>
          <div className="text-right container d-flex justify-content-center align-items-center" dir="rtl"
               style={{height: '92.5vh'}}>
            <GlobalHotKeys keyMap={keyMap} handlers={this.handlers}/>
            <div>
              <div className='d-flex justify-content-center'>
                <div className='card w-100 pb-4 pt-4 omid' style={{
                  boxShadow: '0px 0px 30px -3px rgba(75.94370654039437, 76.25000381469727, 73.43206889111062, 0.35)'
                  , backgroundColor: 'whitesmoke'
                }}>
                  <div className='card-body w-75 d-block mx-auto pb-5 pt-2 ppp'>
                    <img className='d-block mx-auto mb-5'
                         src={require("./../Images/Kanino Final logo.png")}
                         alt="" style={{width: '60%'}}/>
                    <div>
                      <div className="was-validated">
                        {this.state.level === 1 ? <div>
                            <Form.Group>
                              <p className='text-center'><small>برای ثبت رزومه شماره موبایل خود را وارد کنید</small></p>
                              <Form.Label>شماره موبایل</Form.Label>
                              <Form.Control type="text" name="phone" className="is-invalid"
                                            onChange={this.setChange.bind(this)}
                                            id="input-1" ref={this.input1} onKeyPress={this.onKeyEnter.bind(this)}
                                            required/>
                            </Form.Group>
                            <a className="d-block mx-auto mt-5 btn btn-custom akbar w-50"
                               onClick={this.setLevel.bind(this)}>
                              ارسال کد تایید
                            </a>
                          </div>
                          : null}
                        {this.state.level === 2 ?
                          <div>
                            <Form.Group>
                              <Form.Row>
                                <Form.Label className='col-xl-10 col-lg-10 col-md-10 col-9 '>کد تایید</Form.Label>
                                <CountdownTimer className='ml-0 mr-3 mb-1' size={13} backgroundColor='whitesmoke'
                                                count={120} hideDay hideHours onEnd={this.loginUp.bind(this)}/>
                              </Form.Row>
                              <Form.Control type="text" name="verify" className="is-invalid"
                                            onChange={this.setChange.bind(this)}
                                            id="input-2" ref={this.input2} onKeyPress={this.onKeyEnter.bind(this)}
                                            required/>

                            </Form.Group>
                            <Form.Row className='mt-4 align-items-center'>
                              <a className="d-block mx-auto btn btn-custom akbar" onClick={this.loginUp.bind(this)}
                                 style={{width: '55%'}}>
                                ورود یا ثبت نام
                              </a>
                            </Form.Row>
                          </div> : null}
                        {this.state.level === 3 ?
                          <a className="d-block mx-auto my-auto btn btn-custom akbar"
                             onClick={this.setdefault.bind(this)}
                             style={{width: '72%'}}>
                            ارسال دوباره کد تایید
                          </a> : null
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={this.state.modal} onHide={this.setFalse.bind(this)} className="text-right" dir="rtl">
              <Modal.Header>
                <Modal.Title className="text-danger">خطایی رخ داده است</Modal.Title>
              </Modal.Header>
              <Modal.Body>کد تایید وارد نشده است یا اشتباه می باشد لطفا دوباره تلاش کنید</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.setFalse.bind(this)}>
                  بستن
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.modalphone} onHide={this.setFalse.bind(this)} className="text-right" dir="rtl">
              <Modal.Header>
                <Modal.Title className="text-danger">خطایی رخ داده است</Modal.Title>
              </Modal.Header>
              <Modal.Body>لطفا شماره همراه خود را به درستی وارد کنید.</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.setFalse.bind(this)}>
                  بستن
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <p className='text-center container mb-0 pb-2 yyy' style={{fontSize: '12px', color: '#173A30'}}>
            تمامی حقوق این وبسایت متعلق به زادبوم سازندگاه کانی نو می‌باشد</p>
          <div className='pb-2 text-center yyy'  dir='rtl' style={{fontSize: '12px', color:'#173A30'}}>
            © اسپراک |<a className='btn yyy pr-1' href="http://sproc.ir" style={{fontSize: '12px', color:'#173A30'}}>sproc.ir</a>
          </div>
        </div>
      </div>
    );

  }
}

export default Login;
