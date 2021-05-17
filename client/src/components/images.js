let data = [
    {
        "resourceUrl": "https://www.instagram.com/p/CIKnYqiJVWT/"
    },
    {
        "resourceUrl": "https://www.instagram.com/p/CHKInMwp2oA/"
    },
    {
        "resourceUrl": "https://www.instagram.com/p/B7wJVICDUrq/"
    },
    {
        "resourceUrl": "https://www.instagram.com/p/B5T_VOwpxFv/"
    },
    {
        "resourceUrl": "https://www.instagram.com/p/B0detbsJdYf/"
    },
];

function getImages() {
    return data.filter(x => {
        if (Math.random() > 0.5)
            return x;
    });
}

export default getImages;