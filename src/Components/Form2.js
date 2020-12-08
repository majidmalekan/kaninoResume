import React, {PureComponent} from 'react';

import {Button, Form, Modal, Table} from "react-bootstrap";
import {ImpulseSpinner, RotateSpinner} from "react-spinners-kit";
import {GlobalHotKeys} from "react-hotkeys";

const keyMap = {
  PREVIEW: "Enter",
};

class Form2 extends PureComponent {
  state = {
    filemodal: false,
    x: [],
    xx: [],
    usename: null,
    loading: false,
    showthirdsection: [],
    plusloading: false,
    firstspinner: true,
    num: 0,
  };

  handlers = {
    PREVIEW: event => this.setstatus("4")
  };

  componentDidMount() {
    try {
      const apiToken = localStorage.getItem('apiToken');
      const userId = localStorage.getItem('userId');
      fetch('https://cv.skenap.ir/api/v1/showSectionThirdR', {
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
                showthirdsection: result.data,
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
          }
        )

        .catch(
          (
            err
          ) => {
            // alert(err);
          }
        )
      ;
    } catch
      (alert) {
    }
  }

  senddata() {
    this.setState(prev => {
      return {
        xx: [...prev.xx, this.state.x[0]]
      }
    });
    const apiToken = localStorage.getItem('apiToken');
    const userId = localStorage.getItem('userId');
    fetch('https://cv.skenap.ir/api/v1/thirdSectionR', {
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
          this.setnull()
          this.getdatas()
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
    })
    this.setState({
      xx: [],
      x: []
    })
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

  setstatus(param) {
    if (this.props.statusdis) {
      this.props.status(param);
    } else {
      if (param === "2") {
        this.props.status(param)
      } else {
        this.setState({loading: true})
        setTimeout(() => {
          if (param === "4") {
            this.props.disstatus4(true);
          }
          this.props.status(param);
        }, 1000)
      }
    }
  }

  getdatas() {
    try {
      const apiToken = localStorage.getItem('apiToken');
      const userId = localStorage.getItem('userId');
      fetch('https://cv.skenap.ir/api/v1/showSectionThirdR', {
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
              showthirdsection: result.data,
              plusloading: false,
            })
            if (result.data[0].length !== 0) {
              this.setState({num: result.data.length})
            }
            setTimeout(() => {
              this.setdata()
              this.setState({})
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

  setFalse() {
    this.setState({
      emptymodal: false,
    })
  }

  setdata() {
    let values = Object.values(this.state.showthirdsection);
    for (let z2 = 0; z2 < this.state.showthirdsection.length; z2++) {
      let value = Object.values(values[z2])
      let key = Object.keys(values[z2]);
      for (let z1 = 0; z1 < key.length; z1++) {
        try {
          if (value[z1] !== undefined) {
            document.getElementById(key[z1] + this.state.showthirdsection[z2].job_id).innerHTML = value[z1]
          }
        } catch (error) {
        }
      }
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
    let values = Object.values(this.state.showthirdsection);

    for (let z3 = 0; z3 < this.state.showthirdsection.length; z3++) {
      let key = Object.keys(values[z3]);
      let value = Object.values(values[z3])
      if (this.state.showthirdsection[z3].job_id === id) {
        for (let z4 = 0; z4 < key.length; z4++) {
          try {
            if (value[z4] !== undefined) {
              document.getElementById(key[z4] + this.state.showthirdsection[z3].job_id).defaultValue = value[z4]
            }
            document.getElementById("مرکز اشتغال" + this.state.showthirdsection[z3].job_id).value = value[key.indexOf("مرکز اشتغال")]
            document.getElementById("نحوه همکاری" + this.state.showthirdsection[z3].job_id).value = value[key.indexOf("نحوه همکاری")]

          } catch (error) {
          }
        }
      }
    }
  }

  sendsavedata(id) {
    const apiToken = localStorage.getItem('apiToken');
    const userId = localStorage.getItem('userId');
    fetch('https://cv.skenap.ir/api/v1/editThirdSection', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        api_token: apiToken,
        user_id: userId,
        question: this.state.xx,
        job_id: id
      }),
    }).then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.stats === 'success') {
          this.setState({
            edit_id: null,
          })
          this.setnull()
          this.getdatas()
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

  render() {
    const items = []
    for (let index = 0; index < this.state.num; index++) {
      items.push(
        <Form className="my-5 text-right w-100">
          <div className='card pt-2' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
            <div className='card-body'>
              <Form.Row>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>سمت شغلی:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ? <Form.Control type="text" name="سمت شغلی"
                                      id={'سمت شغلی' + this.state.showthirdsection[index].job_id}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="سمت شغلی" id={'سمت شغلی' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>مرکز اشتغال:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ?
                      <Form.Control as='select' className='ehsan' name="مرکز اشتغال"
                                    id={'مرکز اشتغال' + this.state.showthirdsection[index].job_id}
                                    onChange={this.setSelect.bind(this)}>
                        <option value="">انتخاب</option>
                        <option>موسسه</option>
                        <option>شرکت</option>
                        <option>سازمان</option>
                        <option>خود اشتغال</option>
                        <option>فریلسنر</option>
                        <option>بیمارستان</option>
                        <option>بنیاد</option>
                        <option>دانشگاه</option>
                        <option>مدرسه</option>
                        <option>فروشگاه</option>
                        <option>کارخانه</option>
                        <option>اموزشگاه</option>
                        <option>کارگاه</option>
                      </Form.Control>
                      : <p name="مرکز اشتغال" id={'مرکز اشتغال' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>نام مرکز:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ? <Form.Control type="text" name="نام مرکز"
                                      id={'نام مرکز' + this.state.showthirdsection[index].job_id}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="نام مرکز" id={'نام مرکز' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>

              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>مدت همکاری:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ? <Form.Control type="text" name="مدت همکاری"
                                      id={'مدت همکاری' + this.state.showthirdsection[index].job_id}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="مدت همکاری" id={'مدت همکاری' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>نحوه همکاری:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ?
                      <Form.Control as='select' className='ehsan' name="نحوه همکاری"
                                    id={"نحوه همکاری" + this.state.showthirdsection[index].job_id}
                                    onChange={this.setSelect.bind(this)}>
                        <option value="">انتخاب</option>
                        <option>تمام وقت</option>
                        <option>پاره وقت</option>
                        <option>پروژه ای</option>
                        <option>ساعتی</option>
                        <option>کاراموزی</option>
                        <option>دورکاری</option>
                      </Form.Control>
                      : <p name="نحوه همکاری" id={'نحوه همکاری' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>

              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>کشور یا شهر محل کار:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ? <Form.Control type="text" name="کشور یا شهر محل کار"
                                      id={'کشور یا شهر محل کار' + this.state.showthirdsection[index].job_id}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="کشور یا شهر محل کار"
                           id={'کشور یا شهر محل کار' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>تاریخ شروع همکاری:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ? <Form.Control type="text" name="تاریخ شروع همکاری"
                                      id={'تاریخ شروع همکاری' + this.state.showthirdsection[index].job_id}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="تاریخ شروع همکاری"
                           id={'تاریخ شروع همکاری' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>تاریخ اتمام همکاری:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ? <Form.Control type="text" name="تاریخ اتمام همکاری"
                                      id={'تاریخ اتمام همکاری' + this.state.showthirdsection[index].job_id}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="تاریخ اتمام همکاری"
                           id={'تاریخ اتمام همکاری' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-12 col-lg-12 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>شرح مختصر همکاری:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ? <Form.Control type="text" name="شرح مختصر همکاری"
                                      id={'شرح مختصر همکاری' + this.state.showthirdsection[index].job_id}
                                      onChange={this.setChange.bind(this)}/>
                      :
                      <p name="شرح مختصر همکاری" id={'شرح مختصر همکاری' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-12 col-lg-12 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>خلاصه وظایف:</Form.Label>
                    {this.state.edit_id === this.state.showthirdsection[index].job_id
                      ? <Form.Control type="text" name="خلاصه وظایف"
                                      id={'خلاصه وظایف' + this.state.showthirdsection[index].job_id}
                                      onChange={this.setChange.bind(this)}/>
                      : <p name="خلاصه وظایف" id={'خلاصه وظایف' + this.state.showthirdsection[index].job_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3 d-flex justify-content-end">
                <Form.Group>
                  {this.state.edit_id === this.state.showthirdsection[index].job_id
                    ?
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.save.bind(this, this.state.showthirdsection[index].job_id)}>ذخیره اطلاعات
                    </a>
                    :
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.edit.bind(this, this.state.showthirdsection[index].job_id)}>ویرایش
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
            {items}
            <Form className="text-right w-100">
              <div className='card py-3' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
                <div className='card-body'>
                  <Form.Row>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>سمت شغلی:</Form.Label>
                        <Form.Control type="text" name="سمت شغلی" id="سمت شغلی" onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>مرکز اشتغال:</Form.Label>
                        <Form.Control as='select' className='ehsan' name="مرکز اشتغال" id="مرکز اشتغال"
                                      onChange={this.setSelect.bind(this)}>
                          <option value="">انتخاب</option>
                          <option>موسسه</option>
                          <option>شرکت</option>
                          <option>سازمان</option>
                          <option>خود اشتغال</option>
                          <option>فریلسنر</option>
                          <option>بیمارستان</option>
                          <option>بنیاد</option>
                          <option>دانشگاه</option>
                          <option>مدرسه</option>
                          <option>فروشگاه</option>
                          <option>کارخانه</option>
                          <option>اموزشگاه</option>
                          <option>کارگاه</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>نام مرکز:</Form.Label>
                        <Form.Control type="text" name="نام مرکز" id="نام مرکز" onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>

                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>مدت همکاری:</Form.Label>
                        <Form.Control type="text" name="مدت همکاری" id="مدت همکاری"
                                      onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>نحوه همکاری:</Form.Label>
                        <Form.Control as='select' className='ehsan' name="نحوه همکاری" id="نحوه همکاری"
                                      onChange={this.setSelect.bind(this)}>
                          <option value="">انتخاب</option>
                          <option>تمام وقت</option>
                          <option>پاره وقت</option>
                          <option>پروژه ای</option>
                          <option>ساعتی</option>
                          <option>کاراموزی</option>
                          <option>دورکاری</option>
                        </Form.Control>
                      </div>
                    </Form.Group>

                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>کشور یا شهر محل کار:</Form.Label>
                        <Form.Control type="text" name="کشور یا شهر محل کار" id="کشور یا شهر محل کار"
                                      onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>تاریخ شروع همکاری:</Form.Label>
                        <Form.Control type="text" name="تاریخ شروع همکاری" id="تاریخ شروع همکاری"
                                      onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>تاریخ اتمام همکاری:</Form.Label>
                        <Form.Control type="text" name="تاریخ اتمام همکاری" id="تاریخ اتمام همکاری"
                                      onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-12 col-lg-12 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>شرح مختصر همکاری:</Form.Label>
                        <textarea className="form-control " name="شرح مختصر همکاری" id="شرح مختصر همکاری"
                                  onChange={this.setChange.bind(this)}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-12 col-lg-12 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>خلاصه وظایف:</Form.Label>
                        <textarea className="form-control " name="خلاصه وظایف" id="خلاصه وظایف"
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
                     onClick={this.setstatus.bind(this, "2")}>بازگشت</a>
                  <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                     aria-controls="v-pills-messages" aria-selected="false" onClick={this.setstatus.bind(this, "4")}>مرحله
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
    );
  }
}

export default Form2;
