/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import React from "react"
import Image from "gatsby-image"

export const clientFromInfo = clientInfo => {
  return {
    name: clientInfo.title,
    website: {
      title: clientInfo.field_client_website.title,
      uri: clientInfo.field_client_website.uri,
    },
    description: clientInfo.field_client_description.processed,
    logo: {
      data:
        clientInfo.relationships.field_client_logo.localFile.childImageSharp
          .fluid,
      alt: clientInfo.field_client_logo.alt,
    },
  }
}

export const Client = ({ name, logo, website, description }) => {
  return (
    <div>
      <h2>Client: {name}</h2>
      <Image fluid={logo.data} alt={logo.alt} />
      <a href={website.uri}>{website.title}</a>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

export const clientFragment = graphql`
  fragment clientInfo on node__portfolio_client {
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
`
