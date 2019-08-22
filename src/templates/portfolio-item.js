import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

export const query = graphql`
  query PortfolioItem($portfolioItemId: String!) {
    nodePortfolioItem(id: { eq: $portfolioItemId }) {
      relationships {
        field_client {
          title
          field_client_website {
            title
            uri
          }
          field_client_logo {
            alt
          }
          relationships {
            field_client_logo {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
          field_client_description {
            value
          }
        }
        field_service_area {
          title
          path {
            alias
          }
        }
        field_team_members {
          title
          field_team_member_image {
            alt
          }
          relationships {
            field_team_member_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
          field_team_member_position
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

  const serviceAreaInfo =
    data.nodePortfolioItem.relationships.field_service_area

  const serviceArea = {
    title: serviceAreaInfo.title,
    path: serviceAreaInfo.path.alias,
  }

  const clientInfo = data.nodePortfolioItem.relationships.field_client

  const client = {
    name: clientInfo.title,
    logo: {
      data:
        clientInfo.relationships.field_client_logo.localFile.childImageSharp
          .fluid,
      alt: clientInfo.field_client_logo.alt,
    },
    website: {
      title: clientInfo.field_client_website.title,
      uri: clientInfo.field_client_website.uri,
    },
    description: clientInfo.field_client_description.value,
  }

  const teamMembersInfo =
    data.nodePortfolioItem.relationships.field_team_members

  const teamMembers = teamMembersInfo.map(teamMember => {
    return {
      name: teamMember.title,
      position: teamMember.field_team_member_position,
      image: {
        alt: teamMember.field_team_member_image.alt,
        data:
          teamMember.relationships.field_team_member_image.localFile
            .childImageSharp.fluid,
      },
    }
  })

  return (
    <div style={{ maxWidth: "48em", margin: "0 auto" }}>
      <BackToPortfolioLink />
      <Client {...client} />
      <PortfolioItem {...portfolioItem} />
      <TeamMembers teamMembers={teamMembers} />
      <ServiceArea {...serviceArea} />
    </div>
  )
}

const BackToPortfolioLink = () => (
  <Link to="/portfolio">Back to our portfolio</Link>
)

const TeamMember = ({ name, position, image }) => {
  return (
    <>
      <h2>
        {name} - {position}
      </h2>
      <Image fluid={image.data} alt={image.alt} />
    </>
  )
}

const TeamMembers = ({ teamMembers }) => {
  return (
    <ul>
      {teamMembers.map(member => (
        <TeamMember {...member} />
      ))}
    </ul>
  )
}

const Client = ({ name, logo, website, description }) => {
  return (
    <div>
      <h2>Client: {name}</h2>
      <Image fluid={logo.data} alt={logo.alt} />
      <a href={website.uri}>{website.title}</a>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

const PortfolioItem = ({ title, body, imageData, imageAlt }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

const ServiceArea = ({ title, path }) => {
  return (
    <div>
      Service area: <Link to={path}>Easy Read</Link>
    </div>
  )
}

export default PortfolioItemPage
