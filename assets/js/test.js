function decrypt() {

    var Stringtonum = [];
    var z = 0;
    var y = 0;
    var keywordOneArray = [];   //set array
    var keywordOneArrayRepeated = [];  //set array
    var messageArray = [];
    var keywordOne = document.getElementById('keyword1').value;
    var message = document.getElementById("plaintext").value; //get message into string
    var finalUnencryptedString = "";    // for (var k = 0; k < message.length; k++)  // converts message to numbers

    messageArray = emojiStringToArray(message);

    for (var i = 0; i < keywordOne.length; i++)
    {
        keywordOneArray[i] = keywordOne.charCodeAt(i);
    }
    for (var m = 0; m < messageArray.length; m++)
    {
        if (z < keywordOne.length) {
            keywordOneArrayRepeated[m] = keywordOneArray[z];
            z++;
        }

        else {
            z = 0;
            keywordOneArrayRepeated[m] = keywordOneArray[z];
            z++;
        }

    }

    for (var x = 0; x < messageArray.length; x++) {
        var encryptedCharNum = data.indexOf(messageArray[x]);
        messageArray[x] = (encryptedCharNum - keywordOneArrayRepeated[x]) % 127;
        if (messageArray[x] < 0)
            messageArray[x] = 127 + messageArray[x];
        finalUnencryptedString += String.fromCharCode(messageArray[x]);
    }

    $("#ciphertext").val(finalUnencryptedString);

    return 0;
}

$(function(){
    $( "#decryption" ).click(function() {
      decrypt();
    });
});
