

//For IE and EDGE
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var ua = navigator.userAgent;

if(isIE || isEdge) {
	if(isProjectIE() == true) {
		var dynamicContent = getParameterByName('project');
		var template = $('#template').html();
		Mustache.parse(template);	
		var rendered = Mustache.render(template, project);
	}
	else {
		var dynamicContent = getParameterByName('career');
		var template = $('#template').html();
		Mustache.parse(template);	
		var rendered = Mustache.render(template, career);
	}
}  
else {
	//Modern Browsers
	var searchParams = (new URL(document.location)).searchParams;

	//if(searchParams.has("project")) {
	if(isProject() == true) {	
		var dynamicContent = getParameterByName('project');
		var template = $('#template').html();
		Mustache.parse(template);	
		var rendered = Mustache.render(template, project);
	}
	else {
		var dynamicContent = getParameterByName('career');
		var template = $('#template').html();
		Mustache.parse(template);	
		var rendered = Mustache.render(template, career);
	}
}

//Get the parameter from url
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

//Workaround, IE and EDGE doesn't support searchParams
function isProjectIE() {
	var field = 'project';
	var url = window.location.href;
	if(url.indexOf('?' + field + '=') != -1)
	    return true;
	else if(url.indexOf('&' + field + '=') != -1)
	    return true;
	return false	
}

function isProject() {
	var searchParams = (new URL(document.location)).searchParams;
	if(searchParams.has("project")) {
		return true;
	}
	return false;
}

//Render the HTML
$('#details').html(rendered);
$("#"+dynamicContent).removeClass('hidden');



/* Back and Next */
$( ".next" ).click(function() {
	var total = parseInt(document.querySelectorAll('.details-highlights').length) -1;
	var id = parseInt($(this).attr('id'));
	var next = id + 1;
	if (id != total) {
		window.location.href = "details-career.html?career="+next;
	}
	else {
		window.location.href = "index.html";
	}
    
});

$( ".back" ).click(function() {
	var total = parseInt(document.querySelectorAll('.details-highlights').length) -1;
	var id = parseInt($(this).attr('id'));
	var back = id - 1;

	if (id != 0) {
		window.location.href = "details-career.html?career="+back;
	}
	else {
		window.location.href = "index.html";
	}
    
});



