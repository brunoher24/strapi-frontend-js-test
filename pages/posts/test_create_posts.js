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

    // let counter = 1;
    // const interval = window.setInterval(() => {
    //     counter++
    //     createPost(counter);
    //     if(counter >= 75) {
    //         window.clearInterval(interval);
    //     }
    // }, 500);
    