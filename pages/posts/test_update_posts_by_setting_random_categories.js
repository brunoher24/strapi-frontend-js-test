function setRandomCategoryToPost(postId) {
    const body = JSON.stringify({
        data : {
            category: _categories[Math.floor(Math.random() * _categoriesLength)].id
        }
    });

    fetch('http://localhost:1337/api/posts/'+postId, {
        method: "PUT",
        body: body,
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log("Une erreur est survenue : ", error);
        });
}

function setRandomCategoriesToPosts() {
    _posts.forEach(post => {
        setRandomCategoryToPost(post.id);
    });
}