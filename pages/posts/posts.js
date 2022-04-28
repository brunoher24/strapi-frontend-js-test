(() => {
    'use strict';
    HEADER_SERVICE.init();

    const { jwt }  = JSON.parse(window.sessionStorage.strapitestbruno2404);
    
    let pageNumber = 1;
    let pageCount;
    let selectedCategory = null;
    let _posts = [];
    let _categories = [];
    
    const postsList =  document.getElementById("posts-list");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const pageIndicator = document.getElementById("page-indicator");
    const postCategories = document.getElementById("post-categories");
    

    loadMoreBtn.addEventListener("click", () => {
        if(pageNumber === pageCount) {
            return;
        } 
        pageNumber++;
        getPosts({filterCategoryId: selectedCategory});

        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          );
        const interval = setInterval(() => {
            window.scrollBy(0, 40);
            if(window.scrollY >= scrollHeight) {
                clearInterval(interval);
            }
        }, 20)
    });
    

    function getPosts(options = {}) {
        let urlFilter = "";
        if(options.filterCategoryId) {
            urlFilter = `filters[category][id][$eq]=${options.filterCategoryId}&`  
        }
        const urlPopulate   = 'populate[users_permissions_user][fields][0]=username&populate[image][fields][0]=url&populate[image][fields][1]=name&populate[category][fields][0]=name';
        const urlPagination = `pagination[page]=${pageNumber}&pagination[pageSize]=10`;
        fetch(`http://localhost:1337/api/posts?${urlFilter}${urlPopulate}&${urlPagination}`, {
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

    function addCategoryToNavMenu(category) {
        const li = document.createElement("li");
        postCategories.appendChild(li);
        const button = document.createElement("button");
        button.innerText = category.attributes.name;
        li.appendChild(button);
        button.addEventListener("click", () => {
            filterPostsByCategory(category.id)
        });
    }

    function filterPostsByCategory(categoryId) {
        pageNumber = 1;
        pageCount = 1;
        _posts = [];
        postsList.innerHTML = "";
        selectedCategory = categoryId;
        getPosts({filterCategoryId: categoryId})
    }

    function getCategories() {
        fetch('http://localhost:1337/api/categories', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(response => response.json())
            .then(result => {
                _categories = result.data;
                _categories.forEach(category => {
                    addCategoryToNavMenu(category);
                });
            })
            .catch(error => {
                console.log("Une erreur est survenue : ", error);
            });
    }

    function displayPosts(posts) {
        let htmlStr = "";
        posts.forEach(post => {
            _posts.push(post);
            htmlStr += generatePostHtml(post.attributes);
        });
        postsList.innerHTML += htmlStr;
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
    getCategories();
})();

