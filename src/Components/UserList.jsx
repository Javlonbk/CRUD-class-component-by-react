import React, { Component } from "react";
import {Data} from './Data.jsx'

export default class UserList extends Component {

    constructor(props){
        super(props)
        this.state = {
            datas: Data,
            name: '',
            text: '',
            select:null
        }
    }

    
    // <------delete------->
    handleDelete = (index) => {
        let nextdatas = this.state.datas.filter(data => {
          return data.id !== index
        })
        this.setState({datas: nextdatas})
    }

    // <-------getValueName-------->
    getValueName = (value) => {
          this.setState({name:value})
    }

    // <-------addPerson--------->
    addPerson = () => {
      let newData = {id:this.state.datas.length +1, name:this.state.name}
          this.setState({datas: [...this.state.datas, newData], name:''} )

     }
    
    // <-------editPerson------>
    handleEdit = (value) => {
      this.setState({select: value.id, text: value.name})
      console.log(this.state.select, this.state.name, value)
    }
    // <---------save--------->
    handleSave = () => {
      let newDatas = this.state.datas.map((data) => data.id === this.state.select ? {...data, name:this.state.text} : data)
      this.setState({datas: newDatas, select:null})
    }
    // <---------search-------->
    onSearchByName = (value) => {
      let nextDatas = Data.filter(data => {
        if(value.length === 0) return data
        else return data.name.toLowerCase().includes(value.toLowerCase())

      })
          this.setState({datas: nextDatas})
    }
    
  render() {
    return (
      <div className="container mt-5" style={{ width: "400px" }}>
        <div className="row">
        <input value={this.state.name} onChange={(e) => this.getValueName(e.target.value)} type="text" placeholder="Add person's name" className=" form-control" />
        <input onInput={(e) => this.onSearchByName(e.target.value)} type="text" placeholder="search by name" className="my-3 form-control" />
          <button   onClick={this.addPerson} className="col-8 mx-auto btn mb-5 btn-success my-3">Add Person</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                this.state.datas.map((data, index) => {
                    return (
                      <tr key={index+1}>
                      <td>{index+1}</td>
                      <td>{data.id === this.state.select? <input value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}  /> : data.name}</td>
                      <td>
                        <i className="fa fa-trash" onClick={() => this.handleDelete(data.id)}></i>
                        {
                          data.id === this.state.select ? <i className="fa-solid fa-check mx-3" onClick={this.handleSave}></i>:
                          <i className="fa fa-edit mx-3" onClick={() => this.handleEdit(data)}></i>
                        }
                      </td>
                    </tr>
                    )
                })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
