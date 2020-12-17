import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ReadingIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="👋 Hi!" />
        <Bio />
        <p>No readings found. Add markdown posts to "content/reading".</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="👋 Hi!" />
      <Bio />
      <div className="reading-list">
        {posts.map(post => {
          const title = post.frontmatter.title

          return (
            <article key={post.fields.slug}>
              {post.frontmatter.image ? (
                <Link to={post.fields.slug} itemProp="url">
                  <Img
                    fixed={post.frontmatter.image.childImageSharp.fixed}
                    alt={post.frontmatter.title}
                  />
                </Link>
              ) : (
                ""
              )}
              <div className="title-author">
                <h2>
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                {post.frontmatter.author ? (
                  <h3>{post.frontmatter.author}</h3>
                ) : (
                  ""
                )}
              </div>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default ReadingIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "reading" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
          collection
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          author
          description
          image {
            childImageSharp {
              fixed(width: 180, quality: 100) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  }
`
