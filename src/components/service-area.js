import React from "react"
import { graphql, Link } from "gatsby"

export const serviceAreaFromInfo = serviceAreaInfo => ({
  title: serviceAreaInfo.title,
  path: serviceAreaInfo.path.alias,
})

export const ServiceAreaLink = ({ title, path }) => (
  <Link to={path}>{title}</Link>
)

export const serviceAreaLinkFragment = graphql`
  fragment serviceAreaLink on node__services_area {
    path {
      alias
    }
    title
  }
`

export const serviceAreaFragment = graphql`
  fragment serviceAreaInfo on node__services_area {
    id
    path {
      alias
    }
    field_icon {
      alt
    }
    field_services_area_description {
      processed
    }
    title
    relationships {
      field_icon {
        localFile {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`
