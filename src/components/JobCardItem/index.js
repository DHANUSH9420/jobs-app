import {Link} from 'react-router-dom'
import AiOutlineStar from 'react-icons/ai'
import HiLocationMarker from 'react-icons/hi'
import BiBriefcase from 'react-icons/bi'
import './index.css'

const JobCardItem = props => {
  const {item} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item
  return (
    <Link to={`/jobs/${id}`} className="">
      <li className="list-container">
        <div className="job-logo-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-logo "
          />
          <div className="job-logo-text-container">
            <h1 className="job-logo-text">{title}</h1>
            <div className="job-logo-container">
              <AiOutlineStar color="#fbbf24" size="30" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-deatlis-contaier">
          <div className="job-row">
            <div className="job-logo-container">
              <HiLocationMarker color="#ffffff" size="30" />
              <p className="job-text ">{location}</p>
            </div>
            <div className="job-logo-container">
              <BiBriefcase color="#ffffff" size="30" />
              <p className="job-text ">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="pakege-text">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="hr" />
        <h1 className="h1">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCardItem
