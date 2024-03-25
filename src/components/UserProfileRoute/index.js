import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  failuer: 'FAILUER',
  inprogress: 'INPROGRESS',
}

class UserProfileRoute extends Component {
  state = {profileData: {}, apiStatus: ''}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      console.log(updatedData)
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstant.failuer,
      })
    }
  }

  renderUserProfileDetails = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    console.log(name)
    return (
      <div>
        <div className="profile-card">
          <img src={profileImageUrl} alt={name} />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailuerView = () => (
    <div>
      <button
        type="button"
        className="btn-logout"
        onClick={this.getProfileData}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderUserProfileDetails()
      case apiStatusConstant.inprogress:
        return this.renderLoadingView()
      case apiStatusConstant.failuer:
        return this.renderFailuerView()
      default:
        return null
    }
  }
}

export default UserProfileRoute
