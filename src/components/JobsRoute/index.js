/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {MdSearch} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HeaderRoute from '../HeaderRoute'
import UserProfileRoute from '../UserProfileRoute'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeanItem'
import JobsRouteItem from '../JobsRouteItems'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  success: 'SUCCESS',
  failuer: 'FAILUER',
  inprogress: 'INPROGRESS',
}

class JobsRoute extends Component {
  state = {
    jobsData: [],
    activeEmploymentTabId: employmentTypesList[0].employmentTypeId,
    activeSalaryTabId: salaryRangesList[0].salaryRangeId,
    apiStatus: '',
    isLoading: true,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inprogress,
    })
    const {activeEmploymentTabId, activeSalaryTabId} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTabId}&minimum_package=${activeSalaryTabId}&search=`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updatedData)
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstant.success,
        isLoading: false,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstant.failuer,
      })
    }
  }

  onEmployementStatus = employmentTypeId => {
    this.setState({activeEmploymentTabId: employmentTypeId}, this.getJobsData)
  }

  onSalaryStatusChange = salaryRangeId => {
    this.setState({activeSalaryTabId: salaryRangeId}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderJobsRouteAllDetails = () => {
    const {jobsData, isLoading, searchInput} = this.state
    const jobSearchResult = jobsData.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(jobsData.length)
    return (
      <>
        <HeaderRoute />
        <div className="jobs-page-container">
          <div>
            <UserProfileRoute />
            <hr />
            <ul>
              <h1 className="jobs-catagry-heading">Type of Employment</h1>
              {employmentTypesList.map(eachItem => (
                <EmploymentTypeItem
                  employmentTypeItemDetails={eachItem}
                  key={eachItem.employmentTypeId}
                  onEmployementStatus={this.onEmployementStatus}
                />
              ))}
            </ul>
            <hr />
            <ul>
              <h1 className="jobs-catagry-heading">Salary Range</h1>
              {salaryRangesList.map(eachItem => (
                <SalaryRangeItem
                  salaryRangeItemDetails={eachItem}
                  key={eachItem.salaryRangeId}
                  onSalaryStatusChange={this.onSalaryStatusChange}
                />
              ))}
            </ul>
          </div>
          <div>
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />

              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getJobsData}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {isLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <ul>
                {jobSearchResult.length === 0 ? (
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                      alt="no jobs"
                    />
                    <h1 className="noJobs-notFound">No Jobs Found</h1>
                    <p className="noJobs-notFound">
                      We could not find any jobs. Try other filters
                    </p>
                  </div>
                ) : (
                  jobSearchResult.map(eachItem => (
                    <JobsRouteItem
                      jobsRouteItemDetails={eachItem}
                      key={eachItem.id}
                    />
                  ))
                )}
              </ul>
            )}
          </div>
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
      <button type="button" className="btn-logout" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderSwith = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.failuer:
        return this.renderFailuerView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="JobCard">
        <div>{this.renderJobsRouteAllDetails()}</div>
        <div>{this.renderSwith()}</div>
      </div>
    )
  }
}

export default JobsRoute
