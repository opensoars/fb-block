/** Extension background page. */
var bg = chrome.extension.getBackgroundPage();

/**
 * Extension popup DOM els namespace.
 * @namespace
 */
var els = {
  block_btn: document.getElementById('block_btn'),
  total_blocks_el: document.getElementById('total_blocks'),
  session_blocks_el: document.getElementById('session_blocks'),
  reset_total_btn: document.getElementById('reset_total_btn'),
  reset_session_btn: document.getElementById('reset_session_btn')
};

/**
 * Sets block variable on bg using the bg its set method.
 *
 * @param {bool} value - Value to be bound to the bg its block variabe
 */
function setBlock(value) {
  bg.set('block', value);
}

/**
 * Whether bg is blocking or not, uses bg its get method.
 *
 * @return {bool} - Bg its block variable
 */
function isBlocking() {
  return bg.get('block');
}

/** Toggles bg block variable and toggles block_btn bg (toggleBlockBtnBg). */
function onBlockBtnClick() {
  setBlock(!bg.get('block'));
  toggleBlockBtn();
}

/**
 * Gets called when a reset button gets clicked. Finds out which one was
 * clicked (total or session) and resets the corresponding data from the
 * chrome storage.
 *
 * @param {object} evt - DOM event object, target.id holds which btn as clicked
 */
function onResetBtnClick(evt) {
  var to_set = {};
  
  var to_set_key = evt.target.id.replace(/reset\_/, '').replace(/\_btn/, '') +
        '_blocks';

  to_set[to_set_key] = 0

  chrome.storage.sync.set(to_set);
}

/** Toggles background color of the block_btn according to block status. */
function toggleBlockBtnBg() {
  els.block_btn.style.background = isBlocking() ? 'green' : 'red';
}

/** Toggles textContent of the block_btn according to block status. */
function toggleBlockBtnText() {
  els.block_btn.textContent = isBlocking() ? 'Blocking :)' : 'NOT blocking :(';
}

/** Calls all block_btn toggle functions. */
function toggleBlockBtn() {
  toggleBlockBtnBg();
  toggleBlockBtnText();
}

/**
 * Sets the textContent of total_blocks_el span to the total blocks
 * from the extension bg.
 *
 * @param {number} total_blocks - Total block count from chrome.storage
 */
function setTotalBlocksEl(total_blocks) {
  els.total_blocks_el.textContent = total_blocks;
}

/**
 * Sets the textContent of session_blocks_el span to the total
 * blocks from the extension bg.
 *
 * @param {number} session_blocks - Session block count from chrome.storage
 */
function setSessionBlocksEl(session_blocks) {
  els.session_blocks_el.textContent = session_blocks;
}

/**
 * Gets called when chrome.storage emits an changed event.
 *
 * @param {object} changes - Changed storage, holds oldValue and newValue
 */
function storageOnChanged(changes) {
  if (changes.total_blocks) {
    setTotalBlocksEl(changes.total_blocks.newValue || 0);
  }
  if (changes.session_blocks) {
    setSessionBlocksEl(changes.session_blocks.newValue || 0);
  }
}



/**
 * Simple initializer function that calls everything we want to be called
 * when the extension popup loads.
 */
function init() {
  els.block_btn.addEventListener('click', onBlockBtnClick);

  // Bind onResetBtnClick event to both reset buttons, onResetBtnClick
  // will find out which button was clicked.
  els.reset_total_btn.addEventListener('click', onResetBtnClick);
  els.reset_session_btn.addEventListener('click', onResetBtnClick);

  // Set the block_btn bg according to current block status.
  toggleBlockBtn();

  // Bind storageOnChanged to the chrome.storage onChanged event.
  chrome.storage.onChanged.addListener(storageOnChanged);

  // Load and draw the total_blocks when the popup is opened.
  chrome.storage.sync.get(function (storage) {
    setTotalBlocksEl(storage.total_blocks || 0);
  });

  // Load and draw the session_blocks when the popup is opened.
  chrome.storage.sync.get(function (storage) {
    setSessionBlocksEl(storage.session_blocks || 0);
  });
}

// Leggo
init();