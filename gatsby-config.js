module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-drupal",
      options: {
        baseUrl: "http://dev-iag-drupal-gatsby2.pantheonsite.io/",
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
  ],
}
