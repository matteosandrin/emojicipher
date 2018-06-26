function emojiStringToArray(str) {
  split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
  arr = [];
  for (var i=0; i<split.length; i++) {
    char = split[i]
    if (char !== "") {
      arr.push(char);
    }
  }
  return arr;
}

function emojiArrayToDict(array) {
	emojiDict = {};
	for (var i = 0; i < array.length; i++) {
		emoji = array[i];
		emojiDict[emoji] = i;
	}
	return emojiDict;
}

var globalEmojiString = "🌁🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🌰🌱🌲🌳🌴🌵🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓";
var globalEmojiArray = emojiStringToArray(globalEmojiString);
var globalEmojiDict = emojiArrayToDict(globalEmojiArray);


function stripNonASCII(string) {
	return string.replace(/[^\x00-\x7F]/g, "");
}

function wrapArondModulus(x, mod) {
	var result = x % mod;
	if (result < 0) {
		result = mod + result;
	}
	return result;
}

function vigenere(string, key, operation) {
	
	const filteredString = stripNonASCII(string);
	const filteredKey  = stripNonASCII(key);

	var resultArray = new Array(filteredString.length);

	for (var i = 0; i < filteredString.length; i++) {
		var stringCharCode = filteredString.charCodeAt(i);
		var keyCharCode = filteredKey.charCodeAt(i % filteredKey.length);
		var resultCharCode;
		
		if (operation === "encrypt"){
			resultCharCode = wrapArondModulus((stringCharCode + keyCharCode), 128);
		}else if (operation === "decrypt") {
			resultCharCode = wrapArondModulus((stringCharCode - keyCharCode), 128);
		}
		
		resultArray[i] = String.fromCharCode(resultCharCode);
	}
	return resultArray.join("")
}

function encrypt(string, key) {
	return vigenere(string, key, "encrypt")
}

function decrypt(string, key) {
	return vigenere(string, key, "decrypt")
}

function text2emojis(text) {
	
	var emojiArray = new Array(text.length);
	
	for (var i = 0; i < text.length; i++) {
		var textCharCode = text.charCodeAt(i);
		var emoji = globalEmojiArray[textCharCode];
		emojiArray[i] = emoji;
	}

	return emojiArray.join("")
}

function emojis2text(emojis) {

	var emojis = emojiStringToArray(emojis);
	var textArray = new Array(emojis.length);

	for (var i = 0; i < emojis.length; i++) {
		var emoji = emojis[i];
		var textCharCode = globalEmojiDict[emoji];
		console.log(emoji, textCharCode);
		textArray[i] = String.fromCharCode(textCharCode);
	}
	return textArray.join("");
}

$(function(){
    $("#encrypt").click(function() {

    	var plaintext = $("#input-area").val();
    	var key = $("#key").val();
    	var ciphertext = encrypt(plaintext, key);
    	var emojitext = text2emojis(ciphertext);
    	$("#output-area").val(emojitext);

    });

    $("#decrypt").click(function() {

    	var emojitext = $("#input-area").val();
    	var ciphertext = emojis2text(emojitext);
    	var key = $("#key").val();
    	var plaintext = decrypt(ciphertext, key)
    	$("#output-area").val(plaintext);

    });
});