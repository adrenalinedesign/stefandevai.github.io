import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import PostPreview from "../components/post-preview"
import indexStyles from "./styles/index.module.sass"

const BlogIntro = props => {
  return (
    <section className={indexStyles.blogIntro}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </section>
  )
}

export default ({ data }) => {
  return (
    <Layout>
      <SEO titleTemplate={`%s`}/>
        <BlogIntro
          title={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
        /> 

      <div>
        {
          data.allMarkdownRemark.edges.map(({ node }, index) => <PostPreview node={node} key={index} /> )
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
            date(formatString: "DD-MMM-YYYY")
            language
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
