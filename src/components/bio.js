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
              Having spent the major part of the last two decades building weird businesses that
              tried to be good for people, I'm a bit done talking about that topic. I still wear my business hat daily, but I don't care to write about it, at least not often. I'd rather write about secret impossible things. Also things that are true. 
            </p>
            <p>
              I'm now working privately on a few experimental projects, one of which I'll be sharing in my <Link to="/newsletter">newsletter</Link> very soon. (Also, that newsletter? It only goes out when there's news. Sometimes there's no news for months.) If you're interested in digital gardening, I share what I'm learning in my public{" "}
              <a href="http://roam.sarahavenir.com">Roam</a>. It may not make sense to anyone but me, but you can at least see what I'm reading and the passages that are speaking to me as I read them. You can say
              hi on <a href="https://twitter.com/sarahavenir">Twitter</a> (I'm still quietly there, for some reason) or by{" "}
              <a href="mailto:sarahavenir@hey.com">email</a>.
            </p>
            <p>
              If you like reading about thoughtful business topics, you can read my first book,{" "}
              <a href="https://gatherthepeople.com">Gather the People</a>,
              originally released in 2015 and updated in 2020. It was the book I needed as a bootstrapping business owner with the heart of an artist/hermit, and if that's you, I hope it helps.
            </p>
            <p>
              I may not be very loud on the Internet anymore, but I'm still here, taking this thing one step at a time. I do not know how to categorize what it is that I'm doing here, but I like Mary Ruefle's description of the member of the band who hits the triangle from time to time. I probably should find my own description, but I will gratefully point her way in the meantime.
            </p>
            <p><em>Last updated: January 13, 2022</em></p>
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
                Newslettering
              </Link>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Bio;
