import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

export const query = graphql`
  query AllArticles {
    allNodeArticle {
      nodes {
        title
        id
        field_image {
          alt
        }
        relationships {
          field_image {
            localFile {
              childImageSharp {
                fixed(width: 250) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        body {
          summary
        }
        path {
          alias
        }
      }
    }
  }
`

const ArticlesPage = ({ data }) => {
  const articles = data.allNodeArticle.nodes.map(node => ({
    id: node.id,
    title: node.title,
    path: node.path.alias,
    summary: node.body.summary,
    imageData: node.relationships.field_image.localFile.childImageSharp.fixed,
    imageAlt: node.field_image.alt,
  }))

  return (
    <>
      <Link to="/">Home</Link>
      <h2>Articles</h2>
      <ArticlesList articles={articles} />
    </>
  )
}

const ArticlesList = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>
          <Link to={article.path}>
            <Image fixed={article.imageData} />
            {article.title}
            <p>{article.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ArticlesPage
