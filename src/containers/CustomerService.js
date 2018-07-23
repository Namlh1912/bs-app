/**
 * This is the contact page
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, View, Icon, Left, Button, Item, Input } from 'native-base';

// Our custom files and classes import
import Text from '../components/Text';
import Navbar from '../components/Navbar';
import Colors from '../components/Colors';

export default class CustomerService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      subject: '',
      message: ''
    }
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon name="ios-arrow-back" size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} title="Feedback" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <Item>
            <Icon active name='ios-person-outline' />
            <Input placeholder='Your name' onChangeText={(text) => this.setState({name: text})}/>
          </Item>
          <Item>
            <Icon active name='ios-mail-outline' />
            <Input placeholder='Your email address' onChangeText={(text) => this.setState({email: text})}/>
          </Item>
          <Item>
            <Icon active name='ios-filing-outline' />
            <Input placeholder='Subject' onChangeText={(text) => this.setState({subject: text})}/>
          </Item>
          <Item>
            <Icon active name='ios-paper-outline' style={{marginTop: -20}}/>
            <Input
              placeholder='Message'
              multiline={true}
              style={{height: 100, marginTop: -20}}
              onChangeText={(text) => this.setState({message: text})}/>
          </Item>
          <View style={{alignItems: 'center'}}>
            <Button onPress={() => this.send()} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20}}>
              <Text style={{color: '#fdfdfd'}}>Send</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

  send() {
    alert('Send email');
  }
}
