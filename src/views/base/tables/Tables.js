import React, {Component,Fragment} from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse 
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
//const [details, setDetails] = '';
const fields = ['name','show_details']



//const Tables = () => {
class Tables extends Component {

  state = {
    stories: false,
    episodes: false
  };
  showSeasons = () => {
    
    //alert("aaa");
    this.setState({stories: true })
    //this.onChange();
  };
  showEpisodes = () => {
   // alert("aaabbbb");
    this.setState({episodes: true })
    //this.onChange();
  };

  render() {

    return (
        <Fragment>
		
		<>


      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <p>Stories</p>
              <CButton  variant="outline" color="primary">Primary</CButton>
            </CCardHeader>
            <CCardBody> 
            <CDataTable
              items={usersData}
              fields={fields}
             // columnFilter
              tableFilter
              hover
             // striped
              bordered
              onRowClick={this.showSeasons}
             // onRowClick={()=>{alert("a")}}
              clickableRows={true}
              search
              size="sm"
              itemsPerPage={10}
              scopedSlots = {{
                'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{alert("b")}}//toggleDetails(index)}}
                        >
                          {'Edit'}
                        </CButton>
                      </td>
                      )
                  }
                }}    
            />
            </CCardBody> 
          </CCard>
        </CCol>

{this.state.stories &&(
        <CCol>
          <CCard>
            <CCardHeader>
              <p>Seasons</p>
              <CButton  variant="outline" color="primary">Primary</CButton>
            </CCardHeader>
            <CCardBody> 
            <CDataTable
              items={usersData}
              fields={fields}
             // columnFilter
              tableFilter
              hover
             // striped
              bordered
              onRowClick={this.showEpisodes}
              clickableRows={true}
              search
              size="sm"
              itemsPerPage={10}
              scopedSlots = {{
                'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{alert("b")}}//toggleDetails(index)}}
                        >
                          {'Edit'}
                        </CButton>
                      </td>
                      )
                  }
                }}    
            />
            </CCardBody> 
          </CCard>
        </CCol>
)}


{this.state.episodes &&(
        <CCol>
          <CCard>
            <CCardHeader>
              <p>Episodes</p>
              <CButton  variant="outline" color="primary">Primary</CButton>
            </CCardHeader>
            <CCardBody> 
            <CDataTable
              items={usersData}
              fields={fields}
             // columnFilter
              tableFilter
              hover
             // striped
              bordered
              onRowClick={()=>{alert("a")}}
              clickableRows={true}
              search
              size="sm"
              itemsPerPage={10}
              scopedSlots = {{
                'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{alert("b")}}//toggleDetails(index)}}
                        >
                          {'Edit'}
                        </CButton>
                      </td>
                      )
                  }
                }}    
            />
            </CCardBody> 
          </CCard>
        </CCol>
)}
        
      </CRow>
    </>
		
		</Fragment>
    );



  }
  

}

export default Tables
