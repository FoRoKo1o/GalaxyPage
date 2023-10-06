document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".item");
    let openItem = null;

    items.forEach(function (item) {
        item.addEventListener("click", function () {
            if (openItem !== null && openItem !== this) {
                // Close the previously open item
                openItem.classList.remove("expanded");
                const openItemBody = openItem.querySelector(".itemBody");
                openItemBody.classList.remove("itemBodyVisible");
                const openIframe = openItemBody.querySelector("iframe");
                openIframe.style.height = "1px";
                openIframe.style.width = "1px";
            }

            // Toggle the "expanded" class to expand the item
            this.classList.toggle("expanded");

            // Find the corresponding itemBody and toggle the "itemBodyVisible" class to fade it in
            const itemBody = this.querySelector(".itemBody");
            itemBody.classList.toggle("itemBodyVisible");

            // Find the iframe and toggle its height and width styles
            const iframe = itemBody.querySelector("iframe");
            if (iframe.style.height === "100%") {
                iframe.style.height = "1px"; // Set it back to 1px to collapse
                iframe.style.width = "1px";
            } else {
                iframe.style.height = "70vh"; // Expand it to 70% of the screen height
                iframe.style.width = "80vh"; // Set width to auto
            }

            // Update the openItem to the current item
            openItem = this.classList.contains("expanded") ? this : null;
        });
    });
});
