import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
            ...matterResult.data,
        };
    });

    return allPostData.sort(({ data: a }, { data: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
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

export function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
        id,
        ...matterResult.data,
    };
}