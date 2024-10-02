import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem, CImg,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import { admin_nav, creator_nav } from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <div className="c-sidebar-brand-full">
          <CImg
              src={'litty-logo.svg'}
              className="mt-2"
              alt="Litty"
              style={{ width: 'auto', height: '3rem' }}
          />
        </div>
        <div className="c-sidebar-brand-minimized">
          <CImg
              src={'favicon/favicon-32x32.png'}
              className="c-avatar-img"
              alt="L"
          />
        </div>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={localStorage.getItem('user_type') === 'admin_dicota' ? admin_nav : creator_nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
