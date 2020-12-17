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
              I’m the CEO of <a href="https://andyet.com">&yet</a> and a student
              and teacher of people-first growth. While working on{" "}
              <a href="http://peoplefirstgrowth.com">my second book</a>, I’m
              sharing what I learn in my{" "}
              <Link to="/newsletter">newsletter</Link> and on{" "}
              <a href="http://roam.sarahavenir.com">Roam</a>. You can{" "}
              <a href="https://ask.sarahavenir.com">ask me anything</a> or say
              hi on <a href="https://twitter.com/sarahavenir">Twitter</a> or by{" "}
              <a href="mailto:sarahavenir@hey.com">email</a>.
            </p>
            <p>
              I recently released the second edition of my first book,{" "}
              <a href="https://gatherthepeople.com">Gather the People</a>, a
              human approach to marketing for people who would rather make what
              they love than persuade people to buy it.
            </p>
            <nav>
              <Link to="/writing">✍️ Writing</Link>
              <Link to="/reading">📚 Reading</Link>
              <Link to="/newsletter">📬 Newslettering</Link>
            </nav>
          </div>
        )}
      </div>
    </>
  )
}

export default Bio
