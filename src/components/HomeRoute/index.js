import {Link} from 'react-router-dom'
import HeaderRoute from '../HeaderRoute'

import './index.css'

const HomeRoute = () => (
  <div>
    <HeaderRoute />
    <div className="home-page-bg-container">
      <div className="text-container">
        <h1 className="job-text">Find The Job That Fits Your Life</h1>
        <p className="job-text">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential. Find
          Jobs
        </p>
        <Link to="/jobs">
          <button className="find-jobs-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default HomeRoute
