import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import mapStateToProps from '../../mapStateToProps'

class Index extends Component {
    
    componentDidMount(){
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id')
    }

    render() {

        return (
            <div>
                <Header />
                <h1>Product page</h1>
                <Link to={'/'} >Go to category page</Link>
                <Link to={'/cart'} >Go to cart page</Link>
            </div>
        )
    }
}


export default connect(mapStateToProps)(Index);