// Write your JS code here
import {Component} from 'react'

class LoginForm extends Component {
  state = {username: '', password: '', showErrormsg: true, errormsg: ''}

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  LoginSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  LoginFailure = data => {
    this.setState({showErrormsg: true, errormsg: data.error_msg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.LoginSuccess()
    } else {
      this.LoginFailure(data)
    }
  }

  LoginForm = () => {
    const {username, password, errormsg, showErrormsg} = this.state
    return (
      <form onSubmit={this.submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          onChange={this.updateUsername}
          value={username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={this.updatePassword}
          value={password}
        />
        <button type="submit">Login</button>
        {showErrormsg && <p>{errormsg}</p>}
      </form>
    )
  }

  render() {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />
        {this.LoginForm()}
      </div>
    )
  }
}

export default LoginForm
