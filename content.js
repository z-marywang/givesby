// check if the current domain merits generating an alert
function check_domain(current_domain, last_domain) {
    console.log("Comparing " + current_domain + " and " + last_domain);
    if (current_domain == last_domain) {
        console.log("Same domain!")
        return false
    }

    let reg = new RegExp("google.com");
    var matches = current_domain.match(reg);
    if (matches != null && matches.length != null) {
        return true;
    }
    return false;
}

// returns the last visited domain
async function get_last_domain() {
    chrome.storage.local.get({
        domain: ""
    }, function(items) {
        console.log("got last domain as " + items.domain);
        process_get_result(items.domain);
    });
}

// sets the current to be the last visited domain
async function set_last_domain(new_domain) {
    chrome.storage.local.set({
        domain: new_domain
    }, function() {
        console.log("set domain as " + new_domain);
    });
}

// main processing behavior
async function process_get_result(last_domain) {
    let current_url = window.location.href;
    let current_domain = (new URL(current_url));
    let current_domain_stripped = current_domain.hostname.replace('www.','');
    console.log("currently on " + current_domain_stripped);
    check_domain(current_domain_stripped, last_domain);

    set_last_domain(current_domain_stripped);
}

get_last_domain();

// chrome.runtime.sendMessage(url);
