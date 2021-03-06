import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import Helmet from "react-helmet"

import { TeamMembers, teamMembersFromInfo } from "../components/team-member"
import { clientFromInfo, Client } from "../components/client"
import {
  serviceAreaFromInfo,
  ServiceAreaLink,
} from "../components/service-area"

export const query = graphql`
  query PortfolioItem($portfolioItemId: String!) {
    nodePortfolioItem(id: { eq: $portfolioItemId }) {
      title
      relationships {
        field_client {
          ...clientInfo
        }
        field_service_area {
          ...serviceAreaLink
        }
        field_team_members {
          ...teamMemberInfo
        }
      }
      path {
        alias
      }
      field_body {
        processed
      }
      field_date(formatString: "MMMM YYYY")
    }
  }
`

const PortfolioItemPage = ({ data }) => {
  const portfolioItem = {
    title: data.nodePortfolioItem.title,
    body: data.nodePortfolioItem.field_body.processed,
  }

  const serviceArea = serviceAreaFromInfo(
    data.nodePortfolioItem.relationships.field_service_area
  )

  const client = clientFromInfo(
    data.nodePortfolioItem.relationships.field_client
  )

  const teamMembers = teamMembersFromInfo(
    data.nodePortfolioItem.relationships.field_team_members
  )

  return (
    <div>
      <Helmet title={portfolioItem.title} htmlAttributes={{ lang: "en" }} />
      <BackToPortfolioLink />
      <Client {...client} />
      <PortfolioItem {...portfolioItem} />
      <h2>Team members who worked on this project</h2>
      <TeamMembers teamMembers={teamMembers} />
      <ServiceAreaLink {...serviceArea} />
    </div>
  )
}

const BackToPortfolioLink = () => (
  <Link to="/portfolio">Back to our portfolio</Link>
)

export const PortfolioItem = ({ title, body, path }) => {
  return (
    <div>
      {path && (
        <h3>
          <Link to={path}>{title}</Link>
        </h3>
      )}
      {!path && <h1>{title}</h1>}
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

export default PortfolioItemPage
