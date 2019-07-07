import React, { Component } from 'react';
import $ from "jquery";
import { connect } from 'react-redux';

import { AddToCartContext } from '../../contexts/AddToCartContext';
import * as actions from '../../actions';
import ProductListSummary from '../views/ProductListSummary';
import ProductDetailSummary from '../views/ProductDetailSummary';
import Pagination from '../helpers/Pagination';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentPage: 1,
      perPage: 9
    };
    // TODO: set instance level vars -> this.props.products.length, lastPage = Math.ceil(this.props.products.length / this.state.perPage)
  }

  componentWillMount() {
    this.props.getProducts();
  }

  getPagedData = () => {
    const currentPageItemStart = (this.state.currentPage - 1) * this.state.perPage;
    const currentPageItemEnd = currentPageItemStart + this.state.perPage;
    return [currentPageItemStart, currentPageItemEnd];
  }

  handleThisPage = (number) => {
    this.setState({currentPage: number});
    $("html, body").animate({ scrollTop: 0 }, 500);
  }

  handlePreviousPage = () => {
    if (this.state.currentPage > 0) {
      this.setState({currentPage: (this.state.currentPage - 1)});
      $("html, body").animate({ scrollTop: 0 }, 500);
    }
  }

  handleNextPage = () => {
    const lastPage = Math.ceil(this.props.products.length / this.state.perPage);
    if (this.state.currentPage < lastPage) {
      this.setState({currentPage: (this.state.currentPage + 1)});
      $("html, body").animate({ scrollTop: 0 }, 500);
    }
  }

  render() {
    const totalProductCount = this.props.products.length;
    const [currentPageItemStart, currentPageItemEnd] = this.getPagedData();
    const currentPageProducts = this.props.products.slice(currentPageItemStart, currentPageItemEnd);
    const productListMarkup = currentPageProducts.map(product =>
      <ProductDetailSummary product={product} key={product.Id} />
    );

    // Passing AddToCartContext as it might be used at any deep level child.
    return(
      <AddToCartContext.Provider value={{action: this.props.addToCartAction}}>
        <div className="container">
          <h3 className="center">Product List</h3>

          <ProductListSummary currentPageItemStart={currentPageItemStart} currentPageItemEnd={currentPageItemEnd} totalProductCount={totalProductCount} />
          <div className="row">
            {productListMarkup}
          </div>
          <Pagination currentPage={this.state.currentPage} perPage={this.state.perPage} totalProductCount={totalProductCount} handlePreviousPage={this.handlePreviousPage} handleThisPage={this.handleThisPage} handleNextPage={this.handleNextPage} />
        </div>
      </AddToCartContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  if(typeof state.products.allProducts === 'undefined') {
    return {products: []};
  }
  else {
    return {products: state.products.allProducts};
  }
}

export default connect(mapStateToProps, actions)(ProductList);
