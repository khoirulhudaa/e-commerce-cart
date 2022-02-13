import React, {Component} from 'react';
import {Card, Col} from 'react-bootstrap';
import {numberConvertCurrency} from '../../../utils/convertCurrency';

export default class Category extends Component {
    componentDidMount() {
        setTimeout(() => {
            console.log('ok:', this.props.menu)
        }, 200)
    }

    render() {
        return (
            <Col md={4} xs={6} className="mb-4" key={this.props.key}>
                <Card className="card shadow" onClick={() => this.props.masukKeranjang(this.props.menu)}>
                    <div className="card-head">
                        <Card.Img 
                            variant="top" 
                            src={`http://localhost:4000/images/${this.props.menu.image}`} 
                            alt="image" 
                        />
                    </div>
                    <Card.Body>
                        <Card.Title className="card-title"><strong>{this.props.menu.name}</strong></Card.Title>
                        <hr />
                        <Card.Text>Rp. {numberConvertCurrency(this.props.menu.price)}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}