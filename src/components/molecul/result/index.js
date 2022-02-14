import React, { Component } from 'react';
import { Col, ListGroup, Row, Button } from 'react-bootstrap';
import Axios from 'axios';
import { API_URL } from '../../../utils/config';
import { TotalBayar } from '../../atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modals from '../modal';
import Swal from 'sweetalert2';

export default class Result extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       keranjang: [],
       detailKeranjang: false,
       showModal: false,
       jumlah: 1,
       keterangan: '',
       total_harga: 0,
       text: 'Pilih product dahulu'
    };
  };
  
  componentDidMount() {
    setInterval(() => {
      this.setState({
        keranjang: this.props.keranjang
      })
    }, 200)
  }
  
  handleshow = (showModal) => {
    this.setState({
        detailKeranjang: showModal,
        showModal: true,
        total_harga: showModal.total_harga,
        jumlah: showModal.value
    })
  }

  handleSubmit = (v) => {
    v.preventDefault()

    const newData = {
      value: this.state.jumlah,
      product: this.state.detailKeranjang.product,
      total_harga: this.state.total_harga,
      keterangan: this.state.keterangan
    }

    Axios.put(API_URL+"/keranjangs/"+this.state.detailKeranjang.id, newData)
    .then(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Berhasil diubah'
      })

      this.setState({
        showModal: false
      })
    })
    .catch(err => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'gagal mengubah'
      })
    })
  }

  handleDelete = (data) => {  
    this.state.keranjang.splice(data, 1);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Berhasil dihapus'
      })
  }

  tambah = (data) => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      total_harga: this.state.detailKeranjang.product.harga*(this.state.jumlah + 1)
    })
  }
  
  kurang = (data) => {
    if(this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        total_harga: this.state.detailKeranjang.product.harga*(this.state.jumlah - 1)
      })
    }
  }
  
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
        <Col md={3} mt={2}>
            <h3><strong>Hasil</strong></h3>
            <hr/>
            <ListGroup variant="flush">
              { this.state.keranjang.length !== 0 && this.state.keranjang.map((data, index) => (
                  <ListGroup.Item className="mb-4 list-pesanan" key={index}> 
                    <Row> 
                      <Col xs={2}>
                        <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={() => this.handleDelete(index)} /> 
                      </Col>
                      <Col>
                      <h6>{data.product.name}</h6>
                      </Col>
                      <Col><strong>{data.total_harga}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  ))
                }
                <Modals 
                  handleClose={this.handleClose} 
                  kurang={this.kurang} 
                  tambah={this.tambah} 
                  total_harga={this.state.total_harga}
                  changeHandler={this.changeHandler}
                  jumlah={this.state.jumlah}
                  handleSubmit={this.handleSubmit}
                  handleDelete={this.handleDelete}
                  {...this.state}
                />
            </ListGroup>
            <hr/>
            {
              this.props.keranjang.length ? (
                <TotalBayar keranjang={this.props.keranjang} />
                ):
                <><h5><strong>{this.state.text}</strong></h5></>
              }
            <hr />
            {
              this.state.keranjang.length >= 2 ? (
                <Button className="btn-checkout mr-4" onClick={this.props.handleDeleteAll} variant="danger"><FontAwesomeIcon icon={faTrash} /> Hapus semua pesanan</Button>
              ):
              null
            }
            <Button className="btn-checkout mr-4" variant="primary"><FontAwesomeIcon icon={faShoppingCart} /> Checkout</Button>
        </Col>
    );
  }
}
