const btnId=document.getElementById('delete-user')
btnId.onclick=function(){
    const id=btnId.dataset.id
    console.log(id)
    axios.get('/events/delete/'+id)
    .then((res)=>{
        if(res.data){
            alert('the user was deleted');
            window.location.href='/events';
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}