
function status(txt) {
  var e = document.getElementById('status');
  e.innerHTML = txt;
}

function setRaritySelectColor(rarity) {
  var e = document.getElementById('rarity');
  //e.classList.add('rarity'+rarity);
  //status(e.className);
  e.className = 'select rarity' + rarity;
}

function setRarityValue(rarity) {
  var e = document.getElementById('rarity');
  e.value = rarity;
  e.className = 'textinput onblack rarity' + rarity;
}

function clearRarityValue() {
  setRarityValue('');
}

function setElementValue(id,value) {
  var e = document.getElementById(id);
  e.value = value;
}

function clearElementValue(id) {
  setElementValue(id,'');
}
