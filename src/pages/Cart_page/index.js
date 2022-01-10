import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Index extends Component {
    render() {


        return (
            <div>
                <h1>Cart page</h1>
                <Link to={'/'} >Go to category page</Link>
                <Link to={'/product'} >Go to product page</Link>
            </div>
        )
    }
}
