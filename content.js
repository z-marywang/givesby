// check if the current domain merits generating an alert
async function check_domain(current_domain_stripped, current_domain, last_domain, partners) {
    console.log("Comparing " + current_domain + " and " + last_domain);
    if (current_domain == last_domain) {
        console.log("Same domain!")
        //return null;
    }

    let smile_reg = new RegExp("smile.amazon.com");
    let amazon_reg = new RegExp("amazon.com");
    if (current_domain.match(amazon_reg) && !current_domain.match(smile_reg)) {
        console.log("Ssmile")
        process_matches(current_domain_stripped, ["Amazon"], partners);
        return null;
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
            console.log(urls_json);
            console.log(current_domain_stripped);
            if (urls_json.hasOwnProperty(current_domain_stripped)) {
                console.log("url match!");
                let matches = urls_json[current_domain_stripped];
                console.log(matches);
                process_matches(current_domain_stripped, matches, partners)
                // return matches;
            } else {
                console.log("no url match")
            }
        });
}

// returns the highest price found on the page. Only works with $
function getHighestPrice() {
    const re = new RegExp(/\$(\d)+[.,](\d\d)/g);
    const matches = document.documentElement.innerHTML.match(re);
    if (matches != null) {
        let max = 0.0;
        for (let i = 0; i < matches.length; i++) {
            let currPrice = parseFloat(matches[i].replace("$", ""));
            if (currPrice > max) {
                max = currPrice;
            }
        }
        console.log(max)
        console.log("You could donate up to $" + (max * 0.20).toFixed(2));
        return max * 0.20;
    }
}

// returns the last visited domain
async function get_last_domain() {
    chrome.storage.local.get({
        domain: "",
        partners: {"Amazon": true, "Altruisto": true, "GivingAssistant": true, "GoodShop": true}
    }, function(items) {
        console.log("got last domain as " + items.domain);
        process_get_result(items.domain, items.partners);
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

// checks if any of the partners for a site are enabled
function partnersEnabled(partners, matches) {
    console.log("partners see matches as " + matches);
    for (let i = 0; i < matches.length; i++) {
        if (partners[matches[i]]) {
            return true;
        }
    }
    return false;
}

// main processing behavior
async function process_get_result(last_domain, partners) {
    let current_url = window.location.href;
    let current_domain = (new URL(current_url));
    let current_domain_stripped = current_domain.hostname.replace('www.','');
    console.log("currently on " + current_domain_stripped);
    check_domain(current_domain_stripped, String(current_domain), last_domain, partners);
}

function process_matches(current_domain_stripped, matches, partners) {
    console.log("matches " + matches);
    if (matches != null && partnersEnabled(partners, matches)) {
        let price = getHighestPrice(); // TODO: ADD TO DIALOG
        console.log()
        if (matches.includes("Amazon")) {
            console.log("popup ples")
            show_amazon_popup();
        } else {
            show_general_popup(matches);
        }
    }

    set_last_domain(current_domain_stripped);
}

// Amazon popup
function show_amazon_popup() {
    // TODO: make custom popup
    // alert("Amazon bad");
    // chrome.tabs.create({url: "popup.html"});

    // chrome.runtime.sendMessage("Amazon");

    const css_url = chrome.runtime.getURL('./styles.css')

    fetch(css_url)
    .then(response => response.text())
    .then(text => document.head.innerHTML += '<style>' + text + '</style>');

    const url = chrome.runtime.getURL("./dialog.html")

    fetch(url)
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML += html;
        var dialog = document.querySelector("dialog")
        dialog.querySelector("button").addEventListener("click", function() {
            dialog.close()
        })
        dialog.showModal()
    });
    
}

// Show other popup
function show_general_popup(sites) {
    const css_url = chrome.runtime.getURL('./styles.css')

    fetch(css_url)
    .then(response => response.text())
    .then(text => document.head.innerHTML += '<style>' + text + '</style>');

    const url = chrome.runtime.getURL("./general_dialog.html")

    fetch(url)
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML += html;
        var dialog = document.querySelector("dialog")
        dialog.querySelector("button").addEventListener("click", function() {
            dialog.close()
        })
        dialog.showModal()
    });
}

get_last_domain();

// chrome.runtime.sendMessage(url);
