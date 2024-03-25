import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import HeaderRoute from '../HeaderRoute'
import JobSkillsItem from '../JobSkillsItem'
import SimilarJobsItem from '../SimilarJobsItem'

import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  failuer: 'FAILUER',
  inprogress: 'INPROGRESS',
}

class JobItemDetailsRoute extends Component {
  state = {
    jobItemData: [],
    jobSkillsData: [],
    similarJobsData: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inprogress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
        companyLogoUrl: data.job_details.company_logo_url,
        title: data.job_details.title,
        rating: data.job_details.rating,
        location: data.job_details.location,
        employmentType: data.job_details.employment_type,
        packagePerAnnum: data.job_details.package_per_annum,
        jobDescription: data.job_details.job_description,
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      this.setState({
        jobItemData: updatedData,
        apiStatus: apiStatusConstant.success,
      })

      const skillsData = data.job_details.skills.map(eachSkill => ({
        id: eachSkill.id,
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      this.setState({
        jobSkillsData: skillsData,
        apiStatus: apiStatusConstant.success,
      })

      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilar => ({
        id: eachSimilar.id,
        companyLogoUrl: eachSimilar.company_logo_url,
        employmentType: eachSimilar.employment_type,
        jobDescription: eachSimilar.job_description,
        rating: eachSimilar.rating,
        title: eachSimilar.title,
        location: eachSimilar.location,
      }))
      console.log(updatedSimilarJobsData)
      this.setState({
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstant.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstant.failuer,
      })
    }
  }

  renderJobsItemDetailsView = () => {
    const {jobItemData, jobSkillsData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      description,
      imageUrl,
    } = jobItemData
    console.log(companyLogoUrl)
    return (
      <>
        <HeaderRoute />
        <div className="jobsItemDetails-container">
          <div>
            <div className="job-card">
              <div className="logo-and-rating-icon">
                <img
                  className="companyLogoUrl"
                  src={companyLogoUrl}
                  alt={title}
                />
                <div>
                  <h1>{title}</h1>
                  <div className="star-rating">
                    <FaStar className="FaStar" />
                    <p>{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-jobType-package">
                <div className="location-jobType">
                  <div className="icon-text">
                    <MdLocationOn />
                    <p>{location}</p>
                  </div>
                  <div className="icon-text">
                    <MdWork />
                    <p>{employmentType}</p>
                  </div>
                </div>
                <h1>{packagePerAnnum}</h1>
              </div>
              <hr />
              <h1>Description</h1>
              <p>{jobDescription}</p>
              <ul>
                <h1>Skills</h1>
                {jobSkillsData.map(eachSkill => (
                  <JobSkillsItem
                    jobSkillsItemDetails={eachSkill}
                    key={eachSkill.id}
                  />
                ))}
              </ul>
              <h1>Life at Company</h1>
              <div>
                <p>{description}</p>
                <img src={imageUrl} alt="life at company" />
              </div>
            </div>
          </div>
          <h1 className="heading-similar-jobs">Similar Jobs</h1>
          <ul className="similar-ul-list-card">
            {similarJobsData.map(eachSimilar => (
              <SimilarJobsItem similarJobsItemDetails={eachSimilar} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailuerView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="btn-logout"
        onClick={this.getJobItemData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobsItemDetailsView()
      case apiStatusConstant.failuer:
        return this.renderFailuerView()
      case apiStatusConstant.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default JobItemDetailsRoute
