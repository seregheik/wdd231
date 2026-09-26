const params = new URLSearchParams(window.location.search);

const membershipNames = {
    np: "NP Membership (Non-Profit)",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
};

function formatValue(field, value) {
    if (field === "membership") {
        return membershipNames[value] || value;
    }
    if (field === "timestamp") {
        const date = new Date(value);
        return Number.isNaN(date.getTime())
            ? value
            : date.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });
    }
    return value;
}

document.querySelectorAll("#application-details dd").forEach((dd) => {
    const field = dd.dataset.field;
    const value = params.get(field);
    dd.textContent = value ? formatValue(field, value) : "Not provided";
});
