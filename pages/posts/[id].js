import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

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

export function getStaticProps({ params }) {
    const postData = getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
    );
}
