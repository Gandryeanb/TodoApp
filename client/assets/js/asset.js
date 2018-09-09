function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log(googleUser.getAuthResponse().id_token);
    
    $.ajax({
        method : 'GET',
        url: 'http://localhost:3000/user/login/google',
        headers: {
            "token" : googleUser.getAuthResponse().id_token
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem(
            "token",response.token
        )
        window.location.href = 'profile.html'
    })
    .catch(err => {
        if (err.responseJSON.message === 'already signUp') {

        }
    })
}

function isThisRightPass(password) {

    let Uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let Lowercase = Uppercase.toLowerCase()
    let numbers = '1234567890'

    let UppercaseStatus = false
    let LowercaseStatus = false
    let numbersStatus = false

    for (let i = 0; i < password.length; i++) {
        for (let j = 0; j < Uppercase.length; j++) {
            if (password[i] === Uppercase[j]) {
                UppercaseStatus = true
            }
        }

        for (let j = 0; j < Lowercase.length; j++) {
            if (password[i] === Lowercase[j]) {
                LowercaseStatus = true
            }
        }

        for (let j = 0; j < numbers.length; j++) {
            if (password[i] === numbers[j]) {
                numbersStatus = true
            }
        }
    }

    // console.log(UppercaseStatus, LowercaseStatus, numbersStatus);
    

    if (UppercaseStatus && LowercaseStatus && numbersStatus) {
        return true
    } else {
        return false
    }

}

function isThisRightEmail(email) {
    
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
    if (regex.test(String(email).toLowerCase())) {
        return true
    } else {
        return false
    }
}

function validation(fName,lName,phone,email,password,cb) {
    
    let response = {
        valid : 1,
        fName : [],
        lName : [],
        phone : [],
        email : [],
        password : []
    }

    if (fName === '') {
        response.valid = 0
        response.fName.push('First name must be filled')
        
    }
    
    if (fName.length < 3) {
        response.valid = 0
        response.fName.push('First name must contains 3 characters')
    }
    

    if (phone === '') {
        response.valid = 0
        response.phone.push('Phone number must be filled')
    }
    if (phone.length < 9 || phone.length > 14) {
        response.valid = 0
        response.phone.push('Phone number length must be min 10 and max 13 characters')
    }


    if (email === '') {
        response.valid = 0
        response.email.push('Email must be filled')
    }
    if (!isThisRightEmail(email)) {
        response.valid = 0
        response.email.push('Email is invalid')
    }

    if (password === '') {
        response.valid = 0
        response.password.push('Password must be filled')
    }
    if (password.length < 8) {
        response.valid = 0
        response.password.push('Password length must be greater than 8')
    }
    if (!isThisRightPass(password)) {
        response.valid = 0
        response.password.push('Password must be contains number or character and atleast 1 Uppercase character')
    }


    cb(response)
}

function register() {
    let fName = $("#fName").val()
    let lName = $("#lName").val()
    let phone = $("#phone").val()
    let email = $("#email").val()
    let password = $("#password").val()
    
    validation(fName,lName,phone,email,password,response => {
        if (response.valid !== 1)  {
            
            if (response.fName[0]) {
                $('.fNameRegistNotif').text(`${response.fName[0]}`)
                $('.fNameRegistNotif').show()
                $(".fNameRegistNotif").effect("shake",{distance:10},)
            } else {
                $('.fNameRegistNotif').hide()
            }
            if (response.lName[0]) {
                $('.lnameRegistNotif').text(`${response.lname[0]}`)
                $('.lnameRegistNotif').show()
                $(".lNameRegistNotif").effect("shake",{distance:10},)
            } else {
                $('.lNameRegistNotif').hide()
            }
            if (response.phone[0]) {
                $('.phoneRegistNotif').text(`${response.phone[0]}`)
                $('.phoneRegistNotif').show()
                $(".phoneRegistNotif").effect("shake",{distance:10},)
            } else {
                $('.phoneRegistNotif').hide()
            }
            if (response.email[0]) {
                $('.emailRegistNotif').text(`${response.email[0]}`)
                $('.emailRegistNotif').show()
                $(".emailRegistNotif").effect("shake",{distance:10},)
            } else {
                $('.emailRegistNotif').hide()
            }
            if (response.password[0]) {
                $('.passwordRegistNotif').text(`${response.password[0]}`)
                $('.passwordRegistNotif').show()
                $(".passwordRegistNotif").effect("shake",{distance:10},)
            } else {
                $('.passwordRegistNotif').hide()
            }

        } else {
            
            let obj = {
                fName,
                lName,
                phone,
                email,
                password
            }
        
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/user/register",
                data: obj
            })
            .done(response => {
                window.location.href = "index.html"
            })
            .fail(err => {
                console.log(err)
            })
        }
    })

}

function login() {

    let email = $("#email").val()
    let password = $("#password").val()

    let obj = {
        email,
        password
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: obj
    })
    .done(response => {
        localStorage.setItem("token", response.token)
        window.location.href = "profile.html"
    })
    .fail(err => {
        $('.loginNotif').show()
        $(".loginNotif").effect("shake",{distance:10},)
        $(".loginNotif").fadeOut(4000)
    })
}

function whoIsThis() {
    let token = localStorage.getItem("token");
    console.log(token);
    
    if (token !== null) {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/user/profile",
            headers: {
                "token": token
            }
        })
        .done(response => {
            if (response.status == 0) {
                
                window.location.href = "index.html"
            }
            
            $('#logger').text(`Welcome ${response.name}`)
        })
        .fail(err => {
            console.log('Gagal login who is this')
        })
    } else {
        window.location.href = "index.html"
    }
}

function activityList() {

    let token = localStorage.getItem("token");
    
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/user/activity/undone",
        headers: {
            "token": token
        }
    })
    .done(response => {
        $("#list-tab").text("")
        $("#nav-tabContent").text("")

        
        for (let j = 0; j < response.data.length; j++) {

            let date = `${new Date(response.data[j][0].dueDate).getDate()}-${new Date(response.data[j][0].dueDate).getMonth()+ 1}-${new Date(response.data[j][0].dueDate).getFullYear()}`
            
            if (j == 0) {
                $("#list-tab").append(`
                
                <a class="list-group-item list-group-item-action active" id="list-${date}-list" data-toggle="list"
                href="#list-${date}" role="tab" aria-controls="${date}">${date}<span id="notifSumTodo${date}" class="badge badge-light ml-2">${response.data[j].length}</span></a>

                `)

                $("#nav-tabContent").append(`
                    <div class="tab-pane fade show active" id="list-${date}" role="tabpanel" aria-labelledby="list-${date}-list">
                        <div class="card-activity-${date} row card-of-card" id="card-activity">

                        </div>
                    </div>
                `)

            } else {
                $("#list-tab").append(`
                
                <a class="list-group-item list-group-item-action" id="list-${date}-list" data-toggle="list" href="#list-${date}"
                    role="tab" aria-controls="profile">${date}<span  id="notifSumTodo${date}" class="badge badge-light ml-2">${response.data[j].length}</span></a>

                `)

                $("#nav-tabContent").append(`
                    <div class="tab-pane fade" id="list-${date}" role="tabpanel" aria-labelledby="list-${date}-list">
                        <div class="card-activity-${date} row card-of-card" id="card-activity">

                        </div>
                    </div>
                `)
            }
            for (let i = 0; i < response.data[j].length; i++) {

                    $(`.card-activity-${date}`).append(`
                    <div class="card text-right card-todo ${response.data[j][i]._id}" style="width: 12rem; ">
                        <div class="card-body">
                            <h5 class="card-title" id="name-${response.data[j][i]._id}">${response.data[j][i].name}</h5>
                            <p class="card-text" id="desc-${response.data[j][i]._id}">${response.data[j][i].description}</p>
                            <p class="card-text" id="date-${response.data[j][i]._id}">${date}</p>

                            <div class="dropdown">
                                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Option
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button class="dropdown-item" type="button" data-toggle="modal" data-target="#editActivity" onclick="modalUpdate('${response.data[j][i]._id}','${response.data[j][i].name}','${response.data[j][i].description}','${date}')">Edit</button>
                                    <button class="dropdown-item" type="button" onclick="deleteActivity('${response.data[j][i]._id}','${date}')">Delete</button>
                                </div>
                            </div>

                            <button type="button" onclick="doneActivity('${response.data[j][i]._id}')" class="btn btn-success btn-sm mt-2">Mark as done</button>
                        </div>
                    </div>
                    `)
            }

        }

    })
    .fail(err => {
        window.location.href = "index.html"
    })
}

function historyList () {
    
    let token = localStorage.getItem("token");

    $.ajax({
        method : "GET",
        url : "http://localhost:3000/user/activity/done",
        headers : {
            "token" : token
        }
    })
    .done( response => {
        $("#accordion").text("")

        for (let i = 0; i < response.data.length; i++) {


            let date = `${new Date(response.data[i][0].dueDate).getDate()}-${new Date(response.data[i][0].dueDate).getMonth()+ 1}-${new Date(response.data[i][0].dueDate).getFullYear()}`

            $("#accordion").append(`
            <div class="card-header" id="heading${date}" style="height : 50px; padding-top:3px;">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${date}"
                        aria-expanded="true" aria-controls="collapse${date}" style="text-align: center;">
                        <h5 style="padding-left: 50px;">${date}</h5> 
                    </button>
                </h5>
            </div>

            <div id="collapse${date}" class="collapse" aria-labelledby="heading${date}" data-parent="#accordion">

            </div>
            `)

            for (let j = 0; j < response.data[i].length; j++) {
                $(`#collapse${date}`).append(`
                <div class=" list-group">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" onclick="historyModal('${response.data[i][j].name}','${response.data[i][j].description}')" data-toggle="modal" data-target="#displayHistory">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${response.data[i][j].name}</h6>
                            <small>3 days ago</small>
                        </div>
                    </a>
                </div>
                `)
            }
        }
    })
    .catch(err => {

    })

}

function historyModal(name, description) {

    $('.historyName').text('')
    $('.historyName').append(`${name}`)

    $('.historyDescription').text('')
    $('.historyDescription').append(`${description}`)
}

function modalUpdate(id,name,description,date) {

    let newDate = date.split('-')
    newDate.reverse()
    newDate = newDate.join('-')
    
    $("#edit-id").val(`${id}`)
    $("#edit-name").val(`${name}`)
    $("#edit-description").val(`${description}`)
    $("#edit-date").val(`${newDate}`)
}

function editActivity() {

    let token = localStorage.getItem("token");

    let data = {
        id : $("#edit-id").val(),
        name : $("#edit-name").val(),
        description :  $("#edit-description").val(),
        date : $("#edit-date").val()
    }

    $.ajax({
        method : "PUT",
        url : `http://localhost:3000/user/activity`,
        headers : {
            "token": token
        },
        data : data
    })
    .done(response => {
        activityList()
    })
    .catch(err => {
        
    })

}

function deleteActivity(_id,date) {

    let token = localStorage.getItem("token");

    $.ajax({
        method : "DELETE",
        url : `http://localhost:3000/user/activity/${_id}`,
        headers : {
            "token": token
        }
    })
    .done(response => {
        let sum = $(`#notifSumTodo${date}`).text()
        sum = sum-1

        if (sum == 0) {
            $(`#list-${date}-list`).remove()
            $(`#list-${date}`).remove()
        }

        $(`#notifSumTodo${date}`).text(`${sum}`)
        $(`.${_id}`).fadeOut(2000).delay(2000).remove()
    })
    .catch(err => {

    })
}

function doneActivity(id) {

    let token = localStorage.getItem("token");

    $.ajax({
        method : "PUT",
        url : `http://localhost:3000/user/activity/done`,
        headers : {
            "token": token
        },
        data : {
            id : id
        }
    })
    .done(response => {
        activityList()
        historyList()        
    })
    .catch(err => {

    })
}


function logout() {

    localStorage.removeItem("token")
    signOut()
    window.location.href = "https://accounts.google.com/logout"
    
    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:8080/index.html";
}

$("#addBtn").click(() => {

    let token = localStorage.getItem("token");

    let data = {
        name : $("#add-name").val(),
        description : $("#add-description").val(),
        date : $("#add-date").val()
    }
    
    $.ajax({
        method : "POST",
        url : "http://localhost:3000/user/activity",
        headers : {
            "token": token
        },
        data : data
    })
    .done(response => {
        activityList()

        $("#add-id").val(``)
        $("#add-name").val(``)
        $("#add-description").val(``)
        $("#add-date").val(``)
    })  
    .catch(err => {

    })      
})

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
