import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import Helmet from "react-helmet"

export const query = graphql`
  query AllPortfolioItems {
    allNodePortfolioItem {
      nodes {
        title
        id
        field_body {
          summary
        }
        path {
          alias
        }
      }
    }
  }
`

const PortfolioItemsPage = ({ data }) => {
  const portfolioItems = data.allNodePortfolioItem.nodes.map(node => ({
    id: node.id,
    title: node.title,
    path: node.path.alias,
    summary: node.field_body.summary,
  }))

  return (
    <>
      <Helmet title="Portfolio" />
      <Link to="/">Home</Link>
      <h2>Portfolio</h2>
      <PortfolioItemsList portfolioItems={portfolioItems} />
    </>
  )
}

const PortfolioItemsList = ({ portfolioItems }) => {
  return (
    <ul>
      {portfolioItems.map(portfolioItem => (
        <li key={portfolioItem.id}>
          <Link to={portfolioItem.path}>
            {portfolioItem.title}
            <p>{portfolioItem.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PortfolioItemsPage
