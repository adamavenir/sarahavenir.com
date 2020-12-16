/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
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
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
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
        <p>
          I write a <a href="/newsletter">newsletter</a> and{" "}
          <a href="http://roam.sarahavenir.com">
            share what I’m learning on Roam
          </a>{" "}
          and in my book-in-progress,{" "}
          <a href="http://peoplefirstgrowth.com">People-First Growth</a>. You
          might also be interested in my first book,{" "}
          <a href="https://gatherthepeople.com">Gather the People</a>. We do a
          lot at <a href="https://andyet.com">&yet</a> that might interest you,
          too. You can <a href="https://ask.sarahavenir.com">ask me anything</a>
          .
        </p>
      )}
    </div>
  )
}

export default Bio
