/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, ActivityIndicator, Button} from 'react-native';
import ToastModule from './components/modules/ToastModule'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = { loading: false, requestResult: "" }

  post = this.post.bind(this)
  get = this.get.bind(this)
  put = this.put.bind(this)
  patch = this.patch.bind(this)
  delete = this.delete.bind(this)

  parsingToJson(response){
  	// console.log(response)
    try{
      return response.json()
    }
    catch (e) {
      console.log("Invalid json response: " + JSON.stringify(response))
      return {"status": "error"}
    }
  }

  parsingJson(responseJson){
  	// console.log(responseJson, JSON.stringify(responseJson))
    this.setState({requestResult: JSON.stringify(responseJson)})
  }

	get(){
    this.setState({loading: true})
    fetch("https://httpbin.org/get?what=something&how=somehow")
      .then(this.parsingToJson)
      .then(this.parsingJson.bind(this))
      .then(() => {
        this.setState({loading: false})
        Alert.alert("new get data", this.state.requestResult)
      })
  }

	put(){
		this.setState({loading: true})
		fetch("https://httpbin.org/put", {
			method: 'PUT',
			body: JSON.stringify({
				newData: "some yet more truly new data"
			})
		})
			.then(this.parsingToJson)
			.then(this.parsingJson.bind(this))
			.then(() => {
				this.setState({loading: false})
				Alert.alert("new put data", this.state.requestResult)
			})
	}

	post(){
		this.setState({loading: true})
		fetch("https://httpbin.org/post", {
			method: 'POST',
			body: JSON.stringify({
				newData: "some REALLY new data"
			})
		})
			.then(this.parsingToJson)
			.then(this.parsingJson.bind(this))
			.then(() => {
				this.setState({loading: false})
				Alert.alert("new post data", this.state.requestResult)
			})
	}

	patch(){
		this.setState({loading: true})
		fetch("https://httpbin.org/patch", {
			method: 'PATCH',
			body: JSON.stringify({
				complementaryData: "some complementary new data"
			})
		})
			.then(this.parsingToJson)
			.then(this.parsingJson.bind(this))
			.then(() => {
				this.setState({loading: false})
				Alert.alert("new patch data", this.state.requestResult)
			})
	}

	delete(){
		this.setState({loading: true})
		fetch("https://httpbin.org/delete", {
			method: 'DELETE'
		})
			.then(this.parsingToJson)
			.then(this.parsingJson.bind(this))
			.then(() => {
				this.setState({loading: false})
				console.log(this.state.requestResult)
				Alert.alert("new delete data", this.state.requestResult)
			})
	}

	toast(){
		ToastModule.show('Awesome', ToastModule.SHORT)
	}

	longToast(){
		ToastModule.show('Awesome', ToastModule.LONG)
	}

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" display={this.state.loading ? "flex" : "none"}/>
        <Text style={styles.welcome}>Welcme to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button onPress={this.get} title={"get"} />
        <Button onPress={this.post} title={"Post"} />
        <Button onPress={this.put} title={"put"} />
        <Button onPress={this.delete} title={"delete"} />
        <Button onPress={this.patch} title={"patch"} />
        <Button onPress={this.toast} title={"toast"} />
        <Button onPress={this.longToast} title={"long toast"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
