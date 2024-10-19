const apiUrl = "https://66f91c962a683ce97310eef3.mockapi.io/API/v1/post";

function fetchPost() {
  fetch(apiUrl)
    .then((responce) => responce.json())
    .then((data) => displayData(data))
    .catch((error) => console.log(`error`, error));
}
fetchPost();

function displayData(post) {
  const postparentDiv = document.getElementById("posts");
  postparentDiv.innerHTML = "";
  post.forEach((post) => {
    // console.log(post);

    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `<div class="post-header" id="postHeader">
                            <img src="${post.avatar}" alt="Avatar">
                            <div>
                                <h3>${post.name}</h3>
                                <h3>${post.tittle}</h3>

                                <small>${post.createdAt}</small>
                            </div>
                        </div>
                        <p>${post.body}</p>
                        <div class="actions">
                            <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                        </div>`;
    postparentDiv.appendChild(postDiv);

    console.log(post);
  });
}
// ======createpost====

document
  .getElementById("createPostForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const tittle = document.getElementById("title").value;
    const avatar = document.getElementById("avatar").value;
    const body = document.getElementById("body").value;
    const newPost = {
      name: name,
      tittle: tittle,
      avatar: avatar,
      body: body,
      createdAt: new Date().toISOString,
    };

    console.log(newPost);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    document.getElementById("name").value = "";
    document.getElementById("title").value = "";
    document.getElementById("avatar").value = "";
    document.getElementById("body").value = "";
  });

// ================DELET==========================

function deletePost(id) {
  fetch(`${apiUrl}/${id}`, {
    method: `DELETE`,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
        console.log(response);
      }
    })
    .then((data) => {
      console.log(data);
      alert(`${data.name}(successfully deleted`);
      fetchPost();
    })

    .catch((error) => console.log(`error`, error));
}
// ==========edit post========
function editPost(id) {
  fetch(`${apiUrl}/${id}`)
    .then((response) => response.json())
    .then((post) => {
      console.log("post ", post);
      document.getElementById("create-post").style.display = "none";
      document.getElementById("update-post").style.display = "block";
      document.getElementById("updatepostForm").name.value = post.name;
      document.getElementById("updatepostForm").tittle.value = post.tittle;
      document.getElementById("updatepostForm").avatar.value = post.avatar;
      document.getElementById("updatepostForm").body.value = post.body;
    })
    .catch((error) => console.log(`error`, error));
  document
    .getElementById("updatepostForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      // console.log("hello i am raning");
      document.getElementById("create-post").style.display = "block";
      document.getElementById("update-post").style.display = "none";
      const name = document.getElementById("name").value;
      const tittle = document.getElementById("title").value;
      const avatar = document.getElementById("avatar").value;
      const body = document.getElementById("body").value;
      const updateData = {
        name: name,
        tittle: tittle,
        avatar: avatar,
        body: body,
        createdAt: new Date().toISOString,
      };

      fetch(`${apiUrl}/${id}`, {
        method: "PUT",
      Headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(updateData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(`${data.name} succesfully update`);

          fetchPost();
       
          console.log(data);
        })
        .catch((error) => console.log(error));

      
    });
}
// ===========ubdate api call========
// document.getElementById("ubdatepostForm").addEventListener("submit",function(e){
//   e.preventDefault()
//   // console.log("hello i am raning");
//   const name = document.getElementById("name").value;
//     const tittle = document.getElementById("title").value;
//     const avatar = document.getElementById("avatar").value;
//     const description = document.getElementById("body").value;
//     const ubdateData = {
//       Name: name,
//       tittle: tittle,
//       avatar: avatar,
//       body: description,
//       createdAt : new Date().toISOString,
//     };

//     fetch(`${apiUrl}/${id}`, {
//       method: "PUT",
//       Headers: {
//         "content-Type": "application",
//       },
//       body: JSON.stringify(ubdateData),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.log(error));

//       console.log("data",name,tittle,avatar,description);
//   });
