import React, {Component} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import Axios from 'axios';
import {API_URL} from '../../utils/config';
import Swal from 'sweetalert2'


export default class Admin extends Component {

    state = {
        name: '',
        price: '',
        category: '',
        image: ''
    }

    
    KirimData = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        let results = '';
        let characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZatuvwxyz123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            results += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        formData.append('code', results)
        formData.append('name', this.state.name)
        formData.append('price', this.state.price)
        formData.append('category', this.state.category)
        formData.append('image', this.state.image)
        console.log('yahaa', formData.get('image'))

        Axios.post(API_URL + "/product", formData)
        .then(res => {
            console.log('response: ', res)
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Upload image successfully'
            })

            this.setState({
                code: '',
                name: '',
                price: '',
                category: '',
                image: ''
            })
        })
        .catch(err => {
            console.error('response: ', err.response)
            const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'warning',
            title: 'Upload image failed'
          })
        })
    }

    onChanges = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }   

    onChangesImage = (e) => {
        this.setState({
           image: e.target.files[0]
        })
    }   

    render() {
        const {KirimData} = this;
        return (
            <>
            <Container className="tambahData">
                <Form onSubmit={KirimData}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name produk</Form.Label>
                        <Form.Control name="name" value={this.state.name} onChange={this.onChanges} type="text" placeholder="What your name product ?" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" value={this.state.price} onChange={this.onChanges} type="number" placeholder="Price product ?" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <select name="category" value={this.state.category} className="form-control" onChange={this.onChanges}>
                            <option value="Makanan">Makanan</option>
                            <option value="Minuman">Minuman</option>
                            <option value="Cemilan">Cemilan</option>
                        </select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="image" onChange={this.onChangesImage} placeholder="What category product ?" />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={KirimData}>
                        Add product
                    </Button>
                </Form>
            </Container>
            </>
        )
    }
}