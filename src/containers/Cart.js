/**
 * This is the Checkout Page
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import { Container, Content, View, Grid, Col, Left, Right, Button, Icon, List, ListItem, Body, Radio, Input, Item } from 'native-base';
import FAIcon  from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

// Our custom files and classes import
import Colors from '../components/Colors';
import Text from '../components/Text';
import Navbar from '../components/Navbar';

const mapStateToProps = state => {
  return{
    isLoggedIn: state.users.loggedIn,
    cart: state.carts.cart,
  }
}

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      total: 0,
      card: true,
      paypal: false,
      name: '',
      email: '',
      phone: '',
      country: '',
      address: '',
      city: '',
      postcode: '',
      note: ''
    };
  }

  componentWillMount() {
    console.log(this.props.cart);
    if(this.props.cart){
      this.setState({cartItems: this.props.cart.items});
      var total = 0;
      this.props.cart.items.map((item) => {
        total += parseFloat(item.price) * parseInt(item.quantity);
        console.log(total);
        this.setState({total: total});
      });
    }
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon style={{color: 'white'}} name='ios-arrow-back' />
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} title="CHECKOUT" />
        <Content padder>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')} >
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#6fafc4', paddingTop: 20, paddingBottom: 20}}>
              <Icon name="ios-warning" style={{color: 'rgba(253, 253, 253, 0.9)', marginRight: 20, position: 'absolute', left: 11, top: 15, borderRightWidth: 1, borderColor: 'rgba(253, 253, 253, 0.2)', paddingRight: 10}}/>
              <Text style={{color: '#fdfdfd'}}>Returning customer ? click here to login</Text>
            </View>
          </TouchableHighlight>
          <Text style={{marginTop: 15, fontSize: 18}}>Your order</Text>
          <View style={styles.invoice}>
            <List>
              {this.props.cart
                ? this.renderItems()
                : ''
              }
            </List>
            <View style={styles.line} />
            <Grid style={{paddingLeft: 10, paddingRight: 10, marginTop: 7}}>
              <Col>
                <Text style={{fontSize: 18, fontStyle: 'italic'}}>Total</Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'right', fontSize: 18, fontWeight: 'bold'}}>{this.state.total+"$"}</Text>
              </Col>
            </Grid>
          </View>
          <View>
            <Text style={{marginTop: 15, marginBottom: 7, fontSize: 18}}>Payement method</Text>
            <ListItem style={{borderWidth: 1, borderColor: 'rgba(149, 165, 166, 0.3)', paddingLeft: 10, marginLeft: 0}}>
              <Text>Pay with card</Text>
              <FAIcon name="cc-mastercard" size={20} color="#c0392b" style={{marginLeft: 7}} />
              <FAIcon name="cc-visa" size={20} color="#2980b9" style={{marginLeft: 2}} />
              <Right>
                <Radio selected={this.state.card} onPress={() => this.setState({card: true, paypal: false})} />
              </Right>
            </ListItem>
            <ListItem style={{borderWidth: 1, borderColor: 'rgba(149, 165, 166, 0.3)', paddingLeft: 10, marginLeft: 0, borderTopWidth: 0}}>
              <Text>Pay with Paypal</Text>
              <FAIcon name="cc-paypal" size={20} color="#34495e" style={{marginLeft: 7}} />
              <Right>
                <Radio selected={this.state.paypal} onPress={() => this.setState({card: false, paypal: true})} />
              </Right>
            </ListItem>
          </View>
          <View style={{marginTop: 10, marginBottom: 10, paddingBottom: 7}}>
            <Button onPress={() => this.checkout()} style={{backgroundColor: Colors.navbarBackgroundColor}} block iconLeft>
              <Icon name='ios-card' />
              <Text style={{color: '#fdfdfd'}}>Proceed to payement</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  renderItems() {
    let items = [];
    this.props.cart.items.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          style={{marginLeft: 0}}
        >
          <Body style={{paddingLeft: 10}}>
          <Text style={{fontSize: 18}}>
            {item.quantity > 0 ? item.quantity+ " x " : null}
            {item.title}
          </Text>
          </Body>
          <Right>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>{item.price}$</Text>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  checkout() {
    console.log(this.props.isLoggedIn);
    if(this.props.isLoggedIn) {
      console.log(this.state);
      alert("Check the log");
    }else{
      this.props.navigation.navigate('Login');
    }
  }

}

const styles = {
  invoice: {
    paddingLeft: 20,
    paddingRight: 20
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#bdc3c7'
  }
};

export default connect(mapStateToProps, null)(Cart)
