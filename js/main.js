var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var popUp = document.querySelector(".pop-up");
var closeBtn = document.getElementById("closeBtn")
var searchInput = document.getElementById("searchInput")


var siteContainer;
if(localStorage.getItem('bookmarkSites') === null){  // user is new
    siteContainer = []
    }else{ // user have storage data
    siteContainer = JSON.parse(localStorage.getItem('bookmarkSites'));
    displaySite(siteContainer);
    };  

function addSite(){
    var site = {
        name: siteName.value,
        URL: siteURL.value
    }

if(regex.siteName.test(site.name) && regex.siteURL.test(site.URL)){
    siteContainer.push(site)
    localStorage.setItem("bookmarkSites", JSON.stringify(siteContainer))
    displaySite(siteContainer)
    siteName.value = null;
    siteURL.value = null;
    popUp.classList.replace("d-flex", "d-none")    
}else{
    popUp.classList.replace("d-none", "d-flex")    
}
}

console.log(popUp)

function displaySite(arr){
    var cartona = "";
    for(var i=0; i<arr.length; i++){
        cartona +=`
        <tr>
        <td>${i+1}</td>
        <td class="fw-bold">${arr[i].name}</td>
        <td>
            <a href="${arr[i].URL}" target="_blank" class="btn btn-info">
                <i class="fa-solid fa-eye pe-2"></i>
                Visit
            </a>
        </td>
        <td>
            <button onclick="deleteSite(${i})" class="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </td>
    </tr>
        `
    }
    document.getElementById("tableContent").innerHTML = cartona
}

function deleteSite(index){
    console.log(index) // for get index of click
    siteContainer.splice(index, 1);
    localStorage.setItem("bookmarkSites", JSON.stringify(siteContainer))
    displaySite(siteContainer);
}

// validate Inputs
var regex = {
    siteName: /^([A-Z]|[a-z]){3,}$/,
    siteURL: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i
}

function validateInputs(element){
    if(regex[element.id].test(element.value)){
        console.log("match")
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
    }else{
        console.log("no match")
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
    }
}

// close pop-up
function closePopUp(){
    popUp.classList.add("d-none")
}

closeBtn.addEventListener("click", closePopUp)

function search(){
    var term = searchInput.value;
    console.log(term)
    var box=[];
    for(var i=0; i<siteContainer.length; i++){
        if(siteContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            box.push(siteContainer[i])
        }
    }
    displaySite(box)
};