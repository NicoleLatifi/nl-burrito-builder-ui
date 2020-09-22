import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder, deleteOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  async componentDidMount() {
    await getOrders()
      .then(data => this.setState({ orders: data.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  postSubmittedOrder = async (name, ingredients) => {
    await postOrder(name, ingredients)
      .then(data => this.setState({ orders: [...this.state.orders, data] }))
  }

  removeOrder = (e) => {
    console.log(e.target.id)
    deleteOrder(e.target.id)
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm postSubmittedOrder={this.postSubmittedOrder} />
        </header>

        <Orders orders={this.state.orders} removeOrder={this.removeOrder} />
      </main>
    );
  }
}


export default App;
