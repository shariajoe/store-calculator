import React,{ Component } from 'react';
import { MDBDataTable } from 'mdbreact';

class BillCustomer  extends Component {
    constructor(props) {
        super(props);
        this.data = {};
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
                    total: total
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
        let hour =
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

        if(days == 0){
            days = ++days;
        }

        return days
    }

    getTotalBill(billabeDays, books){
        const novelBookprice = 1.5;
        const fictionBookprice = 3;
        const regularBookprice = 1.5;

        let totalPrice = books.reduce((total, book)=>{
            let price = 0;
            switch(book.category){
                case 'novel': 
                    price = novelBookprice * billabeDays;
                    break;

                case 'fiction': 
                    price = fictionBookprice * billabeDays;
                    break;

                case 'regular': 
                    price = regularBookprice * billabeDays;
                    break;

                default:
                    break;
            }
            return total + price;
        }, 0);

        return totalPrice;
    }
  

    render() {
        return (
            <MDBDataTable
              striped
              bordered
              hover
              data={this.props.activeTab === "2"? this.constructTableData(): this.data}
              style={{fontFamily: 'Montserrat'}}
            />
        );
    }
}

export default BillCustomer;