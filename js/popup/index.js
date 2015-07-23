/** Extension background page. */
var bg = chrome.extension.getBackgroundPage();

/**
 * Extension popup DOM namespace.
 * @namespace
 */
var dom = {
  block_btn: document.getElementById('block_btn'),
  total_blocks_el: document.getElementById('total_blocks'),
  total_blocks_session_el: document.getElementById('total_blocks_session')
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

/** Toggles background color of the block_btn according to block status. */
function toggleBlockBtnBg() {
  dom.block_btn.style.background = isBlocking() ? 'green' : 'red';
}

/** Toggles textContent of the block_btn according to block status. */
function toggleBlockBtnText() {
  dom.block_btn.textContent = isBlocking() ? 'Blocking :)' : 'NOT blocking :(';
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
function setBlocksEl(total_blocks) {
  dom.total_blocks_el.textContent = total_blocks;
}

/**
 * Sets the textContent of total_blocks_session_el span to the total
 * blocks from the extension bg.
 *
 * @param {number} total_blocks_session - Total block count from chrome.storage
 */
function setBlocksSessionEl(total_blocks_session) {
  dom.total_blocks_session_el.textContent = total_blocks_session;
}

/** Calls all functions to be called when pinging. */
function ping() {
  setBlocksEl();
}

/**
 * Gets called when chrome.storage emits an changed event.
 *
 * @param {object} changes - Changed storage, holds oldValue and newValue
 */
function storageOnChanged(changes) {
  setBlocksEl(changes.total_blocks.newValue || 0);
}

/**
 * Simple initializer function that calls everything we want to be called
 * when the extension popup loads.
 */
function init() {
  dom.block_btn.addEventListener('click', onBlockBtnClick);

  // Set the block_btn bg according to current block status.
  toggleBlockBtn();

  // Bind storageOnChanged to the chrome.storage onChanged event.
  chrome.storage.onChanged.addListener(storageOnChanged);

  // Load and draw the total_blocks when the popup is opened.
  chrome.storage.sync.get(function (storage) {
    setBlocksEl(storage.total_blocks || 0);
  });

  // Load and draw the total_blocks_session when the popup is opened.
  chrome.storage.sync.get(function (storage) {
    setBlocksSessionEl(storage.total_blocks_session || 0);
  });
}

// Leggo
init();