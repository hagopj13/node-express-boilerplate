export const getPage = async function (userId) {
    return new Promise(function (resolve, reject) {
        window.FB.api(
            `${userId}/accounts`,
            function (response) {
                if (response && !response.error) {
                    // we will get the fb page id associated with instagram
                    resolve(response.data[0].id);
                }
            }
        );
    });
}

export const getInstagramId = function (pageId) {
    return new Promise(function (resolve, reject) {
        window.FB.api(
            `${pageId}?fields=instagram_business_account`,
            function (response) {
                if (response && !response.error) {
                    // we will get the fb page id associated with instagram
                    resolve(response.instagram_business_account.id);
                }
            }
        );
    });
}

export const getListOfMedia = function (instaId) {
    return new Promise(function (resolve, reject) {
        window.FB.api(
            `${instaId}/media`,
            function (response) {
                if (response && !response.error) {
                    // we will get the fb page id associated with instagram
                    // array of media
                    resolve(response.data);
                }
            }
        );
    });
}

export const getMedia = function (mediaId) {
    return new Promise(function (resolve, reject) {
        window.FB.api(
            `${mediaId}/?fields=permalink`,
            function (response) {
                if (response && !response.error) {
                    // {
                    //     "permalink": "",
                    //     "id": ""
                    // }
                    resolve(response);
                }
            }
        );
    });

}