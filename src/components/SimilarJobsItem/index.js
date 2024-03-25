import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const SimilarJobsItem = props => {
  const {similarJobsItemDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    employmentType,
    location,
  } = similarJobsItemDetails
  return (
    <li>
      <div className="similar-job-card">
        <div className="logo-and-rating-icon">
          <img src={companyLogoUrl} alt={title} className="companyLogoUrl" />
          <div>
            <h1>{title}</h1>
            <div className="star-rating">
              <FaStar className="FaStar" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
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
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsItem
