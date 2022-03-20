import React, { Component, useEffect } from 'react'
import axios from 'axios'
import './Style.css';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state={
            burgers: []
        };
    }

     fetchData = async () => {
      const burgerData = await axios.get('http://localhost:8000/results')
      const data = Object.keys(burgerData.data.data).map(burger => burgerData.data.data[burger])
      this.setState({burgers: data});
    }

     componentDidMount() {
    this.fetchData();
    }

  render() {

      console.log(this.state.burgers)

    return (
      <div>
        <h1>Results:</h1>
        {this.state.burgers?.map(burger => 
           <div key={burger.id} className='title'>
             <div className='url'>{`${burger.siteUrl} ${burger.path}`}</div>
             <br />
             <div>{burger.title}</div> 
             <br />
             <div className='content'>{`${burger.date} -- ${burger.content}`}</div>
             <br />
             <br />
           </div>
        )}
      </div>
    )
  }
}


