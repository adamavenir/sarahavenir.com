const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require(`lodash`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // convert images to relative path

  if (_.get(node, "internal.type") === `MarkdownRemark`) {
    const parent = getNode(_.get(node, "parent"))
    let slug

    if (node.frontmatter.slug) {
      // if a slug is defined, use that.
      slug = "/" + node.frontmatter.slug
      // console.log("slug from frontmatter", slug)
    } else {
      // otherwise use the file path
      slug = createFilePath({ node, getNode })
      // console.log("slug from path", slug)
    }

    // TODO: may need to handle blog posts with set slugs differently

    // create collections for subdividing markdown sets
    createNodeField({
      node,
      name: "collection",
      value: _.get(parent, "sourceInstanceName"),
    })

    // create official slug
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define templates
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const readingPost = path.resolve(`./src/templates/reading-post.js`)
  const pagePost = path.resolve(`./src/templates/page-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
              collection
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const allNodes = result.data.allMarkdownRemark.nodes

  const blogNodes = allNodes.filter(node => node.fields.collection === `blog`)
  const readingNodes = allNodes.filter(
    node => node.fields.collection === `reading`
  )
  const pageNodes = allNodes.filter(node => node.fields.collection === `pages`)

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (blogNodes.length > 0) {
    blogNodes.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogNodes[index - 1].id
      const nextPostId =
        index === blogNodes.length - 1 ? null : blogNodes[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  if (readingNodes.length > 0) {
    // console.log(JSON.stringify(readingNodes, null, 2))
    readingNodes.forEach((reading, index) => {
      const previousReadingId = index === 0 ? null : readingNodes[index - 1].id
      const nextReadingId =
        index === readingNodes.length - 1 ? null : readingNodes[index + 1].id

      createPage({
        path: reading.fields.slug,
        component: readingPost,
        context: {
          id: reading.id,
          previousReadingId,
          nextReadingId,
        },
      })
    })
  }

  if (pageNodes.length > 0) {
    // console.log("pageNodes", pageNodes)
    pageNodes.forEach((page, index) => {
      createPage({
        path: page.fields.slug,
        component: pagePost,
        context: {
          id: page.id,
        },
      })
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
