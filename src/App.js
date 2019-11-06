import React, { Component } from "react"
import "./App.css"
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users"
import axios from "axios"
import Search from "./components/users/Search"
import Alert from "./components/layout/Alert"

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  // Clear users from state
  clearUsers = () => {
    this.setState({ loading: false, users: [] })
  }

  // Search Github Users
  searchUser = async (text) => {
    this.setState({ ...this.state, loading: true })
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    this.setState({ ...this.state, users: res.data.items, loading: false })
  }

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ ...this.state, alert: { msg, type } })

    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, loading, alert } = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUser}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    )
  }
}

export default App
