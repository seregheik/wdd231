const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

document.querySelectorAll(".open-modal").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById(link.dataset.modal).showModal();
    });
});

document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.querySelector(".close-modal").addEventListener("click", () => dialog.close());
});
