function processImage() {
  var statement = "";
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************

    // Replace the subscriptionKey string value with your valid subscription key.
    var subscriptionKey = "6e029ed5f0e74f49a5ddd5b43e96c9c8";

    // Replace or verify the region.
    //
    // You must use the same region in your REST API call as you used to obtain your subscription keys.
    // For example, if you obtained your subscription keys from the westus region, replace
    // "westcentralus" in the URI below with "westus".
    //
    // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
    // a free trial subscription key, you should not need to change this region.
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,emotion",
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
        for(var i = 0; i < data.length; i++) {
          if(data[i]['faceAttributes']['emotion']['neutral'] >= 0.500) {
            statement = "Why so serious?";
            console.log(statement);
          }
          if(data[i]['faceAttributes']['emotion']['anger'] >= 0.500) {
            statement = "Chill out, dog!";
            console.log(statement);
          }
          if(data[i]['faceAttributes']['emotion']['contempt'] >= 0.500) {
            statement = "Pay more attention!";
            console.log(statement);
          }
          if(data[i]['faceAttributes']['emotion']['disgust'] >= 0.500) {
            statement = "You look like you saw something horrifying.";
            console.log(statement);
          }
          if(data[i]['faceAttributes']['emotion']['fear'] >= 0.500) {
            statement = "Don't be afraid, muhahaha!";
            console.log(statement);
          }
          if(data[i]['faceAttributes']['emotion']['sadness'] >= 0.500) {
            statement = "Cheer up!";
            console.log(statement);
          }
          if(data[i]['faceAttributes']['emotion']['happiness'] >= 0.500) {
            statement = "You're looking happy today!";
            console.log(statement);
          }
          if(data[i]['faceAttributes']['emotion']['surprise'] >= 0.500) {
            statement = "Surprise!";
            console.log(statement);
          }
        }
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
            jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
    return statement;
};
