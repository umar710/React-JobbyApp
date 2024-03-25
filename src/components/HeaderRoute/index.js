/* eslint-disable jsx-a11y/control-has-associated-label */
import {FaHome} from 'react-icons/fa'
import {MdWork} from 'react-icons/md'
import {HiOutlineLogout} from 'react-icons/hi'

import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const HeaderRoute = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="home-jobs-card">
        <li>
          <Link className="iteam" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="iteam" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <div className="icons-card">
        <Link to="/">
          <FaHome className="mobile-view-icons" />
        </Link>
        <Link to="/jobs">
          <MdWork className="mobile-view-icons" />
        </Link>
      </div>
      <button type="button" className="btn-logout" onClick={onClickLogout}>
        Logout
      </button>

      <button className="icon-btn" type="button" onClick={onClickLogout}>
        <HiOutlineLogout />
      </button>
    </div>
  )
}
export default withRouter(HeaderRoute)
