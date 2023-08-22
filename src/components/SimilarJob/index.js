import AiOutlineStar from 'react-icons/ai'
import HiLocationMarker from 'react-icons/hi'
import BiBriefcase from 'react-icons/bi'
import './index.css'

const SimilarJob = props => {
  const {getSimilarJob} = props
  const {
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = getSimilarJob
  return (
    <li className="list">
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
      <h1 className="h1">Description</h1>
      <p className="description">{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJob
