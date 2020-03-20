import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import indexStyles from "./styles/index.module.sass"
import {Helmet} from "react-helmet"

const BlogIntro = props => {
  return (
    <section>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </section>
  )
}

const BlogPreview = props => {
  return (
    <div className={indexStyles.blogPreview} key={props.node.id}>
      <Link to={props.node.fields.slug}>
        <h3>
          {props.node.frontmatter.title}{" "}
          <span className={indexStyles.date} >
            — {props.node.frontmatter.date}
          </span>
        </h3>
        <p>{props.node.excerpt}</p>
      </Link>
    </div>
  )
}

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.siteMetadata.title}</title>
        <link rel="canonical" href="https://stefandevai.me/" />
      </Helmet>
      <div>
        <BlogIntro
          title={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
        /> 

        {
          data.allMarkdownRemark.edges.map(({ node }) => <BlogPreview node={node} /> )
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fileAbsolutePath: {regex: "/\/blog\//"}}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
