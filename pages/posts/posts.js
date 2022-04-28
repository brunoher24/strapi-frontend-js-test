(() => {
    'use strict';

    function createPost(counter) {
        const body = JSON.stringify({
            data : {
                title: " Article N° " + counter,
                content: "Du super contenu !",
                users_permissions_user: uid,
                likes: 0
            }
        });

        fetch('http://localhost:1337/api/posts', {
            method: "POST",
            body: body,
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json"
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

    // let counter = 1;
    // const interval = window.setInterval(() => {
    //     counter++
    //     createPost(counter);
    //     if(counter >= 75) {
    //         window.clearInterval(interval);
    //     }
    // }, 500);
    

    HEADER_SERVICE.init();

    const { jwt, uid }  = JSON.parse(window.sessionStorage.strapitestbruno2404);
    let pageNumber = 1;
    let pageCount;
    const loadMoreBtn = document.getElementById("load-more-btn");
    const pageIndicator = document.getElementById("page-indicator");

    loadMoreBtn.addEventListener("click", () => {
        if(pageNumber === pageCount) return;
        pageNumber++;
        getPosts();
        console.log(pageNumber, pageCount);
    });
    

    function getPosts() {
        const urlPopulate   = 'populate[users_permissions_user][fields][0]=username&populate[image][fields][0]=url&populate[image][fields][1]=name';
        const urlPagination = `pagination[page]=${pageNumber}&pagination[pageSize]=10`;
        fetch('http://localhost:1337/api/posts?'+urlPopulate+"&"+urlPagination, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(response => response.json())
            .then(result => {
                pageCount = result.meta.pagination.pageCount;
                pageIndicator.innerHTML = `Page ${pageNumber}/${pageCount}`;
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
        document.getElementById("posts-list").innerHTML += htmlStr;
    }
    
    function generatePostHtml(post) {
        const imageUrl = !post.image.data ? "/uploads/6_c77f4cc3c5.jpg" : post.image.data.attributes.url;
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

