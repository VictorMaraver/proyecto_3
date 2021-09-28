import React, { Component, Button, Form} from 'react'
import ActivityService from '../../../services/activity.service';
// import ActivitiesForm from '../ActivitiesForm/ActivitiesForm';


export default class ActivitiesList extends Component {

    constructor(){
      super();
      this.state = {
        show: false,
        searchValue: ""
      }
      this.activityService = new ActivityService();
    }

    refreshActivity = () => {

      this.activityService.getActivity()
      .then(res => {
        this.setState({
          ...this.state,
          coasters: res.data
        })
      })
      .catch(err => console.error(err))
    }

    handleSubmit = (e) => {
      e.preventDefault();
  
      this.coasterService.createActivity(this.state)
        .then(() => {
          // this.props.closeModal();
          this.props.refreshActivity();
          this.setState({
            title: "",
            description: "",
            image: "",
            professor: '',
            date: 0
          })
        })
        .catch(err => console.error(err))
    }
  

  render() {
    return (

      <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name: </Form.Label>
          <Form.Control onChange={(e) => this.handleChange(e)} name="name" value={this.state.name} type="text" placeholder="Name activity" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripción: </Form.Label>
          <Form.Control onChange={(e) => this.handleChange(e)} name="description" value={this.state.description} type="text" placeholder='Description' />
        </Form.Group>

        <Form.Group className='mb-3' controlId="professor">
          <Form.Label>Professor: </Form.Label>
          <Form.Control onChange={(e) => this.handleChange(e)} name="professor" value={this.state.professor} type="number" placeholder="Professor activity" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date: </Form.Label>
          <Form.Control onChange={(e) => this.handleChange(e)} name="date" value={this.state.date} type="number" placeholder="Date" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="hour">
          <Form.Label>Hour: </Form.Label>
          <Form.Control onChange={(e) => this.handleChange(e)} name="hour" value={this.state.hour} type="text" placeholder="Hour" />
        </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    
      </div>
    )
  }
}
