
// get name and url and valet form

var siteName = document.getElementById("SiteName");
var siteURL = document.getElementById("URLName");
var nameTestRegex = /^\w{3,}(\s+\w+)*$/;
var urlTestRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;





// get bout
var submitBtn = document.getElementById("addbook");
var closeBtn = document.getElementById("closeBt");
var deleteBtns;
var visitBtns;




// get elment to add 
var tableContent = document.getElementById("tableContent");
var boxInfo = document.getElementById("box-info");



var bookmarks = [];


// box alert function
function closebut() {
  boxInfo.classList.add("d-none");
}



// valeed Text
function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}





// Events
siteName.addEventListener("input", function () {
  validate(siteName, nameTestRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlTestRegex);
});







submitBtn.addEventListener("click", function () {

  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);

    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxInfo.classList.remove("d-none");
  }
  
  clerData()
});







function displayBookmark(indexOfWebsite) {

  var userURL = bookmarks[indexOfWebsite].siteURL;
  var newBookmark = `
 <tr>
 <td>${indexOfWebsite + 1}</td>
 <td>${bookmarks[indexOfWebsite].siteName}</td>              
 <td>
  <button class="btn btn-visit" data-index="${indexOfWebsite}">
  <a href="https://www.${userURL}" class="link-dark"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
  </button>
 </td>
 <td>
  <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
  <i class="fa-solid fa-trash-can"></i> Delete </button>
 </td>
</tr>
 `;
  tableContent.innerHTML += newBookmark;


  deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (var i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener("click", function (e) {
        deleteBook(e);
      });
    }
  }


}





function deleteBook(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

function clerData(){
  siteName.value="";
  siteURL.value=""
}

