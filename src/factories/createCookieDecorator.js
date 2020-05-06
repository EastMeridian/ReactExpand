import React from 'react';
import {
  getCookie,
} from '../utils/cookies';

const createCookeDecorator = (cookieName) => (Component) => (props) => (  
  <Component {...props} {...{ [cookieName]: getCookie(cookieName)}} />
);

export default createCookeDecorator;