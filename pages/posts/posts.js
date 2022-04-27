(() => {
    'use strict';
    const apiToken = window.sessionStorage.strapitestbruno2404;

    function getPosts() {
        console.log(apiToken);
        fetch('http://localhost:1337/api/posts')
            .then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log("Une erreur est survenue : ", error);
            });
    }
    getPosts()
})();