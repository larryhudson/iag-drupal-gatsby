/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

export default () => (
  <div>
    <Helmet title="Information Access Group" htmlAttributes={{ lang: "en" }} />
    Hello world!
    <ul
      sx={{
        paddingLeft: 0,
        listStyle: "none",
        li: {
          display: "inline",
        },
        "li a": {
          padding: 3,
          backgroundColor: "text",
          color: "white",
          "&:hover, &:focus": {
            backgroundColor: "background",
            color: "text",
            border: "4px dotted",
            borderColor: "text",
          },
        },
      }}
    >
      <li>
        <Link to="/articles">Articles</Link>
      </li>
      <li>
        <Link to="/portfolio">Portfolio</Link>
      </li>
      <li>
        <Link to="/services">Our services</Link>
      </li>
    </ul>
  </div>
)
