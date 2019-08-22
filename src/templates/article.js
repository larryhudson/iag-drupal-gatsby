import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import Helmet from "react-helmet"

export const query = graphql`
  query Article($articleId: String!) {
    nodeArticle(id: { eq: $articleId }) {
      title
      body {
        processed
      }
      field_image {
        alt
      }
      relationships {
        field_image {
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
  }
`

const ArticlePage = ({ data }) => {
  const article = {
    title: data.nodeArticle.title,
    body: data.nodeArticle.body.processed,
    imageData:
      data.nodeArticle.relationships.field_image.localFile.childImageSharp
        .fluid,
    imageAlt: data.nodeArticle.field_image.alt,
  }

  return (
    <div>
      <Helmet title={article.title} htmlAttributes={{ lang: "en" }} />
      <ReadMoreArticlesLink />
      <Article {...article} />
    </div>
  )
}

const ReadMoreArticlesLink = () => (
  <Link to="/articles">Read more articles</Link>
)

const Article = ({ title, body, imageData, imageAlt }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Image fluid={imageData} alt={imageAlt} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

export default ArticlePage
