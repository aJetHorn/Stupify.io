$(document).ready( function () 
{
	var rawText;
	var tokens;
  $( "#stupifyButton" ).on( "click",   function() { //freely interact with displays
  	rawText = $("#source").val().trim();
  	tokens = rawText.split(" ");
    highlightResultText();
    console.log(rawText);
    console.log(tokens);
    postResultTokens();
  });

  function highlightResultText(){
  	$("#result").css("background-color", "#ecf0f1");
  	//$( this ).css( "width", "+=200" );
  }

  function postResultTokens(){
  	var content = "";
  	for (var i = 0; i < tokens.length; i++){
  		content += tokens[i] + " ";
  	}
  	$("#result").val(content);
  }
})