import React, { Component } from 'react'
import api from '../../services/api'
import './styles.css'
import {Link} from 'react-router-dom'

export default class Main extends Component{

    state={
        products:[],
        prodInfo:{},
        page : 1
    }

    componentDidMount(){
        this.loadProducts()
    }
    
    loadProducts = async (page=1) => {
        const response = await api.get(`/products?page=${page}`)
        const {docs, ...prodInfo} = response.data
        this.setState({products: docs, prodInfo, page})
    }

    prevPage = () => {
        const {page} = this.state

        if (page===1) return;
        const pageNumber = page-1;
        this.loadProducts(pageNumber)

    } 
    nextPage = () => {
        const {prodInfo, page} = this.state

        if (page===prodInfo.pages) return;

        const pageNumber = page+1
        this.loadProducts(pageNumber)
    }

    render(){
        const {page, prodInfo} = this.state
        return (
            <div className='product-list'>
            {this.state.products.map( prod => 
                <article key = {prod._id}>
                    <strong>{prod.title}</strong>
                    <p>{prod.description}</p>
                    <Link to={`/products/${prod._id}`}>Acessar</Link>
                </article>)}
            <div className = 'actions'>
                <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                <button disabled={page===prodInfo.pages} onClick={this.nextPage}>Proximo</button>
            </div>
            </div>
        
        )}
}