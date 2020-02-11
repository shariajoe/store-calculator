import React, { Component } from 'react';
import './rent.css';
import { 
  MDBContainer, 
  MDBRow, 
  MDBCol,
  MDBIcon,
  MDBBadge,
  MDBModal, 
  MDBModalBody, 
  MDBModalHeader, 
  MDBModalFooter, 
  MDBBtn, 
  MDBInput,
  MDBNotification
} from "mdbreact";
import getImage from '../../imgMap';

class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showNotification: false,
      books: [
        {
          id: 1,
          title: "After Gandhi",
          thumbnail: "image1",
          category: "regular",
          selected: false
        },
        {
          id: 2,
          title: "Arctic Dreams",
          thumbnail: "image2",
          category: "novel",
          selected: false
        },
        {
          id: 3,
          title: "Golden Bulls",
          thumbnail: "image3",
          category: "fiction",
          selected: false
        },
        {
          id: 4,
          title: "Eat your U.S. History Homework",
          thumbnail: "image4",
          category: "novel",
          selected: false
        },
        {
          id: 5,
          title: "Home Now",
          thumbnail: "image5",
          category: "regular",
          selected: false
        },
        {
          id: 6,
          title: "The Ink Garden of Brother Theophane",
          thumbnail: "image6",
          category: "fiction",
          selected: false
        },
        {
          id: 7,
          title: "Little Pig joins the band",
          thumbnail: "image7",
          category: "fiction",
          selected: false
        },
        {
          id: 8,
          title: "Mountain of mittens",
          thumbnail: "image8",
          category: "fiction",
          selected: false
        },
        {
          id: 9,
          title: "Presidential Pets",
          thumbnail: "image9",
          category: "regular",
          selected: false
        },
        {
          id: 10,
          title: "Twinkle twinkle little star",
          thumbnail: "image10",
          category: "regular",
          selected: false
        },
        {
          id: 11,
          title: "Under the freedom tree",
          thumbnail: "image11",
          category: "regular",
          selected: false
        },
        {
          id: 12,
          title: "Unite or Die",
          thumbnail: "image12",
          category: "novel",
          selected: false
        },
        {
          id: 13,
          title: "White House Kids",
          thumbnail: "image13",
          category: "regular",
          selected: false
        }
      ]
    };
  }

  selectBook = (id, selected) => {
    selected = !selected;
    this.setState({
      books: this.state.books.map(book => (book.id === id ? {...book, selected} : book))
    });
  }

  getSelected = () =>{
    let count = this.state.books.filter((book)=>{
      return book.selected;
    }).length;
    return count;
  }

  addOrder = () => {
    let selectedBooks = this.state.books.filter((book)=>{
        return book.selected;
    });

    let orders = localStorage.getItem("orders");
    let order;
    if(orders){
        orders = JSON.parse(orders);
        order = {
            id: orders.length ? orders[orders.length - 1].id + 1 : 1,
            idNumber: this.state.idNumber,
            name: this.state.name,
            books: selectedBooks,
            date: Date.now()
        } 

        orders.push(order);
        localStorage.setItem("orders",JSON.stringify(orders));
    } else {
        orders = [];
        order = {
            id: 1,
            idNumber: this.state.idNumber,
            name: this.state.name,
            books: selectedBooks,
            date: Date.now()
        }

        orders.push(order);
        localStorage.setItem("orders",JSON.stringify(orders));
    }

    this.setState({
        idNumber: "",
        name: "",
    });

    let newArray = [...this.state.books];
    let unSelectedBooks = newArray.map((book)=>{
        book.selected = false;
        return book;
    });

    this.setState({ 
        books: unSelectedBooks,
        showNotification: true 
    });
  };

  handleInputChange = inputName => value => {
    const nextValue = value;

    this.setState({
      [inputName]: nextValue
    });
  };

  handleDelete = eventId => {
    const events = this.state.events.filter(e => e.id !== eventId);
    this.setState({ events });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <React.Fragment>
        {
            this.state.showNotification && (
            <MDBNotification
                style={{
                    width: "auto",
                    position: "fixed",
                    top: "10px",
                    right: "10px",
                    zIndex: 9999
                }}
                autohide={3000} // by default = ∞ ms
                bodyClassName="p-5 font-weight-bold white-text"
                className="stylish-color-dark"
                closeClassName="blue-grey-text"
                fade
                icon="bell"
                iconClassName="notification-icon"
                message="Sweet! Order submitted successfully "
                show
                text="A few seconds ago"
                title="Sharia's Bookstore"
                titleClassName="elegant-color-dark white-text"
            />
        )}
        <MDBRow>
            <MDBCol lg="12" className="header-col">
                <h6 className="header-sub-text">Select book(s) to rent</h6>
            </MDBCol>
            {
                this.state.books.map(book =>(
                <Book key={book.id} id={book.id} image={book.thumbnail} title={book.title} selected={book.selected}
                category={book.category}
                onClick={() => {
                    this.selectBook(book.id, book.selected);
                }}/>
                ))
            }
        </MDBRow>
        <MDBIcon icon="shopping-cart" className="cart-icon" onClick={this.toggleModal}>
            <MDBBadge
            color="dark"
            className="cart-icon-badge"
            >
            {this.getSelected()}
            </MDBBadge>
        </MDBIcon>
        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 modal-title"
            toggle={this.toggleModal}
          >
            Add customer detail
          </MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 grey-text">
              <MDBInput
                name="name"
                label="Full Name"
                icon="user-circle"
                hint=""
                group
                type="text"
                getValue={this.handleInputChange("name")}
                className="modal-input"
              />
              <MDBInput
                name="idNumber"
                label="ID Number"
                icon="id-card"
                hint=""
                group
                type="number"
                getValue={this.handleInputChange("idNumber")}
                className="modal-input"
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn
              className="modal-btn"
              onClick={() => {
                this.toggleModal();
                this.addOrder();
              }}
              disabled={!(this.state.idNumber && this.state.name)}
            >
              Rent book(s)
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </React.Fragment>
    );
  }
}


class Book extends Component {
  render() {
    const IMAGE = getImage(this.props.image);
    return (
      <MDBCol lg="3" md="4" sm="6" xs="6" size="12" className="custom-column">
        <div className="custom-card" onClick={this.props.onClick} 
        style={ this.props.selected ? { border:'4px solid #ea8508', boxShadow: "none", overflow: "hidden"} : {}}>
          <div className="custom-card-inner">
            <img src={IMAGE} className="card-image" alt={this.props.title}
             />
            <div className="card-title-holder" 
            style={ this.props.selected ? { width: 'calc(100% - 2px)'} : {}}>
                <div>
                    <h6 className="card-title" style={{marginBottom: 0}}>
                        {this.props.title}
                    </h6>
                    <h6 className="book-category">
                        {this.props.category}
                    </h6>
                </div>
            </div>
          </div>
        </div>
      </MDBCol>
    )
  }
}

export default Rent;


