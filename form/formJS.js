import { db } from "../firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const $form = document.querySelector("form");
const $icon = document.getElementById("icon");
const $title = document.getElementById("title");
const $name = document.getElementById("name");
const $newsContent = document.getElementById("newsInfo");
const $isPopover = document.getElementById("popoverNews");
const $optionalTimeDiv = document.querySelector(".optionalTime")
const $popoverTime = document.getElementById("popoverNewsTime");
const $formCheckInput = document.querySelector(".form-check-input");
const $formBtn = document.querySelector(".btn");

$isPopover.addEventListener("change", () => {
    if ($isPopover.value === "yes") {
        $optionalTimeDiv.style.display = "block"
        $popoverTime.setAttribute('required', '');
    } else {
        $optionalTimeDiv.style.display = "none";
        $popoverTime.removeAttribute('required');
    }
})

//-----------form validation and sending data to firebase--------------------------------------------------
$form.addEventListener("submit" , (e) => {
    e.preventDefault();

    if (!$title.value) {
        $title.focus();
        return;
    }

    if (!$name.value) {
        $name.focus();
        return;
    }

    if (!$newsContent.value) {
        $newsContent.focus();
        return;
    }

    if ($isPopover.value === "yes" && !$popoverTime.value) {
        $popoverTime.focus();
        return;
    }

    if (!$formCheckInput.checked) {
        $formCheckInput.focus();
        return;
    }

    addDoc(collection(db, "News"), {
        date: new Date().toLocaleDateString().split(".").reverse().join("."),
        icon: $icon.value,
        title: $title.value.toUpperCase(),
        name: $name.value.charAt(0).toUpperCase() + $name.value.slice(1),
        newsContent: $newsContent.value.charAt(0).toUpperCase() + $newsContent.value.slice(1),
        isPopover: $isPopover.value,
        popoverTime: $popoverTime.value.split("-").join("."),
    })
        .then(() => {
            window.alert("Wysłano formularz z nowym newsem!");
            window.location.reload();
        })
});

//------------fetching data from firebase with possible to delete------------------------------------
const colRef = collection(db, "News");

getDocs(colRef)
    .then((snapshot) => {
        let news = [];
        snapshot.docs.forEach((doc) => {
            news.push({ ...doc.data(), id: doc.id })
        })
        news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        generateNewsAdmin(news);
    })
    .catch(err => {
        console.log(err.message);
    });

function generateNewsAdmin(news) {
    let newsHTML = '';

    news.forEach((item) => {
       newsHTML += `
            <div class="col-6 my-2 news-item">
                <div class="border border-secondary p-3">
                    <h5>Tytuł newsa: ${item.title}</h5>
                    <h6>Data dodania newsa: ${item.date}</h6>
                    <p>Nr newsa: ${item.id}</p>
                    <button class="btn btn-primary deleteNews" data-id="${item.id}">Usuń news z bazy</button>
                </div>
            </div>
       `
    });

    document.querySelector(".news-box").innerHTML = newsHTML;
    deleteNewsItem();
}

function deleteNewsItem() {
    let $newsItems = document.querySelectorAll(".news-item button");
    $newsItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            const docRef = doc(db, "News", e.target.dataset.id);
            if (e.target.dataset.id === docRef.id) {
                deleteDoc(docRef)
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
        });
    });
}
