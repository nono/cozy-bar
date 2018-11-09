/* global React */

import AppsContent from 'components/Apps/AppsContent'
import AppNavButtons from 'components/Apps/AppNavButtons'

class Apps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onClickOutside)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClickOutside)
  }

  onClickOutside = event => {
    if (this.state.opened) {
      // if it's not a cozy-bar nav popup, close the opened popup
      if (!this.rootRef.contains(event.target)) {
        this.setState({ opened: false })
        event.stopPropagation()
      }
    }
  }

  toggleMenu = () => {
    this.setState({ opened: !this.state.opened })
  }

  // data-tutorial attribute allows to be targeted in an application tutorial
  render() {
    const {
      replaceTitleOnMobile,
      appName,
      appNamePrefix,
      appSlug,
      iconPath,
      isPublic
    } = this.props
    const { opened } = this.state
    return (
      <nav
        className={`coz-nav coz-nav-apps${
          replaceTitleOnMobile ? ' coz-bar-hide-sm' : ''
        }`}
        ref={ref => {
          this.rootRef = ref
        }}
      >
        <AppNavButtons
          appName={appName}
          appNamePrefix={appNamePrefix}
          appSlug={appSlug}
          iconPath={iconPath}
          handleClick={this.toggleMenu}
          opened={opened}
          isPublic={isPublic}
        />
        <div
          className="coz-nav-pop coz-nav-pop--apps"
          id="coz-nav-pop--apps"
          aria-hidden={!opened}
        >
          <AppsContent />
        </div>
      </nav>
    )
  }
}

export default Apps
