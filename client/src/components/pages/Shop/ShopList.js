import React, { Component } from 'react'
import { Button, Modal, FormControl, Spinner, Form } from 'react-bootstrap'
import ShopService from '../../../services/shop.service'
import ShopItem from './ShopItem'
import CartService from '../../../services/cart.service'
import ShopForm from './ShopForm'
import './ShopList.css'




export default class ShopList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: undefined,
      shopItems: null,
      show: false,
      searchValue:''
    }
    this.cartService = new CartService()
    this.shopService = new ShopService()
  }

  componentDidMount() {
    this.refreshShopItems();
    this.getCart()
  }

  getCart = () => {
    return this.cartService.getCarts()
    .then(res => this.setState({cart: res.data[0]}))
    .catch(err => console.log(err))    
  }

  refreshShopItems = () => {
    this.shopService.getShopItems()
      .then(res => {
        this.setState({
          ...this.state,
          shopItems: res.data
        })
      })
      .catch(err => console.error(err))
  }

  openModal = () => {
    this.setState({
      ...this.state,
      show:true
    })
  }

  closeModal = () => {
    this.setState({
      ...this.state,
      show:false
    })
  }


  handleChange = (e) => {
    const {name, value} = e.target
    this.setState( {
      ...this.state,
      [name]:value
    })
  }

  displayShopItems = () => {
    const filteredItems = this.state.shopItems.filter(shopItems => shopItems.name.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase()))
    return(
      filteredItems.length > 0 ?
      filteredItems.map(item => {
        return(
          <ShopItem refreshCart={this.getCart} cart={this.state.cart} key={item._id} {...item}/>
        )
      }) :
      <p>Not Found</p>
    )
  }



  render(){
    return (
    
      <section>
        <Form className="d-flex search3">
        <FormControl
        
          onChange={this.handleChange}
          value={this.state.searchValue}
          name="searchValue"
          type="search"
          placeholder="Search your product"
          className="me-2 search"
          aria-label="Search"
        />
        <Button className="search2" variant="outline-success">Search</Button>
      </Form>

       
        {!this.state.shopItems
      ?
      <Spinner animation="border" variant="primary" />
      :
        <div className='column centerOne'>
          <div className='row justify-content-md-center'>
          {this.displayShopItems()}
          </div>
        {this.props.loggedUser?.role === 'MAN' && 
        <div>
        <Button  block className="mt-2 buttonBackground2" onClick={() => this.openModal()}>New Product</Button>
        <Modal show={this.state.show} onHide={() => this.closeModal()}>
              
              <Modal.Header closeButton>
                <Modal.Title>New Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ShopForm closeModal={() => this.closeModal()} refreshShopItems={this.refreshShopItems} />
              </Modal.Body>
        </Modal>
        </div>
        }
        </div>}
        <section>
        </section>
      </section>
    )
  }
}
