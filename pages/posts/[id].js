import Head from "next/head";
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export function getStaticPaths() {
    // this must be an array of objects like this:
    /**
     * [
     *      {
     *          params: {
     *              id: "id-of-post"
     *          }
     *      }
     * ]
     */
    // we use id because the file name is [id].js

    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}

// we use id because the file name is [id].js
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: postData.htmlContent }}
                />
            </article>
        </Layout>
    );
}
