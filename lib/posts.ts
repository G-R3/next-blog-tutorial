import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "posts");

export function getSortedPostData() {
    const fileNames = fs.readdirSync(postDirectory);
    const allPostData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);
        return {
            id,
            ...(matterResult.data as { date: string; title: string }),
        };
    });

    return allPostData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else if (a.date > b.date) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                // we use id here because the file is named [id].js
                // it would be key if we named it [ket].js or slug if it was [slug].js
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const htmlContent = processedContent.toString();

    return {
        id,
        htmlContent,
        ...(matterResult.data as { date: string; title: string }),
    };
}
