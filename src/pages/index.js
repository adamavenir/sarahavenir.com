import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SiteIndex = ({ data, location }) => {
  const siteTitle = "Sarah Avenir"

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="👋 Hi!" />
      <Bio />
    </Layout>
  )
}

export default SiteIndex
