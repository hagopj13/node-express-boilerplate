const getPage = function (userId) {
    window.FB.api(
        `"/${userId}/accounts"`,
        function (response) {
            if (response && !response.error) {
                /* handle the result */
                // we will get the fb page id associated with instagram
                let pageId = response.data[0].id;
            }
        }
    );
}

const getInstagramId = function (pageId) {
    window.FB.api(
        `"/${pageId}?fields=instagram_business_account"`,
        function (response) {
            if (response && !response.error) {
                /* handle the result */
                // we will get the fb page id associated with instagram
                let instaId = response.instagram_business_account.id;
            }
        }
    );
}

const getListOfMedia = function (instaId) {
    window.FB.api(
        `"/${instaId}/media"`,
        function (response) {
            if (response && !response.error) {
                /* handle the result */
                // we will get the fb page id associated with instagram
                let listOfMedia = response.data;
                for (let index = 0; index < listOfMedia.length; index++) {
                    let id = listOfMedia[index].id;
                }
            }
        }
    );
}

const getMedia = function (mediaId) {
    window.FB.api(
        `"/${mediaId}/?fields=permalink"`,
        function (response) {
            if (response && !response.error) {
                /* handle the result */
                // we will get the fb page id associated with instagram
                let bag = {
                    "id": mediaId,
                    "url": response.permalink
                }
            }
        }
    );
}