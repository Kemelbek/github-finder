import React, { Component } from "react"
import "./App.css"
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users"
import axios from "axios"

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ ...this.state, loading: true })
    const res = await axios.get("https://api.github.com/users")
    this.setState({ ...this.state, users: res.data, loading: false })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={this.state.login} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
