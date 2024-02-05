// Set Variables Here

const theName = document.querySelector(".theName"),
  theClose = document.querySelector(".close"),
  theLightHouse = document.querySelector(".lightbox"),
  theInpText = document.querySelector(".theInpText"),
  theTextArea = document.querySelector("#desc"),
  theBtn = document.querySelector(".theBtn"),
  thePlus = document.querySelector(".plus"),
  theForm = document.querySelector("form"),
  theHeading = document.querySelector(".theName");

// Set Option's
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let myArray = [];
let idEdit,
  isEdit = false;

// Get Data From LocalStorage
let theNoteFromLocalStroage = window.localStorage.getItem("theNote");

if (theNoteFromLocalStroage != null) {
  myArray = JSON.parse(theNoteFromLocalStroage);
}

// Trigger Function add Data To Dom
showDataToDom(myArray);

theForm.onsubmit = function (e) {
  e.preventDefault();
  generateData();
};

thePlus.addEventListener("click", () => {
  theLightHouse.classList.add("show");

  theInpText.value = "";

  theTextArea.value = "";

  theBtn.innerHTML = "انشاء";

  theHeading.innerHTML = "اضف ملاحظة جديدة";
});

theClose.addEventListener("click", () => {
  theLightHouse.classList.remove("show");
  isEdit = false;
});

function generateData() {
  if (theInpText.value && theTextArea.value) {
    let date = new Date();
    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    // Create Dummy data

    let theData = {
      title: theInpText.value,
      desc: theTextArea.value,
      theDate: `${month} , ${day} , ${year}`,
    };
    if (isEdit) {
      myArray[idEdit] = theData;
    } else {
      myArray.push(theData);
    }
    // Save To LocalStorage => Array;
    window.localStorage.setItem("theNote", JSON.stringify(myArray));
    // ShowDataToDom
    showDataToDom(myArray);
    theClose.click();
  }
}

function showDataToDom(data) {
  document.querySelectorAll(".card").forEach((card) => card.remove());
  // Looping On Data
  data.forEach((item, indx) => {
    let theMarkUp = `
      <div class="card-style card">
        <div class="head-text">
          <h2>${item.title}</h2>
          <p>${item.desc}</p>
        </div>
        <div class="controls">
        <div class="time">
        <span>${item.theDate}</span>
        </div>
          <div class="edits">
            <i class="fa-solid fa-ellipsis item"></i>
            <ul class="links">
              <li onclick="getDataInfo(${indx}, '${item.title}','${item.desc}')">
                <i class="fa-solid fa-pen-to-square"></i>
                تعديل
              </li>
              <li onclick="removeItem(${indx}, '${item.title}')">
                <i class="fa-solid fa-trash"></i>
                حذف
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
    document.querySelector(".add").insertAdjacentHTML("afterend", theMarkUp);
  });
}

function removeItem(theIndx, theTitleOfTask) {
  let theConfirmed = confirm(
    `Do You Agree To Remove This Task With Name ${theTitleOfTask} !?`
  );
  if (theConfirmed) {
    myArray.splice(theIndx, 1);
    // UpdateLocalStorage
    window.localStorage.setItem("theNote", JSON.stringify(myArray));
    // Trigger Function ShowDataToDom
    showDataToDom(myArray);
  }
}

function getDataInfo(theIndx, theTitle, theDescription) {
  idEdit = theIndx;
  isEdit = true;
  thePlus.click();

  theBtn.innerHTML = "تحديث البيانات";

  theInpText.value = theTitle;

  theTextArea.value = theDescription;

  theHeading.innerHTML = "تحديث الملاحظة الخاصة بك 🥰";
}
