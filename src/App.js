import React, { Component } from 'react';
import './App.css';
import { 
  MDBContainer, 
  MDBRow, 
  MDBCol,
  MDBTabPane, 
  MDBTabContent, 
  MDBNav, 
  MDBNavItem, 
  MDBNavLink
} from "mdbreact";

import { BrowserRouter } from 'react-router-dom';
import Rent from "./components/rent/rent";
import BillCustomer from "./components/bill/bill";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "1"
    };
  }

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <MDBContainer className="full-content" fluid>
          <MDBContainer className="header">
            <MDBRow className="header-row">
              <MDBCol lg="12">
                <MDBRow className="no-margin">
                  <MDBCol lg="12" className="no-padding">
                    <h3 className="header-text">Sharia's Bookstore</h3>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="back-drop">
            <MDBContainer className="main-container">
              <BrowserRouter>
                <MDBNav className="nav-tabs mt-5">
                  <MDBNavItem>
                    <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" link
                    className="custom-tab">
                      Rent Book(s)
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" link
                    className="custom-tab">
                      Bill Customer
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNav>
              </BrowserRouter>

              <MDBTabContent activeItem={this.state.activeItem} >
                <MDBTabPane tabId="1" role="tabpanel">
                  <Rent/>
                </MDBTabPane>
                <MDBTabPane tabId="2" role="tabpanel" className="table-tab">
                  <BillCustomer activeTab={this.state.activeItem}/>
                </MDBTabPane>
              </MDBTabContent>
            </MDBContainer>
          </div>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default App;


