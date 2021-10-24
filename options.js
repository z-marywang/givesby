async function load_options() {
  chrome.storage.local.get({
    partners: {"Amazon": true, "Altruisto": true, "GivingAssistant": true, "GoodShop": true}
  }, function(items) {
    populateOptions(items.partners);
  });
}

function populateOptions(partners) {
  document.getElementById('Amazon').checked = partners.Amazon;
  document.getElementById('Altruisto').checked = partners.Altruisto;
  document.getElementById('GivingAssistant').checked = partners.GivingAssistant;  
  document.getElementById('GoodShop').checked = partners.GoodShop;
}

// Saves options to chrome.storage
async function save_options() {
  var amazon = document.getElementById('Amazon').checked;
  var altruisto = document.getElementById('Altruisto').checked;
  var givingAssistant = document.getElementById('GivingAssistant').checked;  
  var goodShop = document.getElementById('GoodShop').checked;

  chrome.storage.local.set({
    partners: {"Amazon": amazon, "Altruisto": altruisto, "GivingAssistant": givingAssistant, "GoodShop": goodShop}
  }, function() {
    console.log("Updated Successfully!");
  });
}
  
async function restore_options() {
  load_options();
}

document.addEventListener('DOMContentLoaded', load_options);
document.getElementById('submitit').addEventListener('click', save_options);
document.getElementById('resetit').addEventListener('click', restore_options);
