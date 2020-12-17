import React from "react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SiteIndex = ({ data, location }) => {
  const siteTitle = "Sarah Avenir"

  return (
    <Layout location={location} title={siteTitle}>
      <div className="global-wrapper">
        <SEO title="👋 Hi!" />
        <Bio />
      </div>
    </Layout>
  )
}

export default SiteIndex
