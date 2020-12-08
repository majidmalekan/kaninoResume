import React, {PureComponent} from 'react';

import {Form, Modal, Button, Table} from "react-bootstrap";

import {GlobalHotKeys} from "react-hotkeys";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {ClapSpinner, ImpulseSpinner, RotateSpinner} from "react-spinners-kit";

const keyMap = {
  PREVIEW: "Enter",
};

class Form1 extends PureComponent {
  state = {
    x: [],
    xx: [],
    usename: null,
    error: null,
    loading: false,
    plusloading: false,
    showsecondsection: [],
    edit: false,
    firstspinner: true,
    num: 0,
    emptymodal: false,
  };
  handlers = {
    PREVIEW: event => this.setstatus("3")
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    try {
      const apiToken = localStorage.getItem('apiToken');
      const userId = localStorage.getItem('userId');
      fetch('https://cv.skenap.ir/api/v1/showSectionSecondR', {
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
              showsecondsection: result.data,
              firstspinner: false,
            })
            if (result.data[0].length !== 0) {
              this.setState({num: result.data.length})
            }
            setTimeout(() => {
              this.setdata()
            }, 50)
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
          // alert(err);
        });
    } catch (alert) {
    }
  }

  senddata() {
    const apiToken = localStorage.getItem('apiToken');
    const userId = localStorage.getItem('userId');
    fetch('https://cv.skenap.ir/api/v1/secondSectionR', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: userId,
        api_token: apiToken,
        question: this.state.xx,
      }),
    }).then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.stats === 'success') {
          this.setnull()
          this.getdegres()
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  setnull() {
    this.state.xx.map((val, index) => {
      let values = Object.keys(val);
      document.getElementById(values[0]).value = ''
      document.getElementById('وضعیت تحصیلی').value = 'انتخاب'
    })
    this.setState({
      xx: [],
      x: []
    })
  }

  setstatus(param) {
    if (this.props.statusdis) {
      this.props.status(param);
    } else {
      if (param === "1") {
        this.props.status(param)
      } else {
        this.setState({loading: true})
        setTimeout(() => {
          if (param === "3") {
            this.props.disstatus3(true);
          }
          this.props.status(param);
        }, 1000)
      }
    }
  }

  setChange(event) {
    const {name, value} = event.target;
    if (this.state.usename === name) {
      this.setState({
        x: [{[name]: value}]
      });
    } else if (this.state.usename !== null && this.state.x.length !== 0) {
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
    this.setState(prev => {
      return {
        xx: [...prev.xx, {[name]: value}]
      }
    });
  }

  setFalse() {
    this.setState({
      emptymodal: false,
    })
  }

  getdegres() {
    try {
      const apiToken = localStorage.getItem('apiToken');
      const userId = localStorage.getItem('userId');
      fetch('https://cv.skenap.ir/api/v1/showSectionSecondR', {
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
              showsecondsection: result.data,
            })
            if (result.data[0].length !== 0) {
              this.setState({num: result.data.length})
            }
            setTimeout(() => {
              this.setdata()
              this.setState({plusloading: false,})
            }, 10)
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
          // alert(err);
        });
    } catch (alert) {
    }
  }

  plus() {
    if (this.state.x.length !== 0) {
      this.setState({plusloading: true})
      this.setState(prev => {
        return {
          xx: [...prev.xx, this.state.x[0]]
        }
      });
      setTimeout(() => {
        this.senddata()
      }, 500)
    } else {
      this.setState({
        emptymodal: true,
      })
    }
  }

  edit(id) {
    this.setState({
      edit_id: id,
      xx: []
    })
    setTimeout(() => {
      this.seteditdata(id)
    }, 10)
  }

  seteditdata(id) {
    let values = Object.values(this.state.showsecondsection);

    for (let z3 = 0; z3 < this.state.showsecondsection.length; z3++) {
      let key = Object.keys(values[z3]);
      let value = Object.values(values[z3])
      if (this.state.showsecondsection[z3].education_id === id) {
        for (let z4 = 0; z4 < key.length; z4++) {
          try {
            if (value[z4] !== undefined) {
              document.getElementById(key[z4] + this.state.showsecondsection[z3].education_id).defaultValue = value[z4]
            }
            document.getElementById('وضعیت تحصیلی' + this.state.showsecondsection[z3].education_id).value = value[key.indexOf('وضعیت تحصیلی')]
          } catch (error) {
          }
        }
      }
    }
  }

  sendsavedata(id) {
    const apiToken = localStorage.getItem('apiToken');
    const userId = localStorage.getItem('userId');
    fetch('https://cv.skenap.ir/api/v1/editSecondSection', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        api_token: apiToken,
        user_id: userId,
        question: this.state.xx,
        education_id: id
      }),
    }).then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.stats === 'success') {
          this.setState({
            edit_id: null,
          })
          this.setnull()
          this.getdegres()
        }
      })
      .catch((err) => {

        alert(err);
      });
  }

  save(id) {
    if (this.state.x.length !== 0) {
      this.setState({plusloading: true})
      this.setState(prev => {
        return {
          xx: [...prev.xx, this.state.x[0]],
          plusloading: true,
        }
      });
    }
    setTimeout(() => {
      if (this.state.xx.length !== 0) {
        this.setState({
          plusloading: true
        })
        this.sendsavedata(id)

      } else {
        this.setState({
          emptymodal: true,
        })
      }
    }, 400)
  }

  setdata() {
    let values = Object.values(this.state.showsecondsection);
    for (let z2 = 0; z2 < this.state.showsecondsection.length; z2++) {
      let key = Object.keys(values[z2]);
      let value = Object.values(values[z2])
      for (let z1 = 0; z1 < key.length; z1++) {
        try {
          if (value[z1] !== undefined) {
            document.getElementById(key[z1] + this.state.showsecondsection[z2].education_id).innerHTML = value[z1]
          }
        } catch (error) {
        }
      }
    }
  }

  render() {
    const items = []
    for (let index = 0; index < this.state.num; index++) {
      items.push(
        <Form className="my-5 text-right w-100">
          <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
            <div className='card-body'>
              <Form.Row>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>مقطع تحصیلی:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ? <Form.Control type="text" name="مقطع تحصیلی"
                                      id={'مقطع تحصیلی' + this.state.showsecondsection[index].education_id.toString()}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="مقطع تحصیلی"
                           id={'مقطع تحصیلی' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>رشته تحصیلی:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ? <Form.Control type="text" name="رشته تحصیلی"
                                      id={'رشته تحصیلی' + this.state.showsecondsection[index].education_id.toString()}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="رشته تحصیلی"
                           id={'رشته تحصیلی' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>گرایش:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ? <Form.Control type="text" name="گرایش"
                                      id={'گرایش' + this.state.showsecondsection[index].education_id.toString()}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="گرایش" id={'گرایش' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>مدت تحصیل:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ? <Form.Control type="text" name="مدت تحصیل"
                                      id={'مدت تحصیل' + this.state.showsecondsection[index].education_id.toString()}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="مدت تحصیل"
                           id={'مدت تحصیل' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>سال ورود:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ? <Form.Control type="text" name="سال ورود"
                                      id={'سال ورود' + this.state.showsecondsection[index].education_id.toString()}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="سال ورود"
                           id={'سال ورود' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>نام دانشگاه:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ? <Form.Control type="text" name="نام دانشگاه"
                                      id={'نام دانشگاه' + this.state.showsecondsection[index].education_id.toString()}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="نام دانشگاه"
                           id={'نام دانشگاه' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>کشور یا شهر محل تحصیل:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ? <Form.Control type="text" name="کشور یا شهر محل تحصیل"
                                      id={'کشور یا شهر محل تحصیل' + this.state.showsecondsection[index].education_id.toString()}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="کشور یا شهر محل تحصیل"
                           id={'کشور یا شهر محل تحصیل' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>وضعیت تحصیلی:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ?
                      <Form.Control as='select' className='ehsan' name="وضعیت تحصیلی"
                                    id={'وضعیت تحصیلی' + this.state.showsecondsection[index].education_id.toString()}
                                    onChange={this.setSelect.bind(this)}>
                        <option value="">انتخاب</option>
                        <option>در حال تحصیل</option>
                        <option>فارغ التحصیل</option>
                      </Form.Control>
                      : <p className='ehsan' name="وضعیت تحصیلی"
                           id={'وضعیت تحصیلی' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-12 col-lg-12 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>فعالیت های جانبی مرتبط با رشته تحصیلی:</Form.Label>
                    {this.state.edit_id === this.state.showsecondsection[index].education_id
                      ? <textarea className='form-control' name="فعالیت های جانبی مرتبط با رشته تحصیلی"
                                      id={'فعالیت های جانبی مرتبط با رشته تحصیلی' + this.state.showsecondsection[index].education_id.toString()}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="فعالیت های جانبی مرتبط با رشته تحصیلی"
                           id={'فعالیت های جانبی مرتبط با رشته تحصیلی' + this.state.showsecondsection[index].education_id.toString()}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3 d-flex justify-content-end">
                <Form.Group>
                  {this.state.edit_id === this.state.showsecondsection[index].education_id
                    ?
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.save.bind(this, this.state.showsecondsection[index].education_id)}>ذخیره اطلاعات
                    </a>
                    :
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.edit.bind(this, this.state.showsecondsection[index].education_id)}>ویرایش
                    </a>}
                </Form.Group>
              </Form.Row>
            </div>
          </div>
        </Form>
      )
    }
    return (
      <div className="my-5 text-right w-100">
        {this.state.firstspinner ?
          <div className='d-flex justify-content-center align-items-center' style={{height: '80vh'}}>
            <ImpulseSpinner size={85} frontColor="#1B998B" loading={this.state.firstspinner}/>
          </div> :
          <div>
            <GlobalHotKeys keyMap={keyMap} handlers={this.handlers}/>
            <img className='mb-4 d-block mx-auto'
                 src={require("./../Images/resume.svg")}
                 alt="" style={{width: '10%'}}/>
            <h5 className='my-3 mr-2'>اطلاعات تحصیلی:</h5>
            {items}
            <Form>
              <div className='card py-3' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
                <div className='card-body'>
                  <Form.Row>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>مقطع تحصیلی:</Form.Label>
                        <Form.Control type="text" name="مقطع تحصیلی" id="مقطع تحصیلی"
                                      onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>رشته تحصیلی:</Form.Label>
                        <Form.Control className="" type="text" name="رشته تحصیلی" id="رشته تحصیلی"
                                      onChange={this.setChange.bind(this)}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>گرایش:</Form.Label>
                        <Form.Control type="text" name="گرایش" id="گرایش" onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>مدت تحصیل:</Form.Label>
                        <Form.Control type="text" name="مدت تحصیل" id="مدت تحصیل" onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>سال ورود:</Form.Label>
                        <Form.Control className="" type="text" name="سال ورود" id="سال ورود"
                                      onChange={this.setChange.bind(this)}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>نام دانشگاه:</Form.Label>
                        <Form.Control type="text" name="نام دانشگاه" id="نام دانشگاه"
                                      onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>کشور یا شهر محل تحصیل:</Form.Label>
                        <Form.Control type="text" name="کشور یا شهر محل تحصیل" id="کشور یا شهر محل تحصیل"
                                      onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>

                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>وضعیت تحصیلی:</Form.Label>
                        <Form.Control as='select' className='ehsan' name="وضعیت تحصیلی" id="وضعیت تحصیلی"
                                      onChange={this.setSelect.bind(this)}>
                          <option value="">انتخاب</option>
                          <option>در حال تحصیل</option>
                          <option>فارغ التحصیل</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-12 col-lg-12 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>فعالیت های جانبی مرتبط با رشته تحصیلی:</Form.Label>
                        <textarea className="form-control " name="فعالیت های جانبی مرتبط با رشته تحصیلی"
                                  id="فعالیت های جانبی مرتبط با رشته تحصیلی"
                                  onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              </div>

              <a>
                <svg width="45px" height="45px" viewBox="0 0 16 16"
                     className="bi bi-plus-circle d-block mx-auto plus-icon my-3" fill="#51A3A3"
                     xmlns="http://www.w3.org/2000/svg" onClick={this.plus.bind(this)}>
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path fillRule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </a>

              <Form.Row className="mt-5 d-flex justify-content-end">
                <Form.Group>
                  <a className="btn btn-secondary" data-toggle="pill" role="tab"
                     aria-controls="v-pills-home mx-2" aria-selected="false"
                     onClick={this.setstatus.bind(this, "1")}>بازگشت</a>
                  <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                     aria-controls="v-pills-messages" aria-selected="false" onClick={this.setstatus.bind(this, "3")}>مرحله
                    بعدی</a>
                </Form.Group>
                <Form.Group>
                  <RotateSpinner size={40} color="#1B998B" loading={this.state.loading}/>
                </Form.Group>
              </Form.Row>

              <Modal show={this.state.plusloading} className="text-center jaj" dir="rtl">
                <Modal.Body className='d-flex justify-content-center align-items-center'>
                  <div className='d-flex justify-content-center align-items-center' style={{height: '50vh'}}>
                    <ImpulseSpinner size={100} frontColor="#1B998B" backColor='white' loading={this.state.plusloading}/>
                  </div>
                </Modal.Body>
              </Modal>

              <Modal show={this.state.emptymodal} onHide={this.setFalse.bind(this)} className="text-right" dir="rtl">
                <Modal.Header>
                  <Modal.Title className="text-danger">خطایی رخ داده است</Modal.Title>
                </Modal.Header>
                <Modal.Body>اطلاعاتی برای ثبت وجود ندارد</Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={this.setFalse.bind(this)}>
                    بستن
                  </Button>
                </Modal.Footer>
              </Modal>

            </Form>
          </div>}

      </div>

    )
  }
}

export default Form1;
