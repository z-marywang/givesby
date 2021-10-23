function check_url(url) {
    let reg = new RegExp("google.com");
    var matches = url.match(reg);
    if (matches != null && matches.length != null) {
        return true;
    }
    return false;
}

console.log("Printing from content!");
console.log(window.domain);
console.log(window.location.href);
let url = window.location.href;
console.log(check_url(url));
chrome.runtime.sendMessage(url);
