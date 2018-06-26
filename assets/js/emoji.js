function encrypt()
{
    var message = document.getElementById("plaintext").value; //get message into string
    message = message.toLowerCase().replace(/[^\x00-\x7F]/g, "");
    var z = 0;
    var y = 0;
    var keywordOne = document.getElementById('keyword1').value;
    keywordOne = keywordOne.toLowerCase().replace(/[^\x00-\x7F]/g, "");   //gets keyword1

    var keywordOneArray = [];   //set array
    //var keywordTwoArray = [];   //set array
    var keywordOneArrayRepeated = [];  //set array
    var messageArray = [];
    var encryptionLevelOneArray = [];
    //var keywordTwoArrayRepeated = [];

    for (var i = 0; i < keywordOne.length; i++)
    {
        keywordOneArray[i] = keywordOne.charCodeAt(i);
    }


    for (var k = 0; k <  message.length; k++)  // converts message to numbers
    {
        messageArray[k] = message.charCodeAt(k);
    }

    for (var m = 0; m < message.length; m++)
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

            //1st level of encryption//
    var finalencryptionString = messageArray;
    document.getElementById("ciphertext").innerHTML = "";
    for (var x = 0; x < message.length; x++){
        finalencryptionString[x] = data[(messageArray[x] + keywordOneArrayRepeated[x]) % 127]
    }
    $("#ciphertext").val(finalencryptionString.join(""));

    return 0;


}
$(function(){
    $( "#encryption" ).click(function() {
      encrypt();
    });
});



