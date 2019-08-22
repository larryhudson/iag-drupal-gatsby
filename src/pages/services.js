import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import Helmet from "react-helmet"

export const query = graphql`
  query AllServicesAreas {
    allNodeServicesArea {
      nodes {
        title
        id
        field_services_area_description {
          summary
        }
        field_icon {
          alt
        }
        relationships {
          field_icon {
            localFile {
              childImageSharp {
                fixed(width: 250) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        path {
          alias
        }
      }
    }
  }
`

const ServicesAreasPage = ({ data }) => {
  const servicesAreas = data.allNodeServicesArea.nodes.map(node => ({
    id: node.id,
    title: node.title,
    path: node.path.alias,
    body: node.field_services_area_description.summary,
    icon: {
      data: node.relationships.field_icon.localFile.childImageSharp.fixed,
      alt: node.field_icon.alt,
    },
  }))

  return (
    <>
      <Helmet title="Our services" htmlAttributes={{ lang: "en" }} />
      <Link to="/">Home</Link>
      <h2>Our services</h2>
      <ServicesAreasList servicesAreas={servicesAreas} />
    </>
  )
}

const ServicesAreasList = ({ servicesAreas }) => {
  return (
    <ul>
      {servicesAreas.map(servicesArea => (
        <li key={servicesArea.id}>
          <Link to={servicesArea.path}>
            <Image fixed={servicesArea.icon.data} alt={servicesArea.icon.alt} />
            {servicesArea.title}
            <div dangerouslySetInnerHTML={{ __html: servicesArea.body }} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ServicesAreasPage
