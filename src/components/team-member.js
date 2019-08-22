import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"

export const TeamMember = ({ name, position, image, quote, body }) => {
  return (
    <>
      <h3>
        {name} - {position}
      </h3>
      <Image fluid={image.data} alt={image.alt} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  )
}

export const teamMemberFragment = graphql`
  fragment teamMemberInfo on node__team_member {
    id
    title
    field_team_member_position
    field_quote
    field_team
    field_team_member_body {
      processed
    }
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
  }
`

export const teamMemberFromInfo = teamMemberInfo => {
  console.log(teamMemberInfo)
  return {
    name: teamMemberInfo.title,
    position: teamMemberInfo.field_team_member_position,
    body: teamMemberInfo.field_team_member_body.processed,
    image: {
      alt: teamMemberInfo.field_team_member_image.alt,
      data:
        teamMemberInfo.relationships.field_team_member_image.localFile
          .childImageSharp.fluid,
    },
  }
}

export const teamMembersFromInfo = teamMembersInfo => {
  return teamMembersInfo.map(teamMemberInfo =>
    teamMemberFromInfo(teamMemberInfo)
  )
}

export const TeamMembers = ({ teamMembers }) => {
  return (
    <ul>
      {teamMembers.map(member => (
        <TeamMember key={member.id} {...member} />
      ))}
    </ul>
  )
}
