exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query Articles {
      allNodeArticle {
        nodes {
          id
          path {
            alias
          }
        }
      }

      allNodePortfolioItem {
        nodes {
          id
          path {
            alias
          }
        }
      }

      allNodeServicesArea {
        nodes {
          id
          path {
            alias
          }
        }
      }

      allNodePage {
        nodes {
          id
          path {
            alias
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  result.data.allNodeArticle.nodes.forEach(article => {
    actions.createPage({
      path: article.path.alias,
      component: require.resolve("./src/templates/article.js"),
      context: {
        articleId: article.id,
      },
    })
  })

  result.data.allNodePortfolioItem.nodes.forEach(portfolioItem => {
    actions.createPage({
      path: portfolioItem.path.alias,
      component: require.resolve("./src/templates/portfolio-item.js"),
      context: {
        portfolioItemId: portfolioItem.id,
      },
    })
  })

  result.data.allNodeServicesArea.nodes.forEach(servicesArea => {
    actions.createPage({
      path: servicesArea.path.alias,
      component: require.resolve("./src/templates/services-area.js"),
      context: {
        servicesAreaId: servicesArea.id,
      },
    })
  })

  result.data.allNodePage.nodes.forEach(page => {
    actions.createPage({
      path: page.path.alias,
      component: require.resolve("./src/templates/page.js"),
      context: {
        pageId: page.id,
      },
    })
  })
}
