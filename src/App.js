import React, { Component, Fragment } from "react"
import "./App.css"
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users"
import axios from "axios"
import Search from "./components/users/Search"
import Alert from "./components/layout/Alert"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import About from "./components/pages/About"
import User from "./components/users/User"

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
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

  //Get single Github user
  getUser = async (username) => {
    this.setState({ ...this.state, loading: true })
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    this.setState({ ...this.state, user: res.data, loading: false })
  }

  getUserRepos = async (username) => {
    this.setState({ ...this.state, loading: true })
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    this.setState({ ...this.state, repos: res.data, loading: false })
  }

  render() {
    const { users, loading, alert, user, repos} = this.state
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUser}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route path="/about" component={About} />
              <Route
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    loading={loading}
                    repos = {repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
