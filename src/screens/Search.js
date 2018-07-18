/**
 * This is the Search file
 **/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, Content, View, Header, Body, Icon, Item, Input, Thumbnail, Button, Right, Grid, Col } from 'native-base';

// Our custom files and classes import
import Colors from '../components/Colors';
import Text from '../components/Text';
import Book from '../components/Book';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      items: []
    };
  }

  componentWillMount() {
    if(this.props.searchText) {
      this.setState({searchText: this.props.searchText});
      this.search(this.props.searchText);
    }
  }

  render() {
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Header
          searchBar
          rounded
          style={{backgroundColor: Colors.navbarBackgroundColor}}
          backgroundColor={Colors.navbarBackgroundColor}
          androidStatusBarColor={Colors.statusBarColor}
          noShadow={true}
        >
          <Item>
            <Button onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name="ios-close" size={32} style={{fontSize: 32}} />
            </Button>
            <Input
              placeholder="Search..."
              value={this.state.searchText}
              onChangeText={(text) => this.setState({searchText: text})}
              onSubmitEditing={() => this.search(this.state.searchText)}
              style={{marginTop: 9}}
            />
            <Icon name="ios-search" onPress={() => this.search(this.state.searchText)} />
          </Item>
        </Header>
        {this.state.items.length <=0 ?
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="ios-search" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}} />
            <Text style={{color: '#95a5a6'}}>Search a product...</Text>
          </View>
          :
          <Content padder>
            {this.renderResult()}
          </Content>
        }
      </Container>
    );
  }

  renderResult() {
    let items = [];
    let stateItems = this.state.items
    for(var i=0; i<stateItems.length; i+=2 ) {
      if(stateItems[i+1]) {
        items.push(
          <Grid key={i}>
            <Book navigation={this.props.navigation} key={stateItems[i].id} product={stateItems[i]} />
            <Book navigation={this.props.navigation} key={stateItems[i+1].id} product={stateItems[i+1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <Book navigation={this.props.navigation} key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i+1} />
          </Grid>
        );
      }
    }
    return items;
  }

  search(text) {
    var searchResult = [
      {id:1, title:'Machine learning for dummies', type:'Technology', price:'20', publisher:'NXB', author:'Nam' },
      {id:2, title:'Photoshop for dummies', type:'Technology', price:'30', publisher:'NXB', author:'Nam' },
      {id:3, title:'Javascript for dummies', type:'Technology', price:'40', publisher:'NXB', author:'Nam' },
      {id:4, title:'Macos for dummies', type:'History', price:'50', publisher:'NXB', author:'Nam' },
      {id:5, title:'Machine learning for dummies', type:'History', price:'20', publisher:'NXB', author:'Nam' },
      {id:6, title:'Phot  oshop for dummies', type:'TEC', price:'30', publisher:'NXB', author:'Nam' },
      {id:7, title:'Javascript for dummies', type:'TEC', price:'40', publisher:'NXB', author:'Nam' },
      {id:8, title:'Macos for dummies', type:'TEC', price:'50', publisher:'NXB', author:'Nam' },
      {id:9, title:'Machine learning for dummies', type:'TEC', price:'20', publisher:'NXB', author:'Nam' },
      {id:10, title:'Photoshop for dummies', type:'Math', price:'30', publisher:'NXB', author:'Nam' },
      {id:11, title:'Javascript for dummies', type:'Math', price:'40', publisher:'NXB', author:'Nam' },
      {id:12, title:'Macos for dummies', type:'Math', price:'50', publisher:'NXB', author:'Nam' },
    ];
    this.setState({items: searchResult});
  }

}
