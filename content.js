// check if the current domain merits generating an alert
function check_domain(current_domain, last_domain) {
    console.log("Comparing " + current_domain + " and " + last_domain);
    if (current_domain == last_domain) {
        console.log("Same domain!")
        //return null;
    }

    let smile_reg = new RegExp("smile.amazon.com");
    let amazon_reg = new RegExp("amazon.com");
    if (current_domain.match(amazon_reg) && !current_domain.match(smile_reg)) {
        console.log("Ssmile")
        return ["Amazon"];
    }

    // Check for matches in supporting site lists
    // import * as data from "./urls.json";
    // const {urls_json} = data;

    const url = chrome.runtime.getURL("./urls.json")

    fetch(url)
    .then(response => {
       return response.json();
    }).then(
        urls_json => {
            if (urls_json.hasOwnProperty(current_domain)) {
                console.log("url match!");
                let matches = urls_json[current_domain];
                console.log(matches);
                return matches;
            } else {
                console.log("no url match")
            }
        });

    console.log("the end is nigh");
    
    return null;
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

    let const_match = check_domain(current_domain_stripped, last_domain);
    console.log(const_match);
    if (const_match != null) {
        if (const_match.includes("Amazon")) {
            console.log("popup ples")
            show_amazon_popup();
        } else {
            show_general_popup(const_match);
        }
    }

    set_last_domain(current_domain_stripped);
}

// Amazon popup
function show_amazon_popup() {
    // TODO: make custom popup
    alert("Amazon bad");
}

// Show other popup
function show_general_popup(sites) {
    // TODO: make custom popup
    alert("Yay donations");
}

get_last_domain();

// chrome.runtime.sendMessage(url);
