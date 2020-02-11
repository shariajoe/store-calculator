import React from 'react';
import { render } from '@testing-library/react';
import BillCustomer from './bill';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<BillCustomer />);
});

describe('Test for getFormattedDate', () => {
    it('should handle the formatting of a dates', () => {
        const wrapper = shallow(<BillCustomer />);
        const instance = wrapper.instance();
        expect(instance.getFormattedDate(1581438266180)).toEqual("11-02-2020");
    });
});
  
describe('Test for getTotalBill case you buy a novel for one day (i.e less than 3 days)', () => {
    it('should give the minimum price for renting a novel 4.5', () => {
        const wrapper = shallow(<BillCustomer />);
        const instance = wrapper.instance();
        const books = [
            {   
                id: 2,
                title: "Arctic Dreams",
                thumbnail: "image2",
                category: "novel",
                selected: true
            }
        ];
        const numberOfDays = 1;
        expect(instance.getTotalBill(numberOfDays, books)).toEqual(4.5);
    });
});

describe('Test for getTotalBill case you buy a novel for 4 days (i.e more than 3 days)', () => {
    it('should give a price of $ 6 since its $ 1.5 per day for 4 days', () => {
        const wrapper = shallow(<BillCustomer />);
        const instance = wrapper.instance();
        const books = [
            {   
                id: 2,
                title: "Arctic Dreams",
                thumbnail: "image2",
                category: "novel",
                selected: true
            }
        ]

        const numberOfDays = 4;
        expect(instance.getTotalBill(numberOfDays, books)).toEqual(6);
    });
});

describe('Test for getTotalBill case you buy a regular book for one day (i.e less than 2 days)', () => {
    it('should give the minimum price for renting a regular book 2', () => {
        const wrapper = shallow(<BillCustomer />);
        const instance = wrapper.instance();
        const books = [
            {   
                id: 2,
                title: "Arctic Dreams",
                thumbnail: "image2",
                category: "regular",
                selected: true
            }
        ];
        const numberOfDays = 1;
        expect(instance.getTotalBill(numberOfDays, books)).toEqual(2);
    });
});

describe('Test for getTotalBill case you buy a regular book for 3 days (i.e more than 2 days)', () => {
    it('should give a price of $ 3.5 since its $ 1 per day for first 2 days and $ 1.5 after ', () => {
        const wrapper = shallow(<BillCustomer />);
        const instance = wrapper.instance();
        const books = [
            {   
                id: 2,
                title: "Arctic Dreams",
                thumbnail: "image2",
                category: "regular",
                selected: true
            }
        ];
        const numberOfDays = 3;
        expect(instance.getTotalBill(numberOfDays, books)).toEqual(3.5);
    });
});

describe('Test for constructTableData ', () => {
    it('should return data as {} since orders not set ', () => {
        const wrapper = shallow(<BillCustomer />);
        const instance = wrapper.instance();
        expect(instance.constructTableData()).toEqual({});
    });
});

describe('Test for constructTableData insertion of one row ', () => {
    it('should return length of rows as 1 ', () => {
        const wrapper = shallow(<BillCustomer />);
        const instance = wrapper.instance();
        localStorage.setItem("orders", JSON.stringify([
            {
                id:1,
                idNumber: 6687887,
                name: "yyiun",
                books:[
                    {   
                        id: 2,
                        title: "Arctic Dreams",
                        thumbnail: "image2",
                        category: "regular",
                        selected: true
                    }],
                date:1581442851369
            }
        ]));
        expect(instance.constructTableData().rows.length).toEqual(1);
    });
});

describe('Test for getTotalBillForPrint case you buy a regular book for one day (i.e less than 2 days)', () => {
    it('should get a price minimum price for renting a regular book 2', () => {
        const wrapper = shallow(<BillCustomer />);
        const instance = wrapper.instance();
        const books = [
            {   
                id: 2,
                title: "Arctic Dreams",
                thumbnail: "image2",
                category: "regular",
                selected: true
            }
        ];
        const numberOfDays = 1;
        expect.assertions(1);
        return instance.getTotalBillForPrint(numberOfDays, books).then(data => expect(data[0].price).toEqual(2))
    });
});