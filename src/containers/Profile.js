import React, { Component } from 'react';
import { AsyncStorage, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input, Toast, Text } from 'native-base';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import {authActions } from '../redux/actions';

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => ({
  onLogout: () =>{
    dispatch(authActions.Logout());
  }
})

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      user:{},
    }
  }

  //Do we need set state? or just using props?
  componentWillMount() {
    AsyncStorage.getItem('user', (errs, result) => {
      if (!errs) {
        if (result !== null) {
          const value = JSON.parse(result);
          this.setState({user: value});
        }
      }
    })
  }

  render(){
    var left = (
      <Left style={{flex:1, flexDirection: 'row'}}>
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon style={{color: "#fff"}} name='ios-arrow-back'/>
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button  transparent>
          <Icon style={{ color: "#fff"}} name='ios-search-outline' />
        </Button>
        <Button onPress={() => this.props.navigation.navigate('Cart')} transparent>
          <Icon style={{ color: "#fff"}} name='ios-cart' />
        </Button>
      </Right>
    );

    return(
      <View>
        <Navbar left={left} right={right} title="Profile"/>
        <Text>Welcome, {this.state.user.username}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.props.onLogout();this.props.navigation.navigate('Home');
          }}
        >
          <Text style={{fontSize: 16, paddingLeft: 20}}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);