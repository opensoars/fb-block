/** Whether to block facebook or not. */
var block = true;

/** Which urls trigger the onBeforeRequest callback. */
var filter = { urls: ['<all_urls>'] };

/** Extra onBeforeRequest info. */
var extras = ['blocking'];

/** List of urls to block, gets looped through onBeforeRequest. */
var urls_to_block = [
  'facebook.com'
];

/**
 * Returns a global variable its value.
 *
 * @param {string} key - Which variable its value to return
 * @return {any} - Global variable its value
 */
function get(key) {
  return window[key];
}

/**
 * Sets a global variable, if the variable already exists, it overwrites.
 *
 * @param {string} key - Global variable name
 * @param {any} value - Value to bind to the global variable
 */
function set(key, value) {
  window[key] = value;
}

/**
 * Gets called before every single request chrome makes. If the global
 * variable block is set to true, blocks all request with urls that contain
 * an (url) string found in the urls_to_block array.
 *
 * @param {object} req - Browser request
 * @return {object} - If it contains 'cancel: true', request will be canceled
 */
function onBeforeRequest(req) {
  // Whether to block the current request, by default its false. Gets set to
  // true if a request its url matches a string found in urls_to_block.
  var cancel_req = false;

  if (!block) {
    return;
  }

  // Loop through urls_to_block and set cancel_req to true if the current
  // request its url matches a string found in urls_to_block.
  urls_to_block.forEach(function (url_to_block) {
    if (req.url.indexOf(url_to_block) !== -1) {
      cancel_req = true;
    }
  });

  if (cancel_req) {
    // Get the current total_blocks and store the new total_blocks value
    // in the storage.
    chrome.storage.sync.get(function (storage) {
      chrome.storage.sync.set({
        total_blocks: storage.total_blocks+1 || 1
      });
    });

    // Get the current session_blocks and store the new session_blocks
    // value in the storage.
    chrome.storage.sync.get(function (storage) {
      chrome.storage.sync.set({
        session_blocks: storage.session_blocks+1 || 1
      });
    });
  }

  return {
    cancel: cancel_req
  };
}

// Set the session_blocks to 0 on extension initialization.
chrome.storage.sync.set({
  session_blocks: 0
});

// Bind the onBeforeRequest function to the chrome onBeforeRequest event
// using the filter and extras defined at the top of this file.
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, filter, extras);