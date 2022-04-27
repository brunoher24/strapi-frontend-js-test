(() => {
    'use strict';

    HEADER_SERVICE.init();

    const apiToken = window.sessionStorage.strapitestbruno2404;

    function getPosts() {
        const urlParams = 'populate[users_permissions_user][fields][0]=username&populate[image][fields][0]=url&populate[image][fields][1]=name';
        console.log(apiToken);
        fetch('http://localhost:1337/api/posts?'+urlParams, {
            headers: {
                Authorization: `Bearer ${apiToken}`
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                displayPosts(result.data);
            })
            .catch(error => {
                console.log("Une erreur est survenue : ", error);
            });
    }

    function displayPosts(posts) {
        let htmlStr = "";
        posts.forEach(post => {
            htmlStr += generatePostHtml(post.attributes);
        });
        document.getElementById("posts-list").innerHTML = htmlStr;
    }
    
    function generatePostHtml(post) {
        return `<li>
            <a href="#">
                <img src="http://localhost:1337${post.image.data.attributes.url}">
                <h2>${post.title}</h2>
                <p>Publié par ${post.users_permissions_user.data.attributes.username}<br> 
                ${UTILS.formatFrenchDate(post.createdAt)}</p>
            </a>
        </li>`;
    }

    getPosts();
})();


