/**
 * This is the Login Page
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';

// Our custom files and classes import
import Colors from '../components/Colors';
import Text from '../components/Text';
import Navbar from '../components/Navbar';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      hasError: false,
      errorText: ''
    };
  }


  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={()=> this.props.navigation.goBack()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button  transparent>
          <Icon name='ios-search-outline' />
        </Button>
        <Button  transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} right={right} title="LOGIN" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <View style={{marginBottom: 35, width: '100%'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor}}>Welcome back, </Text>
            <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: '#687373'}}>Login to continue </Text>
          </View>
          <Item>
            <Icon active name='ios-person' style={{color: "#687373"}}  />
            <Input placeholder='Username' onChangeText={(text) => this.setState({username: text})} placeholderTextColor="#687373" />
          </Item>
          <Item>
            <Icon active name='ios-lock' style={{color: "#687373"}} />
            <Input placeholder='Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#687373" />
          </Item>
          {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
          <View style={{marginBottom: 35, width: '100%'}}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'left',
                width: '100%',
                color: '#687373'
              }}
            >
              Don't have an account?
              <Text
                onPress={()=> this.props.navigation.navigate('Signup')}
                style={{
                  color: 'blue',
                  textDecorationLine:'underline'
                }}
              >
                Signup
              </Text>
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button onPress={() => this.login()} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20}}>
              <Text style={{color: '#fdfdfd'}}>Login</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

  login() {
    /*
      Remove this code and replace it with your service
      Username: this.state.username
      Password: this.state.password
    */
    this.setState({hasError: true, errorText: 'Invalid username or password !'});
  }


}
