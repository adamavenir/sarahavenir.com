/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  // const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <>
      <div className="bio">
        {avatar && (
          <Image
            fixed={avatar}
            alt={author?.name || ``}
            className="bio-avatar"
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        )}
        {author?.name && (
          <div className="about-me">
            <p>
              I’m the ceo of <a href="https://andyet.com">&yet</a> and a learner
              and teacher on people-first growth. I write a{" "}
              <a href="https://buttondown.email/sarahavenir">newsletter</a> and
              share what I’m learning on{" "}
              <a href="http://roam.sarahavenir.com">Roam</a> while working on{" "}
              <a href="http://peoplefirstgrowth.com">my second book</a>. You can{" "}
              <a href="https://ask.sarahavenir.com">ask me anything</a>.
            </p>
            <p>
              I recently released the second edition of my first book,{" "}
              <a href="https://gatherthepeople.com">Gather the People</a>, a
              human approach to marketing for people who would rather make what
              they love than persuade people to buy it.
            </p>
            <nav>
              <Link to="/blog">Blog »</Link>
              <Link to="/reading">Reading »</Link>
              <a href="https://buttondown.email/sarahavenir">Newsletter » </a>
            </nav>
          </div>
        )}
      </div>
    </>
  )
}

export default Bio
