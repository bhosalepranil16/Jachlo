import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';

import './components/firebaseConfig';
import Product from './contracts/Product.json';
import AuthContainer from './containers/AuthContainer';
import DefaultContainer from './containers/DefaultContainer';
import { setWeb3, setAccount, setContract, setLoading, setCompany, setProduct } from './store/actions';

class App extends Component {

  state = {
    isLogined : false
  }

  isLoginedHandler = (val) => {
    this.setState({isLogined : val});
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    window.ethereum.on('accountsChanged',(accounts) => {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== this.props.account) {
        this.props.setAccount(accounts[0]);
      }
    });
  }
  async loadWeb3(){
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      window.web3 = new Web3(provider);
    }
    this.props.setWeb3(window.web3);
  }

  async loadBlockchainData() {
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      this.props.setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = await Product.networks[networkId];
      if(networkData) {
        const abi = Product.abi;
        const address = networkData.address;
        const contract = await new web3.eth.Contract(abi,address);
        this.props.setContract(contract);

        const name = await contract.methods.COMPANY().call()
        const p = await contract.methods.PRODUCT().call();
        this.props.setCompany(name);
        this.props.setProduct(p);
      }
      this.props.setLoading(false);
    }
    catch(err) {
      window.alert(err.message);
    }
  }

  render() {
    const load = this.state.isLogined ?  <AuthContainer isLoginedHandler={this.isLoginedHandler} /> : <DefaultContainer isLoginedHandler={this.isLoginedHandler} />
    return(
      <>
        { load }
      </>    
    );
  }
}


const mapActionToProps = dispatch => {
  return {
    setWeb3 : (web3) => {dispatch(setWeb3(web3))},
    setAccount : (account) => {dispatch(setAccount(account))},
    setContract : (contract) => {dispatch(setContract(contract))},
    setCompany : (company) => {dispatch(setCompany(company))},
    setProduct : (product) => {dispatch(setProduct(product))},
    setLoading : (loading) => {dispatch(setLoading(loading))}
  }
}

export default connect(null,mapActionToProps)(App);
