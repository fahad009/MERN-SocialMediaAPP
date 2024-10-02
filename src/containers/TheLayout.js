import React from 'react'
import {
    TheContent,
    TheSidebar,
    TheFooter,
    TheHeader
} from './index'
import config from "../reusable/config";

const TheLayout = () => {

    const {ENV} = config;
    return (
        <div className="c-app c-default-layout">
            <TheSidebar/>
            <div className="c-wrapper">
                {
                    ENV === 'TEST' ?
                        <div className="bg-warning text-white text-center">
                            <h6 className="my-2">
                                You're using testing version of Litty CMS. Click <a className="text-danger"
                                                                                    href="https://litty-api.web.app/#/">here</a> to
                                go to live version.
                            </h6>
                        </div> : ''
                }
                <TheHeader/>
                <div className="c-body">
                    <TheContent/>
                </div>
                <TheFooter/>
            </div>
        </div>
    )
}

export default TheLayout
