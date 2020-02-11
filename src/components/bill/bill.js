import React,{ Component } from 'react';
import { 
    MDBDataTable, 
    MDBBtn,
    MDBModal, 
    MDBModalBody, 
    MDBModalHeader,  
    MDBContainer
} from 'mdbreact';
import getImage from '../../imgMap';
import './bill.css';
import ReactToPrint from "react-to-print";

class BillCustomer  extends Component {
    constructor(props) {
        super(props);
        this.data = {};
        this.state = {
            rentedBooks: [],
            totalPrice: 0,
            billabeDays: 0
        }
    }

    componentDidMount(){
        this.data = this.constructTableData();
    }

    constructTableData(){
        let data  = {};
        let orders = localStorage.getItem("orders");
        if(orders){
            orders = JSON.parse(orders);
            let rows = orders.map((order)=>{
                let bookNames = order.books.map((book)=>{
                    return book.title;
                }).join(", ");

                let dateOrdered = this.getFormattedDate(order.date);
                let billabeDays = this.getDaysRented(order.date);
                let total = `$ ${this.getTotalBill(billabeDays, order.books)}`;

                return {
                    idNumber: order.idNumber,
                    name: order.name,
                    books: bookNames,
                    date: dateOrdered,
                    billabeDays: billabeDays,
                    total: total,
                    print: <MDBBtn size="sm"
                     className="print-btn"
                     onClick={() => { this.toggleModal(billabeDays, total, order.books) }}>Print</MDBBtn>
                }
            });

            data = {
                columns: [
                {
                    label: 'ID Number',
                    field: 'idNumber',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Books',
                    field: 'books',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Rental date',
                    field: 'date',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Days Billable',
                    field: 'billabeDays',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Total due',
                    field: 'total',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: '',
                    field: 'print',
                    sort: 'asc',
                    width: 150
                }
                ],
                rows: rows
            }
        }

        return data;
    }

    getFormattedDate(unixDate){
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(unixDate);
        let year = date.getFullYear();
        let month = date.getMonth();
        let monthString = months[month];
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return monthString +' '+this.getOrdinalNum(day)+' ' + year;
    }

    getOrdinalNum(n) {
        return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    getDaysRented (dateStart) {
        let date_future = new Date();
        let date_now = new Date(dateStart);
        // get total seconds between the times
        let delta = Math.abs(date_future - date_now) / 1000;
      
        // calculate (and subtract) whole days
        let days = Math.floor(delta / 86400);
        delta -= days * 86400;
    
        // calculate (and subtract) whole hours
        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
    
        // calculate (and subtract) whole minutes
        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        if(hours > 0 || minutes > 0){
            days = ++days;
        } 

        if(days === 0){
            days = ++days;
        }

        return days
    }

    getTotalBill(billabeDays, books){
        const novelBookprice = 1.5;
        const fictionBookprice = 3;

        let totalPrice = books.reduce((total, book)=>{
            let price = 0;
            switch(book.category){
                case 'novel': 
                    if(billabeDays < 3){
                        price = 4.5;
                    } else {
                        price = novelBookprice * billabeDays;
                    }
                    break;

                case 'fiction': 
                    price = fictionBookprice * billabeDays;
                    break;

                case 'regular': 
                    if(billabeDays < 2){
                       price = 2;
                    } else {
                       let defaultPriceAfterTwoDays = 2;
                       let daysRemaining = billabeDays - 2;
                       price = (daysRemaining * 1.5) + defaultPriceAfterTwoDays;
                    }
                    break;

                default:
                    break;
            }
            return total + price;
        }, 0);

        return totalPrice;
    }

    toggleModal = (billabeDays, total, books) => {
        if(!this.state.modal){
            this.getTotalBillForPrint(billabeDays, books).then((booksWithPrice)=>{
                this.setState({
                    rentedBooks: booksWithPrice,
                    modal: !this.state.modal,
                    totalPrice: total,
                    billabeDays: billabeDays
                });
            });
        } else {
            this.setState({
                modal: !this.state.modal
            });
        }
    };


    getTotalBillForPrint(billabeDays, books){
        return new Promise((resolve, reject) => {
            const novelBookprice = 1.5;
            const fictionBookprice = 3;

            let booksWithPrice = books.map((book)=>{
                let price = 0;
                switch(book.category){
                    case 'novel': 
                        if(billabeDays < 3){
                            price = 4.5;
                        } else {
                            price = novelBookprice * billabeDays;
                        }
                        break;
    
                    case 'fiction': 
                        price = fictionBookprice * billabeDays;
                        break;
    
                    case 'regular': 
                        if(billabeDays < 2){
                           price = 2;
                        } else {
                           let defaultPriceAfterTwoDays = 2;
                           let daysRemaining = billabeDays - 2;
                           price = (daysRemaining * 1.5) + defaultPriceAfterTwoDays;
                        }
                        break;
    
                    default:
                        break;
                }
                book['price'] = price;
                return book;
            });
    
            resolve(booksWithPrice);
        });
    }
  

    render() {
        return (
            <React.Fragment>
                <MDBContainer style={{marginTop:30}}>
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.props.activeTab === "2"? this.constructTableData(): this.data}
                        style={{fontFamily: 'Montserrat'}}
                        />
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} id="divcontents">
                        <MDBModalHeader
                            className="text-center"
                            titleClass="w-100 modal-title"
                            toggle={this.toggleModal}
                        >
                            <div className="print-cta">
                                <ReactToPrint
                                    trigger={() => <MDBBtn className="print-btn">Print this out!</MDBBtn>}
                                    content={() => this.componentRef}
                                />
                            </div>
                        </MDBModalHeader>
                        
                        <ComponentToPrint ref={el => (this.componentRef = el)} 
                        rentedBooks = {this.state.rentedBooks} totalPrice = {this.state.totalPrice} 
                        billabeDays = {this.state.billabeDays}/>
                    </MDBModal>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

class ComponentToPrint extends Component {
    render() {
        return (
            <React.Fragment>
                <MDBModalBody>
                    <div className="receipt-row">
                        <div className="receipt-col">
                        <h6 className="modal-book-title font-weight-bold text-left">Books</h6>
                        </div>
                        <div className="receipt-col-center">
                        <h6 className="modal-book-title font-weight-bold text-left">Days rented</h6>
                        </div>
                        <div className="receipt-col-right">
                        <h6 className="modal-book-title font-weight-bold text-left">Total</h6>
                        </div>
                    </div>
                    {
                        this.props.rentedBooks && this.props.rentedBooks.length?
                        this.props.rentedBooks.map((book, index) =>(
                            <div className="receipt-row" key={index}>
                                <div className="receipt-col">
                                    <img src={getImage(book.thumbnail)}  alt={book.title} className="modal-book-image"/>
                                    <div>
                                        <h6 className="modal-book-title">{book.title}</h6>
                                        <h6 className="book-category">{book.category}</h6>
                                    </div>
                                </div>
                                <div className="receipt-col-center">
                                    <h6 className="modal-book-title text-right font-weight-bold">{this.props.billabeDays}</h6>
                                </div>
                                <div className="receipt-col-right">
                                    <h6 className="modal-book-title text-right font-weight-bold">$ {book.price}</h6>
                                </div>
                            </div>
                        )):null
                    }
                    <hr/>
                    <div className="receipt-row">
                        <div className="receipt-col">
                            <h6 className="modal-book-title font-weight-bold text-left">TOTAL</h6>
                        </div>
                        <div className="receipt-col-right">
                            <h6 className="modal-book-title text-right font-weight-bold">{this.props.totalPrice}</h6>
                        </div>
                    </div>
                </MDBModalBody>
            </React.Fragment>
        )
    }
}

export default BillCustomer;