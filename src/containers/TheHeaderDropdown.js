import React, {Component} from 'react'
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import firebase from 'firebase/app'
import 'firebase/auth'
import {NOTIFICATION, showNotification} from "../reusable/Utility";

class TheHeaderDropdown extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      localStorage.removeItem('uid');
      localStorage.removeItem('user_type');
      localStorage.removeItem('user_name');
    }).catch((error) => {
      showNotification(NOTIFICATION.ERROR, error.message);
    });
  };

  render() {
    return (
        <CDropdown
            inNav
            className="c-header-nav-items mx-2"
            direction="down"
        >
          <CDropdownToggle className="c-header-nav-link" caret={false}>
            <div className="c-avatar">
              <CImg
                  src={'avatars/admin-profile.jpg'}
                  className="c-avatar-img"
                  alt="Admin"
              />
            </div>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            {/*<CDropdownItem>*/}
            {/*  <CIcon name="cil-user" className="mfe-2" />Profile*/}
            {/*</CDropdownItem>*/}
            {/*<CDropdownItem>*/}
            {/*  <CIcon name="cil-settings" className="mfe-2" />*/}
            {/*  Settings*/}
            {/*</CDropdownItem>*/}
            {/*<CDropdownItem divider />*/}
            <CDropdownItem onClick={this.logout}>
              <CIcon name="cil-lock-locked" className="mfe-2" />
              Logout
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
    )
  }
}

export default TheHeaderDropdown;
