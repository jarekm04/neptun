import { db } from "../firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const $form = document.querySelector("form");
const $icon = document.getElementById("icon");
const $name = document.getElementById("name");
const $newsContent = document.getElementById("newsInfo");
const $isPopover = document.getElementById("popoverNews");
const $optionalTimeDiv = document.querySelector(".optionalTime")
const $popoverTime = document.getElementById("popoverNewsTime");
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

    // addDoc(collection(db, "News"), {
    //     date: new Date().toLocaleDateString(),
    //     icon: $icon.value,
    //     name: $name.value.charAt(0).toUpperCase() + $name.value.slice(1),
    //     newsContent: $newsContent.value.charAt(0).toUpperCase() + $newsContent.value.slice(1),
    //     isPopover: $isPopover.value,
    //     popoverTime: $isPopover.value,
    // })
    //     .then(() => {
    //         $form.reset();
    //     })
});