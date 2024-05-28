var siteName = document.getElementById("siteName")
var siteURL = document.getElementById("siteURL")

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

    siteContainer.push(site)
    localStorage.setItem("bookmarkSites", JSON.stringify(siteContainer))
    displaySite(siteContainer)
    siteName.value = null;
    siteURL.value = null;
}

function displaySite(arr){
    var cartona = "";
    for(var i=0; i<arr.length; i++){
        cartona +=`
        <tr>
        <td>${i+1}</td>
        <td class="fw-bold">${arr[i].name}</td>
        <td>
            <a href="${arr[i].URL}" target="_blank" class="btn btn-success">
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

function validateInputs(element){
    var regex = {
        siteName: /^([A-Z]|[a-z]){3,}$/,
        siteURL: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i
    }
    if(regex[element.id].test(element.value)){
        console.log("match")
    }else{
        console.log("no match")
    }
}
