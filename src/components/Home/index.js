import './index.css'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="container">
      <Header />
      <div className="home-containe">
        <div className="home-con">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that your abilities and potential.
          </p>
          <Link to="/jobs">
            <button className="button-1" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
