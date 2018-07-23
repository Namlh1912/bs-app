/**
 * This is the SideMenu component used in the navbar
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, Linking, AsyncStorage, TouchableOpacity } from 'react-native';
import { View, List, ListItem, Body, Left, Right, Icon, Grid, Col } from 'native-base';
import { connect } from 'react-redux';

// Our custom files and classes import
import Text from './Text';

const mapStateToProps = state =>{
  console.log(AsyncStorage.getItem('token'));
  console.log(state.auth);
  return{
    isLoggedIn: state.auth.isLoggedIn,
    user:state.auth.user
  }
};

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchError: false,
      subMenu: false,
      subMenuItems: [],
      clickedItem: '',
      user:{}
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('user', (errs,result) => {
      if (!errs) {
        if (result !== null) {
          const value = JSON.parse(result);
          this.setState({user:value});
        }
      }
    })
    AsyncStorage.getItem('token', (errs,result) => {
      if (!errs) {
        if (result !== null) {
          console.log(result);
        }
      }
    });
    // AsyncStorage.getItem('user')
    //   .then((result) => {
    //     const value = JSON.parse(result);
    //     this.setState({user:value});
    //   })
    //   .then(res => {
    //     <Spinner size={30} type="9CubeGrid" color="#fff"/>
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  renderLogin = () => (
    <View>
      <List>
        <ListItem
          icon
          key={0}
          button={true}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Left>
            <Icon style={{fontSize: 18}} name={"ios-person"} />
          </Left>
          <Body>
          <Text>Login</Text>
          </Body>
          <Right>
            <Icon name="ios-arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </View>
  )

  renderProfile = () =>(
    <TouchableOpacity
      style={{
        padding: 20,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
      }}
      onPress={() => this.props.navigation.navigate('Profile', {
        userId: this.state.user.id
      })}
    >
      <Text style={{color:'white', fontSize: 20, fontWeight:'bold'}}>
        Welcome, {this.props.user? this.props.user.username : this.state.user.username}
      </Text>
      <Icon style={{color:'white'}} name="ios-arrow-forward" />
    </TouchableOpacity>
  )

  render() {
    return(
      <ScrollView style={styles.container}>
        {this.renderMenu()}
      </ScrollView>
    );
  }
  renderMenu() {
      return(
        <View style={{paddingTop: 20 ,backgroundColor:'#78a9db'}} >
          {this.props.isLoggedIn? this.renderProfile():this.renderLogin()}
          <View style={{backgroundColor: 'white'}}>
          <View style={{paddingRight: 15}}>

            <List>
              {this.renderList()}
            </List>
          </View>
          <View style={styles.line} />
          <View style={{paddingRight: 15, paddingLeft: 15}}>
            <Text style={{marginBottom: 7}}>Follow us</Text>
            <Grid>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-facebook' onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-instagram' onPress={() => Linking.openURL('http://www.instagram.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-twitter' onPress={() => Linking.openURL('http://www.twitter.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-youtube' onPress={() => Linking.openURL('http://www.youtube.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='logo-snapchat' onPress={() => Linking.openURL('http://www.snapchat.com/').catch(err => console.error('An error occurred', err))} /></Col>
            </Grid>
          </View>
          <View style={styles.line} />
          <View style={{paddingRight: 15, paddingLeft: 15}}>
            <Text style={{marginBottom: 7}}>Hotline: 1900-8787</Text>
          </View>
          </View>
        </View>
      );
  }

  renderList() {
    let MenuItems = [];
    Items.map(item => {
      MenuItems.push(
        <TouchableOpacity
          key={item.id}
          style={{
            padding: 20,
            flex:1,
            flexDirection:'row',
          }}
          onPress={() => AsyncStorage.getItem('token').then((value) => {
            if(value){
              this.props.navigation.navigate(item.key);
            }else{
              if(item.auth === 'require'){
                this.props.navigation.navigate('Login');
              }
              this.props.navigation.navigate(item.key);
            }
          })}
        >
          <Icon style={{fontSize: 18}} name={item.icon} />
          <Text style={{fontSize: 16, paddingLeft: 20}}>{item.title}</Text>
        </TouchableOpacity>
      );
    });
    return MenuItems;
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  }
};

const Items = [
  {
    id: 2,
    title: 'Home',
    icon: 'ios-book',
    key: 'Home'
  },
  {
    id: 3,
    title: 'Profile',
    icon: 'md-phone-portrait',
    key: 'Profile',
    auth: 'require',
  },
  {
    id: 4,
    title: 'Manage Order',
    icon: 'md-phone-portrait',
    key: 'ManageOrder',
    auth: 'require',
  },
  {
    id: 5,
    key: 'map',
    title: 'Store Finder',
    icon: 'ios-pin',
  },
  {
    id: 6,
    title: 'CustomerService',
    icon: 'md-phone-portrait',
    key: 'CustomerService'
  }
];

export default connect(
  mapStateToProps
)(SideMenu)
