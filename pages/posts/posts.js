(() => {
    'use strict';

    // function createPost(counter) {
    //     const body = JSON.stringify({
    //         data : {
    //             title: " Article N° " + counter,
    //             content: "Du super contenu !",
    //             users_permissions_user: uid,
    //             likes: 0
    //         }
    //     });

    //     fetch('http://localhost:1337/api/posts', {
    //         method: "POST",
    //         body: body,
    //         headers: {
    //             Authorization: `Bearer ${jwt}`,
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log(result);
    //             displayPosts(result.data);
    //         })
    //         .catch(error => {
    //             console.log("Une erreur est survenue : ", error);
    //         });
    // }

    // for(let i = 1; i <= 75; i++) {
    //     createPost(i);
    // }

    HEADER_SERVICE.init();

    const { jwt, uid }  = JSON.parse(window.sessionStorage.strapitestbruno2404);

    

    function getPosts() {
        const urlParams = 'populate[users_permissions_user][fields][0]=username&populate[image][fields][0]=url&populate[image][fields][1]=name';
        fetch('http://localhost:1337/api/posts?'+urlParams, {
            headers: {
                Authorization: `Bearer ${jwt}`
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
        const imageUrl = !post.image.data ? "/uploads/6_c77f4cc3c5.jpg" : post.image.data.attributes.url;
        console.log(post.users_permissions_user)
        return `<li>
            <a href="#">
                <img src="http://localhost:1337${imageUrl}">
                <h2>${post.title}</h2>
                <p>Publié par ${post.users_permissions_user.data.attributes.username}<br> 
                ${UTILS.formatFrenchDate(post.createdAt)}</p>
            </a>
        </li>`;
    }

    getPosts();
})();

