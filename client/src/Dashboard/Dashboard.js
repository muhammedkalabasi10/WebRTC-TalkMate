import React, { useEffect, useContext } from 'react';
import logo from '../resources/logo.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from './components/DashboardInformation/DashboardInformation';
import { callStates } from '../store/actions/callActions';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
import GroupCall from './components/GroupCall/GroupCall';
import AuthContext from '../utils/auth/AuthContext';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import { setUsername } from '../store/actions/dashboardActions';

import './Dashboard.css';

const Dashboard = ({ username, callState, saveUsername, remoteStream }) => {
  const {user, logout}=useContext(AuthContext)
  useEffect(async() => {
    await user && saveUsername(user.user.name+" "+user.user.surName)
    await user && registerNewUser(user.user.name+" "+user.user.surName)
    console.log("dashboard useeffect")
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);

  const logoutfunc=()=>{
    logout();
    webRTCHandler.hangUp();
  }

  return (
    <div className='dashboard_container background_main_color'>
      <div className='dashboard_left_section'>
      <button type="button" style={{width:"10%", marginTop:"1rem",marginLeft:"1rem"}} class="btn btn-primary" onClick={logoutfunc} >Logout</button>
        <div className='dashboard_content_container'>
          <DirectCall />
          <GroupCall />
          {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />}
        </div>
        <div className='dashboard_rooms_container background_secondary_color'>
          <GroupCallRoomsList />
          
        </div>
        
      </div>
      <div className='dashboard_right_section background_secondary_color'>
        <div className='dashboard_active_users_list'>
          <ActiveUsersList />
        </div>
        <div className='dashboard_logo_container'>
          <img className='dashboard_logo_image' src={logo} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username =>{console.log("saveusernameye girdi"); dispatch(setUsername(username));}
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);