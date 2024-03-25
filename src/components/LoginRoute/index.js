import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailuer = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailuer(data.error_msg)
    }
  }

  onChangeUsernameInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePasswordInput = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderLoginRoute = () => {
    const {username, password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-card">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <form onSubmit={this.onSubmitForm}>
          <label htmlFor="username">USERNAME</label>
          <br />
          <input
            className="user-input"
            value={username}
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.onChangeUsernameInput}
          />
          <br />
          <label htmlFor="password">PASSWORD</label>
          <br />
          <input
            className="user-input"
            value={password}
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.onChangePasswordInput}
          />
          <br />
          <button className="login-btn" type="submit">
            Login
          </button>
          {showErrorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-Page-bg-container">
        <div>{this.renderLoginRoute()}</div>
      </div>
    )
  }
}

export default LoginRoute
