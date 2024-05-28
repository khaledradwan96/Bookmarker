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
        <td>${arr[i].name}</td>
        <td>
            <a href="${arr[i].URL}" target="_blank" class="btn btn-success">
                <i class="fa-solid fa-eye"></i>
                Visit
            </a>
        </td>
        <td>
            <button class="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>
        </td>
    </tr>
        `
    }
    document.getElementById("tableContent").innerHTML = cartona
}
