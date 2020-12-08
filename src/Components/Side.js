import React, {PureComponent} from 'react';

class Side extends PureComponent {
  state = {
    status : '1'
  };

  setstatus(param){
    this.setState({status: param});
    this.props.status(param)
  }


  render() {
    return (
      <div className="nav nav-pills row-1 flex-column mt-3" id="v-pills-tab" role="tablist"
           aria-orientation="vertical">
        <a className={this.props.currentstatus=== '1' ? " ali  my-3 active ": 'ali  my-3 color-aw'} data-toggle="pill"
           role="tab"
           aria-controls="v-pills-home" aria-selected="true" onClick={this.setstatus.bind(this,'1')}>
          <div className="d-flex flex-row align-items-center column-1" >
            <div className="col-xl-11 col-lg-11 hamid">
              <p className='amir'>اطلاعات فردی</p>
              <p className='amin'><small>لطفا مشخصات فردی خود را به صورت کامل شرح دهید</small></p>
            </div>
            <button className=" btn rounded-circle hasan border-0 px-3 hossein d-flex align-self-start">
              <h5 style={{margin: '4px 2px'}}>۱</h5>
            </button>

          </div>
        </a>
        <div className='khat'>
        </div>
        <a className={this.props.currentstatus=== '2' ? " ali  my-3 active ":
          this.props.disstatus2 ? 'ali  my-3 color-aw':
            'ali  my-3 tab-btn-disable color-aw'} id="v-pills-profile-tab" data-toggle="pill"
           role="tab"
           aria-controls="v-pills-profile" aria-selected="false" onClick={this.props.disstatus2 ? this.setstatus.bind(this,'2') : null}>
          <div className="d-flex flex-row align-items-center column-1">
            <div className="col-xl-11 col-lg-11 hamid">
              <p className='amir'>اطلاعات و سوابق تحصیلی</p>
              <p className='amin'><small>برای نوشتن سوابق تحصیلی ، همیشه از بالاترین مدرک خود شروع به نوشتن کنید</small></p>
            </div>
            <button className="btn rounded-circle hasan border-0 px-3 hossein d-flex align-self-start">
              <h5 className='my-1'>۲</h5>
            </button>
          </div>
        </a>
        <div className='khat'>
        </div>
        <a className={this.props.currentstatus=== '3' ? " ali  my-3 active ":
          this.props.disstatus3 ? 'ali  my-3':
            'ali  my-3 tab-btn-disable'} id="v-pills-messages-tab" data-toggle="pill"
           role="tab"
           aria-controls="v-pills-messages" aria-selected="false" onClick={this.props.disstatus3 ? this.setstatus.bind(this,'3') : null}>
          <div className="d-flex flex-row align-items-center column-1">
            <div className="col-xl-11 col-lg-11 hamid">
              <p className='amir'>اطلاعات و سوابق شغلی</p>
              <p className='amin'><small>برای نوشتن سوابق شغلی ترتیب زمانی معکوس را رعایت کنید و از آخرین شغلی که داشتید یا دارید، شروع کنید</small></p>
            </div>
            <button className="btn rounded-circle hasan border-0 px-3 hossein d-flex align-self-start">
              <h5 className='my-1'>۳</h5>
            </button>
          </div>
        </a>
        <div className='khat'>
        </div>
        <a className={this.props.currentstatus=== '4' ? " ali  my-3 active ":
          this.props.disstatus4 ? 'ali  my-3':
            'ali  my-3 tab-btn-disable'} id="v-pills-messages-tab" data-toggle="pill"
           role="tab"
           aria-controls="v-pills-messages" aria-selected="false" onClick={this.props.disstatus4 ? this.setstatus.bind(this,'4') : null}>
          <div className="d-flex flex-row align-items-center column-1">
            <div className="col-xl-11 col-lg-11 hamid">
              <p className='amir'>پروژه‌ها</p>
              <p className='amin'><small>با توجه به اهمیت آگاهی از مهارت‌ها در تدوین و اعتباریابی افراد و تخصص‌ها، لطفا با دقت اطلاعات این قسمت را، تکمیل کنید</small></p>
            </div>
            <button className=" btn rounded-circle hasan border-0 px-3 hossein d-flex align-self-start">
              <h5 className='my-1'>۴</h5>
            </button>
          </div>
        </a>

      </div>
    )
  }

}

export default Side
