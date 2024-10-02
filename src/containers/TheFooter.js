import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://littyapp.com/" target="_blank" rel="noopener noreferrer">Litty</a>
        <span className="ml-1"> - Experience Stories Like Never Before</span>
      </div>
      <div className="mfs-auto">
          <span className="ml-1">&copy; 2021 Shadows Interactive Inc.</span>
        {/*<span className="mr-1">Powered by</span>*/}
        {/*<a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>*/}
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
