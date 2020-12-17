import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PageTemplate = ({ data, location }) => {
  const page = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description || page.excerpt}
      />
      <article
        className="blog-page"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{page.frontmatter.title}</h1>
          <p>{page.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: page.html }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
      }
    }
  }
`
