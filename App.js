import React, { Component } from 'react';
import { View, Text ,BackHandler,StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    };
  }
  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }


  render() {
    return (
      <View style={{flex:1}}>
      <WebView source={{ uri: 'https://thedonald.win/' }}
      onLoad={()=> this.setState({isLoading:true})}
      ref={(webView) => { this.webView.ref = webView; }}
      onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
     />
     {!this.state.isLoading? 
      (<View style={styles.splash}>
        <Image style={{flex:1,width:"100%",height:200}} resizeMode="contain"  source={require('./assets/images/t.png')} />
      </View>)     
     : null}
     </View>
    );
  }
}

const styles = StyleSheet.create({
            splash:{
              position:"absolute",
              top:0,
              left:0,
              width:"100%",
              height:"100%",
              backgroundColor:"white",
              justifyContent:"center",
              alignItems:"center"
            }
})