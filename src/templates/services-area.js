import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import Helmet from "react-helmet"
import { PortfolioItem } from "./portfolio-item"
import { TeamMember, teamMemberFromInfo } from "../components/team-member"

export const query = graphql`
  query ServicesArea($servicesAreaId: String!) {
    nodeServicesArea(id: { eq: $servicesAreaId }) {
      path {
        alias
      }
      id
      title
      field_services_area_description {
        processed
      }
      field_icon {
        alt
      }
      relationships {
        node__portfolio_item {
          title
          path {
            alias
          }
          field_body {
            summary
          }
          field_date(formatString: "MMMM YYYY")
        }
        field_icon {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        node__team_member {
          ...teamMemberInfo
        }
      }
    }
  }
`

const ServicesAreaPage = ({ data }) => {
  const service = {
    title: data.nodeServicesArea.title,
    body: data.nodeServicesArea.field_services_area_description.processed,
    image: {
      data:
        data.nodeServicesArea.relationships.field_icon.localFile.childImageSharp
          .fluid,
      alt: data.nodeServicesArea.field_icon.alt,
    },
  }

  const portfolioItemWithLink = {
    title: data.nodeServicesArea.relationships.node__portfolio_item[0].title,
    body:
      data.nodeServicesArea.relationships.node__portfolio_item[0].field_body
        .summary,
    path:
      data.nodeServicesArea.relationships.node__portfolio_item[0].path.alias,
  }

  const teamMember = teamMemberFromInfo(
    data.nodeServicesArea.relationships.node__team_member[0]
  )

  return (
    //   Need: stuff about the service
    //   Examples of our work in this area
    //   People in our team who work in this area
    <div>
      <Helmet title={service.title} htmlAttributes={{ lang: "en" }} />
      <ReadMoreServicesLink />
      <Service {...service} />
      <h2>An example of our work in this area</h2>
      <PortfolioItem {...portfolioItemWithLink} />
      <h2>Team members who work in this area</h2>
      <TeamMember {...teamMember} />
    </div>
  )
}

const ReadMoreServicesLink = () => (
  <Link to="/services">Back to our services</Link>
)

const Service = ({ title, body, image }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Image fluid={image.data} alt={image.alt} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

export default ServicesAreaPage
