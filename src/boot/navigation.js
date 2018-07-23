import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Root } from 'native-base';
import Home from '../containers/Home';
import BookDetail from '../containers/BookDetail';
import BookDetail2 from '../containers/BookDetail2';
import Login from '../containers/Login';
import Profile from '../containers/Profile';
import CustomerService from '../containers/CustomerService';
import Cart from '../containers/Cart';
import SignUp from '../containers/Signup';
import SideMenu from '../components/SideMenu';

const Stack = createStackNavigator(
  {
    Home: Home,
    Details: BookDetail2,
    Login: Login,
    CustomerService: CustomerService,
    Cart: Cart,
    SignUp: SignUp,
    Profile: Profile
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  }
);

const App = createDrawerNavigator (
  {
    Stack: Stack
  },
  {
    contentComponent: SideMenu,
  }
)


export default () => (
  <Root>
    <App />
  </Root>
);
