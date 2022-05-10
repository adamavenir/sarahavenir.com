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
            <p>
              Nice to meet you! I'm a writer and maker-of-weird-Internet-projects. I love books and food and plants and theater and I'm fascinated by the beauty and terror of being alive on this planet. I make a living as co-founder and chief of staff at a web3 startup, and I do some coaching and consulting on organizational alignment & leadership from time to time. That's all I'll say about that here; you can{" "}
              <a href="mailto:sarahavenir@hey.com">email me</a> if you need something along those lines. 
            </p>
            <p>
              This place is for friends and people who <em>would</em> be friends if we ever got the chance to meet. I invented a celebratory day called {" "}
              <a href="https://itspostday.com">Post Day</a> that happens from time to time. Anyone can celebrate! I have a <Link to="/newsletter">mailing list</Link>, where I share the occasional essay and updates about new things I'm making/trying. If you're interested in digital gardening, I share what I'm reading in my public{" "}
              <a href="http://roam.sarahavenir.com">Roam</a>. I am also on <a href="https://twitter.com/sarahavenir">Twitter</a> sometimes.
            </p>
            <p>
              If you like reading about thoughtful business topics, you can read my first book,{" "}
              <a href="https://gatherthepeople.com">Gather the People</a>,
              originally released in 2015 and updated in 2020. It was the book I needed as a bootstrapping business owner with the heart of an artist/hermit, and if that's you, I hope it helps.
            </p>
            <p><em>Last updated: May 10, 2022</em></p>
            <nav>
              <Link to="/writing">
                <span role="img" aria-label="writing">
                  ✍️
                </span>{" "}
                Writing
              </Link>
              <a href="http://roam.sarahavenir.com">
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
