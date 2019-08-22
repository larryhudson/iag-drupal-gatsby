import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

export default () => (
  <div>
    <Helmet title="Information Access Group" />
    Hello world!
    <ul>
      <li>
        <Link to="/articles">Articles</Link>
      </li>
      <li>
        <Link to="/portfolio">Portfolio</Link>
      </li>
    </ul>
  </div>
)
