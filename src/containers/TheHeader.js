import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CHeader, CHeaderBrand, CHeaderNav, CImg, CToggler} from '@coreui/react'

// routes config

import {TheHeaderDropdown} from './index'

const TheHeader = () => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector(state => state.sidebarShow)
    const role = localStorage.getItem('user_type');

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
    }

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
    }

    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />
            <CHeaderBrand className="mx-auto d-lg-none" to="/">
                {/*<CIcon name="logo" height="48" alt="Logo"/>*/}
                <CImg
                    src={'favicon/favicon-32x32.png'}
                    alt="Litty"
                    style={{width: 'auto', height: '48'}}
                />
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
                {/*{*/}
                {/*    role === 'admin_dicota' &&*/}
                {/*    <CHeaderNavItem className="px-3">*/}
                {/*        <CHeaderNavLink to="/generic-assets">Generic Assets</CHeaderNavLink>*/}
                {/*    </CHeaderNavItem>*/}
                {/*}*/}
                {/*{*/}
                {/*    role === 'admin_dicota' &&*/}
                {/*    <CHeaderNavItem className="px-3">*/}
                {/*        <CHeaderNavLink to="/edit-scenes">Scenes (Testing)</CHeaderNavLink>*/}
                {/*    </CHeaderNavItem>*/}
                {/*}*/}
                {/*<CHeaderNavItem className="px-3" >*/}
                {/*  <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>*/}
                {/*</CHeaderNavItem>*/}
                {/*<CHeaderNavItem  className="px-3">*/}
                {/*  <CHeaderNavLink to="/users">Users</CHeaderNavLink>*/}
                {/*</CHeaderNavItem>*/}
                {/*<CHeaderNavItem className="px-3">*/}
                {/*  <CHeaderNavLink>Settings</CHeaderNavLink>*/}
                {/*</CHeaderNavItem>*/}
            </CHeaderNav>

            <CHeaderNav className="px-3">
                <TheHeaderDropdown/>
            </CHeaderNav>
        </CHeader>
    )
}

export default TheHeader
