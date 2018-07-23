import React, { Component } from 'react';
import { ScrollView, View, Image, StyleSheet,Text } from 'react-native';
import { Grid, Col, Icon, Text as NBText, Button, Left, Right, Container } from 'native-base';

import Colors from '../components/Colors';
import Book from '../components/Book';
import Navbar from '../components/Navbar';

import books from './mock-data';
import background from '../../assets/background.jpg';
import mc from '../../assets/mc.jpg';

class BookDetail2 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      activeSlide: 0,
      quantity: 1,
      bookExist: false,
    };
  }

  componentWillMount() {
    //get the product with id of this.props.product.id from your server
    const {navigation} = this.props;
    const bookId = navigation.getParam('id', 'NO-ID');
    const book = books.filter(item => item.id === bookId);
    console.log(book[0]);
    this.setState({book: book[0]});
  }

  render(){
    //Left-side Navbar
    var left = (
      <Left style={{flex: 1}}>
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon style={{fontSize:25,color: "#fff"}} name='ios-arrow-back'/>
          <Text style={{marginLeft:10,color: '#fff', fontSize:18}}>Home</Text>
        </Button>
      </Left>
    );

    //Right-side Navbar
    var right = (
      <Right style={{flex: 1}}>
        <Button transparent>
          <Icon style={{color: "#fff"}} name='ios-search-outline'/>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('Cart')} transparent>
          <Icon style={{color: "#fff"}} name='ios-cart'/>
        </Button>
      </Right>
    );

    return(
      <Container>
        <Navbar left={left} right={right} title={'Book Detail'}/>
        <ScrollView style={{flex:1}}>
        <View style={styles.container}>
          <View style = {styles.backgroundContainer}>
            <Image source = {background} resizeMode = 'stretch' style = {styles.backdrop} />
          </View>
          <View style = {styles.overlay}>
            <Image style = {styles.logo} source = {mc} />
          </View>
        </View>
          {this.renderContent()}
          <View style={{marginTop: 15, paddingLeft: 12, paddingRight: 12}}>
            <Text style={{marginBottom: 5}}>Similar items</Text>
            <View style={{
              width: 50,
              height: 1,
              backgroundColor: 'rgba(44, 62, 80, 0.5)',
              marginLeft: 7,
              marginBottom: 10
            }}/>
            {this.renderSimilars()}
          </View>

      </ScrollView>
      </Container>
    )
  }

  renderContent = () => (
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#fdfdfd',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      alignItems: 'center'
    }}>
      <Grid>
        <Col size={3}>
          <Text style={{fontSize: 18}}>{this.state.book.title}</Text>
        </Col>
        <Col>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.state.book.price}$</Text>
        </Col>
      </Grid>
      <Grid>
        <Col>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>Quantity:</Text>
          </View>
        </Col>
        <Col size={3}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button style={{width: 50, justifyContent: 'center'}} icon light
                    onPress={() => this.setState({quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1})}>
              <Icon name='ios-remove-outline'/>
            </Button>
            <View style={{
              flex: 4,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 30,
              paddingRight: 30
            }}>
              <Text style={{fontSize: 18}}>{this.state.quantity}</Text>
            </View>
            <Button style={{width: 50, justifyContent: 'center'}} icon light
                    onPress={() => this.setState({quantity: this.state.quantity + 1})}>
              <Icon name='ios-add'/>
            </Button>
          </View>
        </Col>
      </Grid>
      <Grid style={{marginTop: 15}}>
        <Col size={3}>
          <Button block
                  style={{backgroundColor: Colors.navbarBackgroundColor}}>
            <Text style={{color: "#fdfdfd", marginLeft: 5}}>Add to cart</Text>
          </Button>
        </Col>
      </Grid>
      <Grid style={{marginTop: 15}}>
        <Col size={3}>
          <View
            style={{
              marginTop: 15,
              padding: 10,
              borderWidth: 1,
              borderRadius: 3,
              borderColor: 'rgba(149, 165, 166, 0.3)'
            }}
          >
            <Text style={{marginBottom: 5}}>Description</Text>
            <View style={{
              width: 50,
              height: 1,
              backgroundColor: 'rgba(44, 62, 80, 0.5)',
              marginLeft: 7,
              marginBottom: 10
            }}/>
            <NBText note>
              this is a description
            </NBText>
          </View>
        </Col>
      </Grid>
    </View>
  )

  renderSimilars() {
    let items = [];
    let stateItems = books.filter(book => book.price > this.state.book.price);
    if(stateItems.length > 0){
      for (var i = 0; i < 4; i += 2) {
        if (stateItems[i + 1]) {
          items.push(
            <Grid key={i}>
              <Book navigation={this.props.navigation} key={stateItems[i].id} book={stateItems[i]}/>
              <Book navigation={this.props.navigation} key={stateItems[i + 1].id} book={stateItems[i + 1]} isRight/>
            </Grid>
          );
        }
        else {
          items.push(
            <Grid key={i}>
              <Book navigation={this.props.navigation} key={stateItems[i].id} book={stateItems[i]}/>
              <Col key={i + 1}/>
            </Grid>
          );
        }
      }
    }else{
      items.push(
        <Grid key={0}>
          <Text>There is no similars book</Text>
        </Grid>
      )
    }
    return items;
  }
}

var styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    height:350,
  },
  overlay: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: 170,
    height: 235,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  backdrop: {
    flex:1,
    flexDirection: 'row',
  },
  headline: {
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white'
  }
});

export default BookDetail2;