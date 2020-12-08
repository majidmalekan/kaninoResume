import React, {PureComponent} from 'react';

import {Button, Form, Modal, Table} from "react-bootstrap";
import {ImpulseSpinner, RotateSpinner} from "react-spinners-kit";

import history from "./history";
import {GlobalHotKeys} from "react-hotkeys";

const keyMap = {
  PREVIEW: "Enter",
};

class Form3 extends PureComponent {
  state = {
    x: [],
    xx: [],
    xxx: [],
    status: 1,
    usename: null,
    loading: false,
    done: false,
    showfourthsection1: [],
    showfourthsection2: [],
    showfourthsection3: [],
    showfourthsection4: [],
    plusloading: false,
    firstspinner: true,
    emptymodal: false
  };

  handlers = {
    PREVIEW: event => this.setstatus("5")
  };

  componentDidMount() {
    try {
      const apiToken = localStorage.getItem('apiToken');
      const userId = localStorage.getItem('userId');
      fetch('https://cv.skenap.ir/api/v1/showSectionFourthR', {
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
              showfourthsection1: result.data.arrayArticles,
              showfourthsection2: result.data.arrayExperiences,
              showfourthsection3: result.data.arrayHonors,
              showfourthsection4: result.data.arrayCourses,
              firstspinner: false,
            })
            this.setdata1()
            this.setdata2()
            this.setdata3()
            this.setdata4()

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

  senddata(param) {
    let nothing = this.state.xx.filter(z => z.status === param)
    nothing.map(z => delete z.status)
    this.setState({
      xx: nothing
    })
    const apiToken = localStorage.getItem('apiToken');
    const userId = localStorage.getItem('userId');
    fetch('https://cv.skenap.ir/api/v1/fourthSectionR', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: userId,
        api_token: apiToken,
        question: this.state.xx,
        status: param,
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

  setChange(event, param) {
    const {name, value} = event.target;
    if (this.state.usename === name) {
      this.setState({
        x: [{[name]: value, status: param + 1}]
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

  setSelect(event, param) {
    const {name, value} = event.target;
    this.setState(prev => {
      return {
        xx: [...prev.xx, {[name]: value, status: param + 1}]
      }
    });
  }

  setstatus(param) {
    if (this.props.donestatus === true) {
      this.setState({loading: true})
      this.setState({done: true})
    } else {
      if (this.props.statusdis) {
        this.setState({loading: true})
        this.setState({done: true})
      } else {
        if (param === "3") {
          this.props.status(param)
        } else {
          this.setState({loading: true})
          this.setState({done: true})
        }
      }
    }
  }

  setFalse() {
    this.setState({
      done: false,
      emptymodal: false,
    })
  }

  plus(param) {
    if (this.state.x.length !== 0) {
      this.setState({plusloading: true})
      this.setState(prev => {
        return {
          xx: [...prev.xx, this.state.x[0]]
        }
      });
      setTimeout(() => {
        this.senddata(param)
      }, 500)
    }
    else{
      this.setState({
        emptymodal: true,
      })
    }
  }

  setdata1() {
    let values = Object.values(this.state.showfourthsection1);
    for (let z2 = 0; z2 < this.state.showfourthsection1.length; z2++) {
      let key = Object.keys(values[z2]);
      let value = Object.values(values[z2])

      for (let z1 = 0; z1 < key.length; z1++) {
        try {
          if (value[z1] !== undefined) {
            document.getElementById(key[z1] + this.state.showfourthsection1[z2].article_id).innerHTML = value[z1]
          }
        } catch (error) {
        }
      }
    }
  }

  setdata2() {
    let values = Object.values(this.state.showfourthsection2);
    for (let z2 = 0; z2 < this.state.showfourthsection2.length; z2++) {
      let key = Object.keys(values[z2]);
      let value = Object.values(values[z2])

      for (let z1 = 0; z1 < key.length; z1++) {
        try {
          if (value[z1] !== undefined) {
            document.getElementById(key[z1] + this.state.showfourthsection2[z2].experience_id).innerHTML = value[z1]
          }
        } catch (error) {
        }
      }
    }
  }

  setdata3() {
    let values = Object.values(this.state.showfourthsection3);
    for (let z2 = 0; z2 < this.state.showfourthsection3.length; z2++) {
      let key = Object.keys(values[z2]);
      let value = Object.values(values[z2])

      for (let z1 = 0; z1 < key.length; z1++) {
        try {
          if (value[z1] !== undefined) {
            document.getElementById(key[z1] + this.state.showfourthsection3[z2].honor_id).innerHTML = value[z1]
          }
        } catch (error) {
        }
      }
    }
  }

  setdata4() {

    let values = Object.values(this.state.showfourthsection4);
    for (let z2 = 0; z2 < this.state.showfourthsection4.length; z2++) {
      let key = Object.keys(values[z2]);
      let value = Object.values(values[z2])

      for (let z1 = 0; z1 < key.length; z1++) {
        try {
          if (value[z1] !== undefined) {
            document.getElementById(key[z1] + this.state.showfourthsection4[z2].course_id).innerHTML = value[z1]
          }
        } catch (error) {
        }
      }
    }
  }

  edit(id, param) {
    this.setState({
      edit_id: id,
      edit_pos: param,
      xx: []
    })
    setTimeout(() => {
      this.seteditdata(id, param)
    }, 10)
  }

  seteditdata(id, param) {
    let ooo = []
    let xq = ''
    switch (param) {
      case(1):
        ooo = this.state.showfourthsection1
        break;
      case(2):
        ooo = this.state.showfourthsection2
        break;
      case(3):
        ooo = this.state.showfourthsection3
        break;
      case(4):
        ooo = this.state.showfourthsection4
        break;
    }
    let values = Object.values(ooo);
    for (let z3 = 0; z3 < ooo.length; z3++) {
      let key = Object.keys(values[z3]);
      let value = Object.values(values[z3])
      switch (param) {
        case(1):
          xq = this.state.showfourthsection1[z3].article_id
          break;
        case(2):
          xq = this.state.showfourthsection2[z3].experience_id
          break;
        case(3):
          xq = this.state.showfourthsection3[z3].honor_id
          break;
        case(4):
          xq = this.state.showfourthsection4[z3].course_id
          break;
      }
      if (xq === id) {
        for (let z4 = 0; z4 < key.length; z4++) {
          try {
            if (value[z4] !== undefined) {
              document.getElementById(key[z4] + xq).defaultValue = value[z4]
            }
            document.getElementById('سطح مهارت' + xq).value = value[key.indexOf('سطح مهارت')]
          } catch (error) {
          }
        }
      }
    }
  }

  sendsavedata(id,param) {
    let nothing = this.state.xx.filter(z => z.status === param)
    nothing.map(z => delete z.status)
    this.setState({
      xx: nothing
    })
    const apiToken = localStorage.getItem('apiToken');
    const userId = localStorage.getItem('userId');
    fetch('https://cv.skenap.ir/api/v1/editFourthSection', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        api_token: apiToken,
        user_id: userId,
        question: this.state.xx,
        skill_id: id,
        status: param,
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

  save(id, param) {
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
        this.sendsavedata(id,param)

      } else {
        this.setState({
          emptymodal: true,
        })
      }
    }, 400)
  }

  getdatas() {
    try {
      const apiToken = localStorage.getItem('apiToken');
      const userId = localStorage.getItem('userId');
      fetch('https://cv.skenap.ir/api/v1/showSectionFourthR', {
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
              showfourthsection1: result.data.arrayArticles,
              showfourthsection2: result.data.arrayExperiences,
              showfourthsection3: result.data.arrayHonors,
              showfourthsection4: result.data.arrayCourses,
              plusloading: false,
            })
            this.setdata1()
            this.setdata2()
            this.setdata3()
            this.setdata4()

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

  render() {
    const items = []
    const items1 = []
    const items2 = []
    const items3 = []

    for (let index = 0; index < this.state.showfourthsection1.length; index++) {
      items.push(
        <Form className="my-5 text-right w-100">
          <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
            <div className='card-body'>
              <Form.Row>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>نوع اثر:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection1[index].article_id
                      ? <Form.Control type="text" name="نوع اثر"
                                      id={'نوع اثر' + this.state.showfourthsection1[index].article_id}
                                      onChange={(e) => {
                                        this.setChange(e, 0)
                                      }
                                      }/>
                      : <p name="نوع اثر" id={'نوع اثر' + this.state.showfourthsection1[index].article_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>عنوان تحقیق یا مقاله:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection1[index].article_id
                      ? <Form.Control type="text" name="عنوان تحقیق یا مقاله"
                                      id={'عنوان تحقیق یا مقاله' + this.state.showfourthsection1[index].article_id}
                                      onChange={(e) => {
                                        this.setChange(e, 0)
                                      }}/>
                      : <p name="عنوان تحقیق یا مقاله" id={'عنوان تحقیق یا مقاله' + this.state.showfourthsection1[index].article_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>ناشر:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection1[index].article_id
                      ? <Form.Control type="text" name="ناشر"
                                      id={'ناشر' + this.state.showfourthsection1[index].article_id}
                                      onChange={(e) => {
                                        this.setChange(e, 0)
                                      }}/>
                      : <p name="ناشر" id={'ناشر' + this.state.showfourthsection1[index].article_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>لینک مرتبط:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection1[index].article_id
                      ? <Form.Control type="text" name="لینک مرتبط"
                                      id={'لینک مرتبط' + this.state.showfourthsection1[index].article_id}
                                      onChange={(e) => {
                                        this.setChange(e, 0)
                                      }}/>
                      : <p name="لینک مرتبط" id={'لینک مرتبط' + this.state.showfourthsection1[index].article_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>تاریخ (ماه و سال):</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection1[index].article_id
                      ? <Form.Control type="text" name="تاریخ (ماه و سال)"
                                      id={'تاریخ (ماه و سال)' + this.state.showfourthsection1[index].article_id}
                                      onChange={(e) => {
                                        this.setChange(e, 0)
                                      }}/>
                      : <p name="تاریخ (ماه و سال)"
                           id={'تاریخ (ماه و سال)' + this.state.showfourthsection1[index].article_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-12 col-lg-12 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>توضیح تحقیق یا مقاله:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection1[index].article_id
                      ? <textarea className="form-control " name="توضیح تحقیق یا مقاله"
                                  id={'توضیح تحقیق یا مقاله' + this.state.showfourthsection1[index].article_id}
                                  onChange={(e) => {
                                    this.setChange(e, 0)
                                  }}/>
                      : <p name="توضیح تحقیق یا مقاله"
                           id={'توضیح تحقیق یا مقاله' + this.state.showfourthsection1[index].article_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3 d-flex justify-content-end">
                <Form.Group>
                  {this.state.edit_id === this.state.showfourthsection1[index].article_id
                    ?
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.save.bind(this, this.state.showfourthsection1[index].article_id, 1)}>ذخیره اطلاعات
                    </a>
                    :
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.edit.bind(this, this.state.showfourthsection1[index].article_id, 1)}>ویرایش
                    </a>}
                </Form.Group>
              </Form.Row>
            </div>
          </div>
        </Form>
      )
    }
    for (let index1 = 0; index1 < this.state.showfourthsection2.length; index1++) {
      items1.push(
        <Form className="my-5 text-right w-100">
          <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
            <div className='card-body'>
              <Form.Row>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>نام مهارت:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection2[index1].experience_id
                      ? <Form.Control type="text" name="نام مهارت"
                                      id={'نام مهارت' + this.state.showfourthsection2[index1].experience_id}
                                      onChange={(e) => {
                                        this.setChange(e, 1)
                                      }
                                      }/>
                      : <p name="نام مهارت" id={'نام مهارت' + this.state.showfourthsection2[index1].experience_id}/>}
                  </div>
                </Form.Group>

                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>سطح مهارت:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection2[index1].experience_id
                      ?
                      <Form.Control as='select' className='ehsan' name="سطح مهارت"
                                    id={'سطح مهارت' + this.state.showfourthsection2[index1].experience_id}
                                    onChange={(e) => {
                                      this.setSelect(e, 1)
                                    }
                                    }>
                        <option value="">انتخاب</option>
                        <option>مقدماتی</option>
                        <option>متوسط</option>
                        <option>عالی</option>
                      </Form.Control>
                      : <p name="سطح مهارت" id={'سطح مهارت' + this.state.showfourthsection2[index1].experience_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-12 col-lg-12 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>توضیح مهارت:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection2[index1].experience_id
                      ? <textarea className="form-control " name="توضیح مهارت"
                                  id={'توضیح مهارت' + this.state.showfourthsection2[index1].experience_id}
                                  onChange={(e) => {
                                    this.setChange(e, 1)
                                  }
                                  }/>
                      :
                      <p name="توضیح مهارت" id={'توضیح مهارت' + this.state.showfourthsection2[index1].experience_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3 d-flex justify-content-end">
                <Form.Group>
                  {this.state.edit_id === this.state.showfourthsection2[index1].experience_id
                    ?
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.save.bind(this, this.state.showfourthsection2[index1].experience_id, 2)}>ذخیره
                      اطلاعات
                    </a>
                    :
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.edit.bind(this, this.state.showfourthsection2[index1].experience_id, 2)}>ویرایش
                    </a>}
                </Form.Group>
              </Form.Row>
            </div>
          </div>
        </Form>
      )
    }
    for (let index2 = 0; index2 < this.state.showfourthsection3.length; index2++) {
      items2.push(
        <Form className="my-5 text-right w-100">
          <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
            <div className='card-body'>
              <Form.Row>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>عنوان افتخار:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection3[index2].honor_id
                      ? <Form.Control type="text" name="عنوان افتخار"
                                      id={'عنوان افتخار' + this.state.showfourthsection3[index2].honor_id}
                                      onChange={(e) => {
                                        this.setChange(e, 2)
                                      }
                                      }/>
                      : <p name="عنوان افتخار" id={'عنوان افتخار' + this.state.showfourthsection3[index2].honor_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-4 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>تاریخ:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection3[index2].honor_id
                      ? <Form.Control type="text" name="تاریخ"
                                      id={'تاریخ' + this.state.showfourthsection3[index2].honor_id}
                                      onChange={(e) => {
                                        this.setChange(e, 2)
                                      }
                                      }/>
                      : <p name="تاریخ" id={'تاریخ' + this.state.showfourthsection3[index2].honor_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-12 col-lg-12 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>توضیح افتخار:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection3[index2].honor_id
                      ? <textarea className="form-control " name="توضیح افتخار"
                                  id={'توضیح افتخار' + this.state.showfourthsection3[index2].honor_id}
                                  onChange={(e) => {
                                    this.setChange(e, 2)
                                  }
                                  }/>
                      : <p name="توضیح افتخار" id={'توضیح افتخار' + this.state.showfourthsection3[index2].honor_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3 d-flex justify-content-end">
                <Form.Group>
                  {this.state.edit_id === this.state.showfourthsection3[index2].honor_id
                    ?
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.save.bind(this, this.state.showfourthsection3[index2].honor_id, 3)}>ذخیره اطلاعات
                    </a>
                    :
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.edit.bind(this, this.state.showfourthsection3[index2].honor_id, 3)}>ویرایش
                    </a>}
                </Form.Group>
              </Form.Row>
            </div>
          </div>
        </Form>
      )
    }
    for (let index3 = 0; index3 < this.state.showfourthsection4.length; index3++) {
      items3.push(
        <Form className="my-5 text-right w-100">
          <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
            <div className='card-body'>
              <Form.Row>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>نوع گواهینامه:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection4[index3].course_id
                      ? <Form.Control type="text" name="نوع گواهینامه"
                                      id={'نوع گواهینامه' + this.state.showfourthsection4[index3].course_id}
                                      onChange={(e) => {
                                        this.setChange(e, 3)
                                      }
                                      }/>
                      : <p name="نوع گواهینامه" id={'نوع گواهینامه' + this.state.showfourthsection4[index3].course_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>عنوان گواهینامه:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection4[index3].course_id
                      ? <Form.Control type="text" name="عنوان گواهینامه"
                                      id={'عنوان گواهینامه' + this.state.showfourthsection4[index3].course_id}
                                      onChange={(e) => {
                                        this.setChange(e, 3)
                                      }
                                      }/>
                      : <p name="عنوان گواهینامه" id={'عنوان گواهینامه' + this.state.showfourthsection4[index3].course_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>موسسه:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection4[index3].course_id
                      ? <Form.Control type="text" name="موسسه"
                                      id={'موسسه' + this.state.showfourthsection4[index3].course_id}
                                      onChange={(e) => {
                                        this.setChange(e, 3)
                                      }
                                      }/>
                      : <p name="موسسه" id={'موسسه' + this.state.showfourthsection4[index3].course_id}/>}
                  </div>
                </Form.Group>
                <Form.Group className='col-xl-3 col-lg-6 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>تاریخ گواهینامه(ماه و سال):</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection4[index3].course_id
                      ? <Form.Control type="text" name="تاریخ گواهینامه(ماه و سال)"
                                      id={'تاریخ گواهینامه(ماه و سال)' + this.state.showfourthsection4[index3].course_id}
                                      onChange={(e) => {
                                        this.setChange(e, 3)
                                      }
                                      }/>
                      : <p name="تاریخ گواهینامه(ماه و سال)"
                           id={'تاریخ گواهینامه(ماه و سال)' + this.state.showfourthsection4[index3].course_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group className='col-xl-12 col-lg-12 col-12'>
                  <div className="col-xl-12 col-lg-12 col-12">
                    <Form.Label>توضیح گواهینامه:</Form.Label>
                    {this.state.edit_id === this.state.showfourthsection4[index3].course_id
                      ? <textarea className="form-control " name="توضیح گواهینامه"
                                  id={'توضیح گواهینامه' + this.state.showfourthsection4[index3].course_id}
                                  onChange={(e) => {
                                    this.setChange(e, 3)
                                  }
                                  }/>
                      : <p name="توضیح گواهینامه"
                           id={'توضیح گواهینامه' + this.state.showfourthsection4[index3].course_id}/>}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3 d-flex justify-content-end">
                <Form.Group>
                  {this.state.edit_id === this.state.showfourthsection4[index3].course_id
                    ?
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.save.bind(this, this.state.showfourthsection4[index3].course_id, 4)}>ذخیره اطلاعات
                    </a>
                    :
                    <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                       aria-controls="v-pills-messages" aria-selected="false"
                       onClick={this.edit.bind(this, this.state.showfourthsection4[index3].course_id, 4)}>ویرایش
                    </a>}
                </Form.Group>
              </Form.Row>
            </div>
          </div>
        </Form>
      )
    }
    return (
      <div className='w-100'>
        {this.state.firstspinner ?
          <div className='d-flex justify-content-center align-items-center' style={{height: '80vh'}}>
            <ImpulseSpinner size={85} frontColor="#1B998B" loading={this.state.firstspinner}/>
          </div> :
          <div>
            <GlobalHotKeys keyMap={keyMap} handlers={this.handlers}/>
            <Form className="text-right">
              <h5 className='my-3 mr-2'>تحقیقات و مقالات: </h5>
              {items}
              <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
                <div className='card-body'>
                  <Form.Row>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>نوع اثر:</Form.Label>
                        <Form.Control type="text" name="نوع اثر" id="نوع اثر" onChange={(e) => {
                          this.setChange(e, 0)
                        }}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>عنوان تحقیق یا مقاله:</Form.Label>
                        <Form.Control className="" type="text" name="عنوان تحقیق یا مقاله" id="عنوان تحقیق یا مقاله" onChange={(e) => {
                          this.setChange(e, 0)
                        }}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>ناشر:</Form.Label>
                        <Form.Control type="text" name="ناشر" id="ناشر" onChange={(e) => {
                          this.setChange(e, 0)
                        }}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>لینک مرتبط:</Form.Label>
                        <Form.Control type="text" name="لینک مرتبط" id="لینک مرتبط" onChange={(e) => {
                          this.setChange(e, 0)
                        }}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>تاریخ (ماه و سال):</Form.Label>
                        <Form.Control type="text" name="تاریخ (ماه و سال)" id="تاریخ (ماه و سال)" onChange={(e) => {
                          this.setChange(e, 0)
                        }}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-12 col-lg-12 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>توضیح تحقیق یا مقاله:</Form.Label>
                        <textarea className="form-control " name="توضیح تحقیق یا مقاله" id="توضیح تحقیق یا مقاله"
                                  onChange={(e) => {
                                    this.setChange(e, 0)
                                  }}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              </div>

              <a>
                <svg width="45px" height="45px" viewBox="0 0 16 16"
                     className="bi bi-plus-circle d-block mx-auto plus-icon my-3" fill="#51A3A3"
                     xmlns="http://www.w3.org/2000/svg" onClick={this.plus.bind(this, 1)}>
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path fillRule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </a>

              <h5 className='my-3 mr-2'>مهارت های تجربی: </h5>
              {items1}
              <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
                <div className='card-body'>
                  <Form.Row>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>نام مهارت:</Form.Label>
                        <Form.Control type="text" name="نام مهارت" id="نام مهارت" onChange={(e) => {
                          this.setChange(e, 1)
                        }}/>
                      </div>
                    </Form.Group>

                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>سطح مهارت:</Form.Label>
                        <Form.Control as='select' className='ehsan' name="سطح مهارت" id="سطح مهارت" onChange={(e) => {
                          this.setSelect(e, 1)
                        }}>
                          <option value="">انتخاب</option>
                          <option>مقدماتی</option>
                          <option>متوسط</option>
                          <option>عالی</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-12 col-lg-12 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>توضیح مهارت:</Form.Label>
                        <textarea className="form-control " name="توضیح مهارت" id="توضیح مهارت" onChange={(e) => {
                          this.setChange(e, 1)
                        }}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              </div>


              <a>
                <svg width="45px" height="45px" viewBox="0 0 16 16"
                     className="bi bi-plus-circle d-block mx-auto plus-icon my-3" fill="#51A3A3"
                     xmlns="http://www.w3.org/2000/svg" onClick={this.plus.bind(this, 2)}>
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path fillRule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </a>

              <h5 className='my-3 mr-2'>افتخارات: </h5>
              {items2}
              <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
                <div className='card-body'>
                  <Form.Row>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>عنوان افتخار:</Form.Label>
                        <Form.Control type="text" name="عنوان افتخار" id="عنوان افتخار" onChange={(e) => {
                          this.setChange(e, 2)
                        }}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-4 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>تاریخ:</Form.Label>
                        <Form.Control className="" type="text" name="تاریخ" id="تاریخ" onChange={(e) => {
                          this.setChange(e, 2)
                        }}
                        />
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-12 col-lg-12 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>توضیح افتخار:</Form.Label>
                        <textarea className="form-control " name="توضیح افتخار" id="توضیح افتخار" onChange={(e) => {
                          this.setChange(e, 2)
                        }}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              </div>

              <a>
                <svg width="45px" height="45px" viewBox="0 0 16 16"
                     className="bi bi-plus-circle d-block mx-auto plus-icon my-3" fill="#51A3A3"
                     xmlns="http://www.w3.org/2000/svg" onClick={this.plus.bind(this, 3)}>
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path fillRule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </a>

              <h5 className='my-3 mr-2'>دوره ها و گواهینامه ها: </h5>
              {items3}
              <div className='card' style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.075)'}}>
                <div className='card-body'>
                  <Form.Row>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>نوع گواهینامه:</Form.Label>
                        <Form.Control type="text" name="نوع گواهینامه" id="نوع گواهینامه" onChange={(e) => {
                          this.setChange(e, 3)
                        }}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>عنوان گواهینامه:</Form.Label>
                        <Form.Control className="" type="text" name="عنوان گواهینامه" id="عنوان گواهینامه" onChange={(e) => {
                          this.setChange(e, 3)
                        }}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>موسسه:</Form.Label>
                        <Form.Control type="text" name="موسسه" id="موسسه" onChange={(e) => {
                          this.setChange(e, 3)
                        }}/>
                      </div>
                    </Form.Group>
                    <Form.Group className='col-xl-3 col-lg-6 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>تاریخ گواهینامه(ماه و سال):</Form.Label>
                        <Form.Control type="text" name="تاریخ گواهینامه(ماه و سال)" id="تاریخ گواهینامه(ماه و سال)" onChange={(e) => {
                          this.setChange(e, 3)
                        }}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group className='col-xl-12 col-lg-12 col-12'>
                      <div className="col-xl-12 col-lg-12 col-12">
                        <Form.Label>توضیح گواهینامه:</Form.Label>
                        <textarea className="form-control " name="توضیح گواهینامه" id="توضیح گواهینامه"
                                  onChange={(e) => {
                                    this.setChange(e, 3)
                                  }}/>
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              </div>

              <a>
                <svg width="45px" height="45px" viewBox="0 0 16 16"
                     className="bi bi-plus-circle d-block mx-auto plus-icon my-3" fill="#51A3A3"
                     xmlns="http://www.w3.org/2000/svg" onClick={this.plus.bind(this, 4)}>
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path fillRule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </a>

              <Form.Row className="mt-5 d-flex justify-content-end">
                <Form.Group>
                  <a className="btn btn-secondary" data-toggle="pill" role="tab"
                     aria-controls="v-pills-home mx-2" aria-selected="false"
                     onClick={this.setstatus.bind(this, "3")}>بازگشت</a>
                  <a className="btn btn-info mx-2 btn-custom" data-toggle="pill" role="tab"
                     aria-controls="v-pills-messages" aria-selected="false" onClick={this.setstatus.bind(this, "5")}>ثبت
                    نهایی</a>
                </Form.Group>
                <Form.Group>
                  <RotateSpinner size={40} color="#1B998B" loading={this.state.loading}/>
                </Form.Group>
              </Form.Row>
            </Form>
            <Modal show={this.state.done} onHide={this.setFalse.bind(this)} className='text-right' dir="rtl">
              <Modal.Header>
                <Modal.Title className="text-success">ثبت اطلاعات</Modal.Title>
              </Modal.Header>
              <Modal.Body>اطلاعات شما با موفقیت ثبت شد.</Modal.Body>
              <Modal.Footer>
                <a className='btn btn-info' href='http://kanino.ir' >
                  خانه
                </a>
              </Modal.Footer>
            </Modal>

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

          </div>}
      </div>);
  }
}

export default Form3;
