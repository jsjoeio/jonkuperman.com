import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import WebMentions from '../utils/webmentions.js';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const BlogPostTemplate = ({ data, pageContext, location }) => {
    const post = data.mdx;
    const siteTitle = data.site.siteMetadata.title;
    const { previous, next } = pageContext;
    console.log(post.fields.readingTime);

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <article className="List">
                <header>
                    <h1
                        style={{
                            marginTop: 10,
                            marginBottom: 0,
                        }}
                    >
                        {post.frontmatter.title}
                    </h1>
                    <div className="metadata">
                        <span>{post.fields.readingTime.text}</span> - posted on{' '}
                        <span>{post.frontmatter.date}</span>
                    </div>
                </header>
                <MDXRenderer>{post.body}</MDXRenderer>
                <hr
                    style={{
                        marginBottom: 10,
                    }}
                />
                <Bio />
            </article>

            <WebMentions url={location.href} />

            <nav>
                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li>
                        {previous && (
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        mdx(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            body
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
            fields {
                readingTime {
                    text
                }
            }
        }
    }
`;
