let userName;
let userEmail;
let userPassword;
let errorHandling;
let logoutBtn=document.querySelector('nav button')

let userInfo
localStorage.getItem("userInfo")==null?userInfo=[]:userInfo=JSON.parse(localStorage.getItem("userInfo"));
console.log(userInfo)
if(localStorage.getItem('loggedin')!=null){
    document.querySelector('nav').classList.toggle('d-none');
    document.querySelector('#view').innerHTML=`<h1>Welcome ${JSON.parse(localStorage.getItem('loggedin')).name}</h1>`
}

function login(){
    userEmail=document.getElementById('email');
    userPassword=document.getElementById('password');
    errorHandling=document.querySelector(".errorHandling");
    let checkUserPresence=(user)=>user.email==userEmail.value&&user.password==userPassword.value;
    if(userEmail.value.length==0||userPassword.value.length==0){
        errorHandling.innerHTML='All inputs required';
    }
    else if(userInfo.filter(checkUserPresence).length==0){   
        errorHandling.innerHTML='incorrect email or password';
    }
    else if(userInfo.filter(checkUserPresence).length!=0){
        document.querySelector('nav').classList.toggle('d-none')
        document.querySelector('#view').innerHTML=`<h1>Welcome ${userInfo.filter(checkUserPresence)[0].name}</h1>`
        localStorage.setItem('loggedin',JSON.stringify(userInfo.filter(checkUserPresence)[0]))
    }

}
logoutBtn.addEventListener('click',function(){
    document.querySelector('nav').classList.toggle('d-none');
    switchToView('signin');
    localStorage.removeItem('loggedin')
})

function signUp(){
    userName=document.getElementById('name');
    console.log(userEmail=document.getElementById('email'));
    userPassword=document.getElementById('password');
    errorHandling=document.querySelector(".errorHandling");
    let checkEmailPresence=(user)=>user.email==userEmail.value;
    if(userEmail.value.length==0||userPassword.value.length==0||userName.value.length==0){
        errorHandling.innerHTML='All inputs required';
        errorHandling.classList.replace('text-success','text-danger');
    }
    else if(validateEmail()){
        if(userInfo.filter(checkEmailPresence).length==0){
            console.log('in')
            let newUser={
                name:userName.value,
                email:userEmail.value,
                password:userPassword.value
            }
            userInfo.push(newUser);
            localStorage.setItem('userInfo',JSON.stringify(userInfo));
            errorHandling.innerHTML='Success';
            errorHandling.classList.replace('text-danger','text-success');
    
        }
        else{
            errorHandling.innerHTML='email already exists'
            errorHandling.classList.replace('text-success','text-danger');
    
        }

    }
    else{
        errorHandling.innerHTML='Email is incorrect (ex:example@mail.com)'
        errorHandling.classList.replace('text-success','text-danger');
    }
   

}
function switchToView(viewtype){
     if(viewtype=='signup'){
        document.querySelector('#view').innerHTML=`
        <h1>Smart Login System</h1>
        <input type="text" id="name" class="form-control mt-4 mb-3" placeholder="Enter your name">
        <input type="text" id="email" class="form-control mb-3" placeholder="Enter your email">
        <input type="password" id="password" class="form-control" placeholder="Enter password">
        <p class="errorHandling text-danger mt-3 "></p>
        <a class="btn btn-outline-info my-4 text-decoration-none" onclick='signUp()' >Sign Up</a>
       <p class="text-white">You have an account? <a href="#" onclick='switchToView("signin")' >Sign In</a></p>
       `
     }
     else if(viewtype=='signin'){
        document.querySelector('#view').innerHTML=`
        <h1>Smart Login System</h1>
        <input type="text" id="email" class="form-control mt-4 mb-3" placeholder="Enter your email">
        <input type="password" id="password" class="form-control" placeholder="Enter your password">
        <p class="errorHandling text-danger mt-3"></p>
        <a class="btn btn-outline-info my-4 text-decoration-none" onclick='login()'>Login</a>
        <p class="text-white">Don't have an account? <a href="#" onclick='switchToView("signup")' >Sign Up</a></p>
        `
     }
    
 }


function validateEmail(){
    let regexEmail=/^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i;
    return regexEmail.test(userEmail.value)
}
