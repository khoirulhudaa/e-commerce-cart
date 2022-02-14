import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotdog, faCoffee, faCookie } from '@fortawesome/free-solid-svg-icons'

export default class ListCategories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       categories: []
    };
  };

  render() {
    return (
        <Col md={2} mt={4}>
            <h3><strong>Category</strong></h3>
            <hr/>
            <ListGroup className="mt-4">
                <ListGroupItem onClick={() => this.props.getCategory('Makanan')} class="listGroupItem" style={{paddingTop: '15px',paddingBottom: '15px', cursor: 'pointer'}}><FontAwesomeIcon icon={faHotdog} style={{marginRight: '20px'}}></FontAwesomeIcon> Makanan</ListGroupItem>
                <ListGroupItem onClick={() => this.props.getCategory('Minuman')} class="listGroupItem" style={{paddingTop: '15px',paddingBottom: '15px', cursor: 'pointer'}}><FontAwesomeIcon icon={faCoffee} style={{marginRight: '20px'}}></FontAwesomeIcon> Minuman</ListGroupItem>
                <ListGroupItem onClick={() => this.props.getCategory('Cemilan')} class="listGroupItem" style={{paddingTop: '15px',paddingBottom: '15px', cursor: 'pointer'}}><FontAwesomeIcon icon={faCookie} style={{marginRight: '20px'}}></FontAwesomeIcon> Cemilan</ListGroupItem>
            </ListGroup>
        </Col>
    );
  }
}
