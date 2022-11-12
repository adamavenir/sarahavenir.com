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
              Nice to meet you! I'm a writer, reader, and aspiring hermit. I love books and food and plants and theater and I'm fascinated by the beauty and terror of being alive on this planet.
            </p>
            <p>In my past life, I was a founder at various times and a CEO at various times, and I now make a living as co-founder and chief of staff at a web3 startup. I do some coaching and consulting on organizational alignment & leadership occasionally (if that's something you need, you can {" "}
             <a href="mailto:sarahavenir@hey.com">email me</a>; I have loads of empathy for anyone trying to make a business work).
            </p>
            <p>
              I invented a celebratory day called {" "}
              <a href="https://itspostday.com">Post Day</a> that happens from time to time. Anyone can celebrate! {" "}
              <a href="https://lovenotetoabook.substack.com">I also write letters to books I have loved</a>. 
            </p>
            <p>
              I have a <Link to="/newsletter">mailing list</Link>, where I share the occasional update about new things I'm making/trying. If you're interested in digital gardening, I share what I'm reading in my public{" "}
              <a href="http://roam.sarahavenir.com">Roam</a>. I am playing around with migrating to{" "}
              <a href="https://tw.town/@sarahavenir">Mastodon</a>, or you can{" "}
              <a href="mailto:sarahavenir@hey.com">email</a> me.
            </p>
            <p>
              If you like reading about thoughtful business topics, you can read my first book,{" "}
              <a href="https://gatherthepeople.com">Gather the People</a>,
              originally released in 2015 and updated in 2020. It was the book I needed as a bootstrapping business owner with the heart of an artist, and if that's you, I hope it helps.
            </p>
            <p><em>Last updated: November 12, 2022</em></p>
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
