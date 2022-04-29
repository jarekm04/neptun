import { db } from "../firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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
            location.reload();
        })
});