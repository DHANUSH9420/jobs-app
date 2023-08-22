import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import AiOutlineStar from 'react-icons/ai'
import HiLocationMarker from 'react-icons/hi'
import {BiBriefcase, BiLinkExternal} from 'react-icons/bi'
import SimilarJob from '../SimilarJob'
import Header from '../Header'

import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobItemDetails: [],
    similarJobs: [],
    apiStatus: apiStatusContent.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const optionJobData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobData = await fetch(url, optionJobData)
    if (responseJobData.ok === true) {
      const jobData = await responseJobData.json()
      const updateJobData = [jobData.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkills => ({
          imageUrl: eachSkills.image_url,
          name: eachSkills.name,
        })),
        title: eachItem.title,
      }))
      const updateSimilarJobData = jobData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo - url,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiStatusContent.success,
        jobItemDetails: updateJobData,
        similarJobs: updateSimilarJobData,
      })
    } else {
      this.setState({apiStatus: apiStatusContent.failure})
    }
  }

  onRetryBtnClick = () => {
    this.getJobDetails()
  }

  renderFailure = () => (
    <div className="failure-img-button-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for</p>
      <div className="jobs-failure-button-container">
        <button
          type="button"
          onClick={this.onRetryBtnClick}
          className="failure-button"
        >
          retry
        </button>
      </div>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobItemDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobItemDetails

    return (
      <>
        <div className="list-container">
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
          <div className="job-deatlis-contaier">
            <h1 className="h1">Description</h1>
            <a href={companyWebsiteUrl}>
              Visit <BiLinkExternal color="#6366f1" size="30" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="h1">Skills</h1>
          <ul className="u-list-container">
            {skills.map(eachJob => (
              <li key={eachJob.name} className="list-con-skills">
                <img
                  src={eachJob.imageUrl}
                  alt={eachJob.name}
                  className="skills-img"
                />
                <p className="">{eachJob.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="h1">Life at Company</h1>
          <div className="company-about">
            <div className="company-details-text ">
              <p>{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="logo"
              className="comapny-image"
            />
          </div>
        </div>
        <h1 className="h1">Similar Jobs</h1>
        <ul className="similar-ul-list">
          {similarJobs.map(eachJobs => (
            <SimilarJob id={eachJobs.id} getSimilarJob={eachJobs} />
          ))}
        </ul>
      </>
    )
  }

  renderStatusText = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderJobDetailsView()
      case apiStatusContent.failure:
        return this.renderFailure()
      case apiStatusContent.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="mon-home-container">{this.renderStatusText()}</div>
      </div>
    )
  }
}
export default JobItemDetails
