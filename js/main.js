var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");

var popUp = document.querySelector(".pop-up");
var closeBtn = document.getElementById("closeBtn")

var searchInput = document.getElementById("searchInput")

var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var clearBtn = document.getElementById("clearBtn")
var testBtn = document.getElementById("testBtn")


var siteContainer;
if(localStorage.getItem('bookmarkSites') === null){  // user is new
    siteContainer = [];
    clearBtn.classList.add("d-none")
    testBtn.classList.remove("d-none")
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
    clearForm()
    popUp.classList.replace("d-flex", "d-none")    
    clearBtn.classList.remove("d-none")
}else{
    popUp.classList.replace("d-none", "d-flex")    
}
}

function clearForm(){
    siteName.value = null;
    siteURL.value = null;
    siteName.classList.remove("is-valid")
    siteURL.classList.remove("is-valid")
}

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
            <button onclick="getValues(${i})" class="btn btn-success mb-1">
            <i class="fa-solid fa-edit"></i>
                update
            </button>
            <button onclick="deleteSite(${i})" class="btn btn-danger mb-1">
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

    if(siteContainer.length == 0){
        clearBtn.classList.add("d-none")
        testBtn.classList.remove("d-none")
    }
}

// validate Inputs
var regex = {
    siteName: /^([A-Z]|[a-z]|[0-9]){3,}$/,
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

// change value of site
var updateIndex;
function getValues(index){
    console.log(index)
    updateIndex = index;
    siteName.value = siteContainer[index].name;
    siteURL.value = siteContainer[index].URL;

    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")

    siteName.classList.add("is-valid")
    siteURL.classList.add("is-valid")
}

function updateSite(updateIndex){
    siteContainer[updateIndex].name = siteName.value;
    siteContainer[updateIndex].URL = siteURL.value;

    var site = {
        name: siteName.value,
        URL: siteURL.value
    }
if(regex.siteName.test(site.name) && regex.siteURL.test(site.URL)){
        displaySite(siteContainer);
        localStorage.setItem("bookmarkSites", JSON.stringify(siteContainer))
        clearForm()
    
        addBtn.classList.remove("d-none")
        updateBtn.classList.add("d-none")
    }else{
        popUp.classList.replace("d-none", "d-flex")    
    }
}

function clearAll(){
    localStorage.clear()
    siteContainer = [];
    displaySite(siteContainer);
    clearBtn.classList.add("d-none")
    testBtn.classList.remove("d-none")
}

function addTestData(){
    var testData = [
        {name: "gmail", URL: "mailto:khaledradwan96@gmail.com"},
        {name: "linkedin", URL: "https://www.linkedin.com/in/khaledradwan96/"},
        {name: "facebook", URL: "https://www.facebook.com/khaldradwan96/"},
        {name: "github", URL: "https://github.com/khaledradwan96"},
    ]
    siteContainer = testData;
    displaySite(siteContainer);
    localStorage.setItem("bookmarkSites", JSON.stringify(siteContainer))
    testBtn.classList.add("d-none")
    clearBtn.classList.remove("d-none")
}