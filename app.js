const apiUrl ="https://66f91c962a683ce97310eef3.mockapi.io/API/v1/post";

function fetchPost(){
    fetch(apiUrl)
    .then(responce => responce.json())
    .then(data=>{
        console.log(data);
        
    })
    .catch(error=> console.log(`error` ,error)
    )
}
fetchPost()