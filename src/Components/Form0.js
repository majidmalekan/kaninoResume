import React, {PureComponent} from 'react';

import {Form, Modal, Button} from "react-bootstrap";
import {GlobalHotKeys} from "react-hotkeys";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {ImpulseSpinner, RotateSpinner} from "react-spinners-kit";

import axios from "axios";
import DatePicker from "react-modern-calendar-datepicker";

const keyMap = {
  PREVIEW: "Enter",
};

class Form0 extends PureComponent {
  state = {
    x: [],
    xx: [],
    show: false,
    usename: null,
    val: [],
    loading: false,
    soldier: false,
    showreturn: null,
    firstspinner: true,
    finish: null,
  };

  componentDidMount() {
    if (this.props.disstatus2) {
      const apiToken = localStorage.getItem('apiToken');
      const userId = localStorage.getItem('userId');
      fetch('https://cv.skenap.ir/api/v1/showSectionFirstR', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_token: apiToken,
          user_id: userId,
        }),
      }).then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.stats === 'success') {
            this.setState({
              showreturn: result.data,
              firstspinner: false
            })
            let values = Object.values(this.state.showreturn);
            let key = Object.keys(values[0]);
            let value = Object.values(values[0])
            try{
              let bdateval = value[key.indexOf("تاریخ تولد")].split('/');
              this.setState({
                finish:{
                  year: bdateval[0],
                  month: bdateval[1],
                  day: bdateval[2],
                }
              })
            }
            catch (error){

            }
            for (let index = 0; index < key.length; index++) {
              try {
                document.getElementById(key[index]).defaultValue = value[index]
              } catch (error) {

              }

            }
            document.getElementById('جنسیت').value = value[key.indexOf('جنسیت')]

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
        });
    }
  }

  handlers = {
    PREVIEW: event => this.setstatus("2")
  };

  senddata(param) {
    const apiToken = localStorage.getItem('apiToken');
    const userId = localStorage.getItem('userId');
    fetch('https://cv.skenap.ir/api/v1/firstSectionR', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: userId,
        api_token: apiToken,
        question: this.state.xx
      }),
    }).then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.stats === 'success') {
          if (param === "2") {
            this.props.disstatus2(true);
          }
          this.props.status(param);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  setstatus(param) {
    let uz = 0
    if (this.props.statusdis) {
      if (this.state.x.length !== 0) {
        this.setState(prev => {
          return {
            xx: [...prev.xx, this.state.x[0]]
          }
        });
      }
      setTimeout(() => {
        if (this.state.xx.length !== 0) {
          const apiToken = localStorage.getItem('apiToken');
          const userId = localStorage.getItem('userId');
          fetch('https://cv.skenap.ir/api/v1/firstSectionR', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              user_id: userId,
              api_token: apiToken,
              question: this.state.xx
            }),
          }).then((response) => response.json())
            .then((result) => {
              console.log(result)
              if (result.stats === 'success') {
                if (param === "2") {
                  this.props.disstatus2(true);
                }
                this.props.status(param);
              }
            })
            .catch((err) => {
              alert(err);
            });
        }
      }, 200)
    } else {
      this.state.soldier ? uz = 12 : uz = 11;
      if (this.state.val.length !== uz) {
        this.setState({show: true});
      } else {
        try {
          this.setState(prev => {
            return {
              xx: [...prev.xx, this.state.x[0]]
            }
          });
          const datePublic = this.state.finish.year + '/' + this.state.finish.month + '/' + this.state.finish.day;
          const namePublic = "تاریخ تولد";
          this.setState({loading: true})
          this.setState(prev => {
            return {
              xx: [...prev.xx, {[namePublic]: datePublic}]
            }
          });
          setTimeout(() => {
            this.senddata(param);
          }, 1000)
        } catch (error) {
          this.setState({show: true})
        }
      }
    }
  }

  setChange(event) {
    const {name, value} = event.target;
    const cond = (zz) => zz === name;
    if (this.state.val.findIndex(cond) === -1) {
      this.setState(prev => {
        return {
          val: [...prev.val, name]
        }
      });
    }
    if (this.state.usename === name) {
      this.setState({
        x: [{[name]: value}]
      });
    } else if (this.state.usename !== null) {
      this.setState(prev => {
        return {
          xx: [...prev.xx, this.state.x[0]]
        }
      });
    }
    this.setState({usename: name});
  }

  setChange2(event) {
    const {name, value} = event.target;
    if (this.state.usename === name) {
      this.setState({
        x: [{[name]: value}]
      });
    } else if (this.state.usename !== null) {
      this.setState(prev => {
        return {
          xx: [...prev.xx, this.state.x[0]]
        }
      });
    }
    this.setState({usename: name});
  }

  setSelect(event) {
    const {name, value} = event.target;
    const cond = (zz) => zz === name;
    if (name === 'جنسیت') {
      if (value === 'مرد') {
        this.setState({soldier: true})
      } else {
        this.setState({soldier: false})
      }
    }
    if (this.state.val.findIndex(cond) === -1) {
      this.setState(prev => {
        return {
          val: [...prev.val, name]
        }
      });
    }
    this.setState(prev => {
      return {
        xx: [...prev.xx, {[name]: value}]
      }
    });
  }

  setFalse() {
    this.setState({show: false})
  }

  render() {
    return (
      <div className="my-5 text-right w-100">
        {this.state.firstspinner ?
          <div className='d-flex justify-content-center align-items-center' style={{height: '80vh'}}>
            <ImpulseSpinner size={85} frontColor="#1B998B" loading={this.state.firstspinner}/>
          </div>
          : <div>
            <Form className="my-5 text-right w-100 was-validated">
              <GlobalHotKeys keyMap={keyMap} handlers={this.handlers}/>

              <h5 className='my-3'>مشخصات فردی: </h5>
              <Form.Row>
                <Form.Group className='col-xl-2 col-lg-5 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>نام:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name='نام' id='نام' onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-4 col-lg-7 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>نام خانوادگی:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name="نام خانوادگی" id="نام خانوادگی"
                                  onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>شماره ملی:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name="شماره ملی" id="شماره ملی"
                                  onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label className='col-xl-12 col-lg-12 col-12'>تاریخ تولد:</Form.Label>
                    <DatePicker
                      locale='fa'
                      name="تاریخ تولد"
                      id="تاریخ تولد"
                      value={this.state.finish}
                      onChange={finish => this.setState({finish})}
                      inputPlaceholder="تاریخ را انتخاب کنید"
                      shouldHighlightWeekends
                      inputClassName='form-control bg-white w-100'
                    />
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>محل تولد:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name="محل تولد" id="محل تولد"
                                  onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>وضعیت تاهل:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name="وضعیت تاهل" id="وضعیت تاهل"
                                  onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-2 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>جنسیت:</Form.Label>
                    <Form.Control as='select' className='ehsan' name="جنسیت" id="جنسیت" onChange={this.setSelect.bind(this)}
                                  required>
                      <option value="">انتخاب</option>
                      <option>مرد</option>
                      <option>زن</option>
                    </Form.Control>
                  </div>
                </Form.Group>
                {this.state.soldier ? <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>وضعیت سربازی:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name="وضعیت سربازی" id="وضعیت سربازی"
                                  onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group> : null}

              </Form.Row>

              <h5 className='my-3'>راه‌های ارتباطی: </h5>

              <Form.Row>
                <Form.Group className='col-xl-3 col-lg-4 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>شماره همراه:</Form.Label>
                    <Form.Control className="is-invalid" type="phone" name="تلفن همراه" id="تلفن همراه"
                                  onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-3 col-lg-8  col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>پست الکترونیک:</Form.Label>
                    <Form.Control className="is-invalid " type="email" name="پست الکترونیک" id="پست الکترونیک"
                                  onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>تلفن منزل:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name="تلفن منزل" id="تلفن منزل" onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>آدرس سایت:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name="آدرس سایت" id="آدرس سایت" onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group className='col-xl-8 col-lg-8 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>آدرس محل سکونت:</Form.Label>
                    <Form.Control className="is-invalid" type="text" name="محل سکونت" id="محل سکونت" onChange={this.setChange.bind(this)}
                                  required/>
                  </div>
                </Form.Group>

              </Form.Row>
            </Form>
            <Form>
              <h5 className='my-3'>شبکه‌های اجتماعی: </h5>

              <Form.Row>

                <Form.Group className="col-xl-3 col-lg-6 col-12">
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>لینکدین:</Form.Label>
                    <Form.Control name="لینکدین" id="لینکدین"
                                  onChange={this.setChange2.bind(this)}/>
                  </div>
                </Form.Group>

                <Form.Group className="col-xl-3 col-lg-6 col-12">
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>فیسبوک:</Form.Label>
                    <Form.Control name="فیسبوک" id="فیسبوک"
                                  onChange={this.setChange2.bind(this)}/>
                  </div>
                </Form.Group>

                <Form.Group className="col-xl-3 col-lg-6 col-12">
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>اینستاگرام:</Form.Label>
                    <Form.Control name="اینستاگرام" id="اینستاگرام"
                                  onChange={this.setChange2.bind(this)}/>
                  </div>
                </Form.Group>

                <Form.Group className="col-xl-3 col-lg-6 col-12">
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>توییتر:</Form.Label>
                    <Form.Control name="توییتر" id="توییتر"
                                  onChange={this.setChange2.bind(this)}/>
                  </div>
                </Form.Group>

              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-12 col-lg-12 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>توصیفی کوتاه از خود:</Form.Label>
                    <textarea className="form-control" name="توصیفی کوتاه از خود" id="توصیفی کوتاه از خود"
                              onChange={this.setChange2.bind(this)}/>
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-5 d-flex justify-content-end">
                <Form.Group>
                  <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                     aria-controls="v-pills-messages" aria-selected="false" onClick={this.setstatus.bind(this, "2")}>مرحله
                    بعدی</a>
                </Form.Group>
                <Form.Group>
                  <RotateSpinner size={40} color="#1B998B" loading={this.state.loading}/>
                </Form.Group>
              </Form.Row>
              <Modal show={this.state.show} onHide={this.setFalse.bind(this)} className="text-right" dir="rtl">
                <Modal.Header>
                  <Modal.Title className="text-danger">خطایی رخ داده است</Modal.Title>
                </Modal.Header>
                <Modal.Body>لطفا تمام فیلد ها را پر کنید</Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={this.setFalse.bind(this)}>
                    بستن
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form>
          </div>
        }
      </div>
    )
  }
}

export default Form0;
