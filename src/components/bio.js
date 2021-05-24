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
              I’m a student and teacher of people-first growth. Having spent the
              major part of the last two decades building weird businesses that
              tried to be good for humans, I'm now working privately on a few
              experimental projects and cultivating this little digital space of
              mine.
            </p>
            <p>
              If you're new here, I'm working on my second book,{" "}
              <a href="http://peoplefirstgrowth.com">People-First Growth</a>{" "}
              (slowly, slowly said the sloth), and I’m sharing what I learn in
              my <Link to="/newsletter">newsletter</Link>. If you geek out on
              digital gardening, I share mine publicly on{" "}
              <a href="http://roam.sarahavenir.com">Roam</a>. You can say
              hi on <a href="https://twitter.com/sarahavenir">Twitter</a> or by{" "}
              <a href="mailto:sarahavenir@hey.com">email</a>.
            </p>
            <p>
              You can also read my first book,{" "}
              <a href="https://gatherthepeople.com">Gather the People</a>,
              originally released in 2015 and updated in 2020 (what a year for a
              book release). It's a human approach to marketing for people who
              would rather make what they love than persuade people to buy it.
              If that's you, I hope it helps.
            </p>
            <nav>
              <Link to="/writing">
                <span role="img" aria-label="writing">
                  ✍️
                </span>{" "}
                Writing
              </Link>
              <Link to="/reading">
                <span role="img" aria-label="books">
                  📚
                </span>{" "}
                Reading
              </Link>
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
