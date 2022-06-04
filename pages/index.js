import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Date from "../components/Date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostData } from "../lib/posts";
// import Script from "next/script";

export async function getStaticProps(context) {
    const posts = getSortedPostData();
    return {
        props: {
            posts,
        },
    };
}

export default function Home({ posts }) {
    return (
        <Layout home={true}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* 

            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload" // how this script should be loaded
                onLoad={() =>
                    console.log(
                        `script loaded correctly, window.FB has been populated`,
                    )
                }
            />
            
            */}

            <section className={utilStyles.headingMd}>
                <p>
                    Hello I'm Gerardo and I'm just trying out Next.js. I want to
                    learn it so that I can build some cool stuff with it.
                </p>
                <p>
                    (This is a sample website - you'll be building a site like
                    this on{" "}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>
                    .)
                </p>
            </section>

            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {posts.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}
