import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {Link} from 'react-router-dom'

import './index.css'

const JobsRouteItem = props => {
  const {jobsRouteItemDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobsRouteItemDetails
  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div className="job-card">
          <div className="logo-and-rating-icon">
            <img className="companyLogoUrl" src={companyLogoUrl} alt={title} />
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
        </div>
      </Link>
    </li>
  )
}

export default JobsRouteItem
