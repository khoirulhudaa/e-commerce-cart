import React, { Component } from 'react';
import {NavbarComponent, ListCategories, Result, Menus} from '../molecul';
import Axios from 'axios';
import {API_URL} from '../../utils/config';
import Swal from 'sweetalert2';
import {Container, Row, Col} from 'react-bootstrap';

export default class Homepage extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           menuss: [],
           categoryDiPilih: "Makanan",
           keranjang: [],
           detailKeranjang: '',
           showModel: false
        };
      };
      
    componentDidMount() {
        // Axios.get(API_URL+"/products?category.nama="+this.state.categoryDiPilih)
        Axios.get(API_URL+"/product")
        .then(res => {
          const menuss = res.data;
          this.setState({menuss})
        })
        .catch(err => {
        })
        
        setTimeout(() => {
        }, 2000)
    }
    
    masukKeranjangs = (e) => {
        const cart = {
          value: 1,
          product: e,
          total_harga: e.price
        }

        this.setState({
          keranjang: [...this.state.keranjang, cart]
        })

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Masuk keranjang'
        })
    }

    
  handleDeleteAlls = () => {
    this.setState({
      keranjang: []
    })
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Berhasil dihapus semua'
    })
  }

  getCategory = (e) => {
    this.setState({
      categoryDiPilih: e
    })
  }
    
    render() {
        const {categoryDiPilih, menuss} = this.state;

        return (
            <>
            <NavbarComponent/>
            <div className="mt-4 p-4">
                <Container fluid>
                <Row>
                <ListCategories changeCategory={this.changeCategory} getCategory={(e) => this.getCategory(e)} categoryDiPilih={categoryDiPilih} />
                <Col>
                    <h3><strong>Daftar Produk</strong></h3>
                    <hr/>
                    <Row>
                        {
                        menuss && menuss.map((menu) => (
                          menu.category === this.state.categoryDiPilih ? (
                            <Menus
                              key={menu.id}
                              menu={menu}
                              categoryDipilih={categoryDiPilih}
                              masukKeranjang={this.masukKeranjangs}
                            />
                          ):
                          null
                        ))
                        }
                    </Row>
                </Col>
                <Result keranjang={this.state.keranjang} handleDeleteAll={this.handleDeleteAlls} />
                </Row>
                </Container>
            </div>
            </>
        )
    }
}