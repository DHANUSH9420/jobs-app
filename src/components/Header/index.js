import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BiFolder, BiLogOut} from 'react-icons/bi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo"
      />
      <div className="icon-container">
        <Link to="/">
          <AiFillHome color="#ffffff" size={30} />
        </Link>
        <Link to="/jobs">
          <BiFolder size={30} color="#ffffff" />
        </Link>
        <button className="none-btn" type="button" onClick={onClickLogout}>
          <BiLogOut size={30} color="#ffffff" />
        </button>
      </div>
      <div className="text-contiaer">
        <Link to="/" className="text">
          <p>Home</p>
        </Link>
        <Link to="/jobs" className="text">
          <p>Jobs</p>
        </Link>
      </div>
      <div>
        <button className="button-3" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
