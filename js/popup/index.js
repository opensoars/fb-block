/** Extension background page. */
var bg = chrome.extension.getBackgroundPage();

/** Time between each bg ping. */
var ping_interval_ms = 333;

/** Will hold the interval id bound to the ping interval. */
var ping_interval;

/**
 * Extension popup DOM namespace.
 * @namespace
 */
var dom = {
  block_btn: document.getElementById('block_btn'),
  total_blocks_el: document.getElementById('total_blocks')
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

/**
 * Gets total_blocks variable from bg using its get method.
 *
 * @return {number} - Total amount of blocks the bg did
 */
function getTotalBlocks() {
  return bg.get('total_blocks');
}

/** Toggles bg block variable and toggles block_btn bg (toggleBlockBtnBg). */
function onBlockBtnClick() {
  setBlock(!bg.get('block'));
  toggleBlockBtnBg();
}

/** Toggles background color of the block_btn according to block status. */
function toggleBlockBtnBg() {
  dom.block_btn.style.background = isBlocking() ? 'green' : 'red';
}

/** Sets the textContent of blocks_el span to the total blocks from the bg. */
function setBlocksEl() {
  dom.total_blocks_el.textContent = getTotalBlocks();
}

/** Calls all functions to be called when pinging. */
function ping() {
  setBlocksEl();
}

/**
 * Simple initializer function that calls everything we want to be called
 * when the extension popup loads.
 */
function init() {
  dom.block_btn.addEventListener('click', onBlockBtnClick);

  // Set the block_btn bg according to current block status
  toggleBlockBtnBg();

  // Set blocks_el, 'ping' and update every second
  setBlocksEl();
  ping_interval = setInterval(ping, ping_interval_ms);
}

// Leggo
init();