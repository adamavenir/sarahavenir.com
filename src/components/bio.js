/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Image from "gatsby-image";

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
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  // const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed;

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
          <p>the place where we once had a picnic<br />is now underwater  <br /></p><p>that one thick branch <br />of the shade tree <br />is now hovering<br />over the rippling surface</p><p>its trunk submerged&mdash;<br />holding its breath<br />for us</p>
            <p><em>Last updated: August 8, 2023</em></p>
            <nav>
              <Link to="/writing">
                <span role="img" aria-label="blog">
                  ✍️
                </span>{" "}
                Blog
              </Link>
              <a href="https://roamresearch.com/#/app/sarahavenir-public/page/HUmka1p1h">
                <span role="img" aria-label="books">
                  📚
                </span>{" "}
                Reading
              </a>
              <Link to="/newsletter">
                <span role="img" aria-label="mailbox">
                  📬
                </span>{" "}
                Emailing
              </Link>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Bio;
