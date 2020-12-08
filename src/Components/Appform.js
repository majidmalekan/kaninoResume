import React, {PureComponent} from 'react';

import Form0 from "./Form0";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Side from "./Side";

import {Button, Modal} from "react-bootstrap";
import history from "./history";
import {ClapSpinner, ImpulseSpinner} from "react-spinners-kit";

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.formstatus = this.formstatus.bind(this);
    this.disstatus2 = this.disstatus2.bind(this);
    this.disstatus3 = this.disstatus3.bind(this);
    this.disstatus4 = this.disstatus4.bind(this);
  }

  state = {
    formstatus: '1',
    disstatus2: false,
    disstatus3: false,
    disstatus4: false,
    disstatus5: false,
    loginstatus: false,
    donestatus: false,
    spinner: true,
    completemodal: false,
  };

  componentDidMount() {
    if ((localStorage.getItem('apiToken') === '') && this.props.location.state === undefined) {
      this.setState({loginstatus: true});
    } else {
      const {complete} = this.props.location.state;
      if (complete) {
        this.setState({completemodal: true})
      } else {
        try {
          const {status, done} = this.props.location.state;
          this.setState({formstatus: status});
          switch (status) {
            case '2':
              this.setState({disstatus2: true});
              break;
            case '3':
              this.setState({disstatus2: true});
              this.setState({disstatus3: true});
              break;
            case '4':
              this.setState({disstatus2: true});
              this.setState({disstatus3: true});
              this.setState({disstatus4: true});
              break;
          }
        } catch {
          this.setState({loginstatus: true})
        }

      }
    }
    const apiToken = localStorage.getItem('apiToken');
    fetch('https://cv.skenap.ir/api/v1/showStatusR', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_token: apiToken,
      }),
    }).then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.stats === 'success') {
          const {complete1} = result.data.complete;
          if (complete1) {
            this.setState({completemodal: true})
          } else {
            try {
              this.setState({donestatus: result.data.done})
              this.setState({formstatus: result.data.status});
              switch (this.state.formstatus) {
                case '2':
                  this.setState({disstatus2: true});
                  break;
                case '3':
                  this.setState({disstatus2: true});
                  this.setState({disstatus3: true});
                  break;
                case '4':
                  this.setState({disstatus2: true});
                  this.setState({disstatus3: true});
                  this.setState({disstatus4: true});
                  break;
              }
            } catch {
            }
          }
          this.setState({spinner: false})
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
  }

  formstatus(status) {
    this.setState({formstatus: status})
  }

  disstatus2(status) {
    this.setState({disstatus2: status})
  }

  disstatus3(status) {
    this.setState({disstatus3: status})
  }

  disstatus4(status) {
    this.setState({disstatus4: status})
  }


  closemodal() {
    this.setState({loginstatus: false});
    history.push('./')
  }


  render() {
    return (
      <div>
        <div className='position-fixed container-fluid row w-100 p-0 m-0' style={{zIndex: '-1', height: '100%'}}>
          <div className='col-lg-7 majid' style={{backgroundColor: 'white'}}>
          </div>
          <div className='col-lg-5' style={{backgroundColor: '#3e2723'}}>
          </div>
          <div className='col-lg-7 yahya' style={{backgroundColor: 'white'}}>
          </div>
        </div>
        <div className="container-fluid body2 d-flex align-items-center justify-content-center pt-5" dir="rtl">
          <div className="row w-100 align-items-start bg-custom c-shadow ">
            <div className="col-xl-3 text-right d-flex p-0 col-lg-3 col-sm-12 position-fixing "
                 style={{zIndex: '10'}}>
              <Side status={this.formstatus} currentstatus={this.state.formstatus} disstatus2={this.state.disstatus2}
                    disstatus3={this.state.disstatus3} disstatus4={this.state.disstatus4}/>
            </div>
            <div
              className="col-xl-9 text-right p-5 col-sm-12 col-lg-9 mb-0 mt-0 d-flex align-items-stretch  body-1"
              style={{zIndex: '0'}}>
              {this.state.formstatus === '1' ?
                <Form0 status={this.formstatus} disstatus2={this.disstatus2} statusdis={this.state.disstatus2}/> :
                this.state.formstatus === '2' ?
                  <Form1 status={this.formstatus} disstatus3={this.disstatus3} statusdis={this.state.disstatus3}/> :
                  this.state.formstatus === '3' ?
                    <Form2 status={this.formstatus} disstatus4={this.disstatus4} statusdis={this.state.disstatus4}/> :
                    <Form3 status={this.formstatus} disstatus5={this.disstatus5} statusdis={this.state.disstatus5}
                           donestatus={this.state.donestatus}/>}
            </div>
          </div>
        </div>
        <Modal show={this.state.loginstatus} onHide={this.closemodal.bind(this)} className="text-right" dir="rtl">
          <Modal.Header>
            <Modal.Title className="text-danger">خطای ورود</Modal.Title>
          </Modal.Header>
          <Modal.Body>لطفا وارد شناسه کاربری خود شوید</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={this.closemodal.bind(this)}>
              ورود
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.completemodal} onHide={this.closemodal.bind(this)} className="text-right" dir="rtl">
          <Modal.Body>اطلاعات شما غیر قابل تغییر می باشند لطفا به مدیر پیام دهید</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={this.closemodal.bind(this)}>
              خانه
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.spinner} className="text-center jaj" dir="rtl">
          <Modal.Body className='d-flex justify-content-center align-items-center'>
            <div className='d-flex justify-content-center align-items-center' style={{height: '50vh'}}>
              <ImpulseSpinner size={100} frontColor="#1B998B" backColor='white' loading={this.state.spinner}/>
            </div>
          </Modal.Body>
        </Modal>
      </div>

    );

  }
}

export default App;
