import React from 'react';
import Rent from './rent';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<Rent />);
});
  
describe('Test for sortBooks', () => {
    it('should set books a in categories', () => {
        const wrapper = shallow(<Rent />);
        const instance = wrapper.instance();
        
        instance.sortBooks();
        expect(wrapper.state().novelBooks.length).toEqual(3);
        expect(wrapper.state().fictionBooks.length).toEqual(4);
        expect(wrapper.state().regularBooks.length).toEqual(6);
    });
});

describe('Test for getSelected', () => {
    it('should get count of selected', () => {
        const wrapper = shallow(<Rent />);
        const instance = wrapper.instance();
        
        instance.getSelected();
        expect(instance.getSelected()).toEqual(0);
    });
});

describe('Test for selectBook', () => {
    it(`should set first book as selected and have the selected 
    value as true and should get count of selected as 1`, () => {
        const wrapper = shallow(<Rent />);
        const instance = wrapper.instance();
        expect(wrapper.state().books[0].selected).toEqual(false);
        instance.selectBook(1, false);
        expect(wrapper.state().books[0].selected).toEqual(true)
        expect(instance.getSelected()).toEqual(1);
        instance.addOrder();
        const orders = JSON.parse(localStorage.getItem("orders"));
        expect(orders.length).toEqual(1);
    });
});





