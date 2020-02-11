import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<App />);
});
