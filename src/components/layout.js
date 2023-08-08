import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
//        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div data-is-root-path={isRootPath}>
      <div className="global-wrapper">
        <header className="global-header">{header}</header>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Layout

// <footer>
// <a href="https://andyet.com">&amp;yet</a> •{" "}
// <a href="http://peoplefirstgrowth.com">People-First Growth</a> •{" "}
// <a href="https://gatherthepeople.com">Gather the People</a> •{" "}
// <a href="https://buttondown.email/sarahavenir">Newsletter</a>
// </footer>
