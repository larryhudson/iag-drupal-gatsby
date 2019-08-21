module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-drupal",
      options: {
        baseUrl: "http://dev-larryhudson-gatsby.pantheonsite.io/",
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
