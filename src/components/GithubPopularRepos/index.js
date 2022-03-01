import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
// Write your code here

function PopularItem(params) {
  const {packObj} = params
  const objectPack = {
    name: packObj.name,
    id: packObj.id,
    issuesCount: packObj.issues_count,
    forksCount: packObj.forks_count,
    starsCount: packObj.stars_count,
    avatarUrl: packObj.avatar_url,
  }
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = objectPack
  return (
    <li className="popular-item">
      <img className="item-logo" src={avatarUrl} alt={name} />
      <h1 className="pop-head">{name}</h1>
      <div>
        <div className="pop-box">
          <img
            className="icon"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          />
          <p className="icon-info">{`${starsCount} stars`}</p>
        </div>
        <div className="pop-box">
          <img
            className="icon"
            alt="forks"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          />
          <p className="icon-info">{`${forksCount} forks`}</p>
        </div>
        <div className="pop-box">
          <img
            className="icon"
            alt="open issues"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          />
          <p className="icon-info">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}

class GithubPopularRepos extends Component {
  state = {
    statusTabId: languageFiltersData[0].id,
    popularRepoData: [],
    viewStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderDataServer()
  }

  renderTabList = () => {
    const {statusTabId} = this.state
    return (
      <ul className="tab-list">
        {languageFiltersData.map(eachTech => (
          <LanguageFilterItem
            key={eachTech.id}
            updateActiveTabId={this.updateActiveTabId}
            langTech={eachTech}
            isActive={eachTech.id === statusTabId}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" width={80} height={80} />
    </div>
  )

  renderDataServer = async () => {
    const {statusTabId} = this.state
    this.setState({
      viewStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${statusTabId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      this.setState({
        popularRepoData: popularRepos,
        viewStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        viewStatus: apiStatusConstants.failure,
      })
    }
  }

  updateActiveTabId = statusId => {
    // console.log(statusId)
    this.setState(
      {
        statusTabId: statusId,
      },
      this.renderDataServer,
    )
  }

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  renderDataList = () => {
    const {popularRepoData} = this.state
    // console.log(popularRepoData)
    return (
      <ul className="popular-list">
        {popularRepoData.map(eachPack => (
          <PopularItem key={eachPack.id} packObj={eachPack} />
        ))}
      </ul>
    )
  }

  renderBodySection = () => {
    const {viewStatus} = this.state
    // console.log(viewStatus)
    switch (viewStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderDataList()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-card">
        <h1 className="title">Popular</h1>
        {this.renderTabList()}
        {this.renderBodySection()}
      </div>
    )
  }
}

export default GithubPopularRepos
