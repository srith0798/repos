// Write your code here
import './index.css'

function LanguageFilterItem(params) {
  const {langTech, isActive, updateActiveTabId} = params
  const {id, language} = langTech
  const onActive = () => {
    updateActiveTabId(id)
  }
  const colorActive = isActive ? 'color-mark' : ''
  return (
    <li className="tab-item">
      <button
        className={`nav-btn ${colorActive} `}
        onClick={onActive}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
