import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ReadingPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const pageTitle = post.frontmatter.title + " by " + post.frontmatter.author

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={pageTitle}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1 className="section-title">
        <Link to="/reading">« Reading nook</Link>
      </h1>
      <div className="global-wrapper">
        <article
          className="reading-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="reading-title-author">
            <h1 itemProp="headline">
              <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
            </h1>
            {post.frontmatter.author ? <h2>{post.frontmatter.author}</h2> : ""}
            {post.frontmatter.image ? (
              <Img
                fixed={post.frontmatter.image.childImageSharp.fixed}
                alt={post.frontmatter.title}
                className="reading-image"
              />
            ) : (
              ""
            )}
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <hr />
          <footer>
            <Bio />
          </footer>
        </article>
        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  )
}

export default ReadingPostTemplate

export const pageQuery = graphql`
  query ReadingPostBySlug(
    $id: String!
    $previousReadingId: String
    $nextReadingId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
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
    previous: markdownRemark(id: { eq: $previousReadingId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextReadingId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
