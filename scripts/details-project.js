var current = getCurrent();

//Render the template
var template = $('#template').html();
var templateHeader = $('#template-header').html();
Mustache.parse(template);
Mustache.parse(templateHeader);	
var rendered = Mustache.render(template, project);
var renderedHeader = Mustache.render(templateHeader, project);
//Mustache.parse(templateHeader);
//var rendered = Mustache.render(templateHeader, project);

//Render the HTML
$('#details').html(rendered);
$('#details-header').html(renderedHeader);

// Show currently selected
$("#"+current).removeClass('hidden');
$("#header"+current).removeClass('hidden');


// Init
getCircles();

// Home click
$( ".home" ).click(function() {
	localStorage.clear();
	window.location.href = "index.html#projects";
});

// Back click
$( ".back" ).click(function() {
	var total = getTotal();
	var current = getCurrent();
	var back = current - 1;

	if (current != 1) {
		zenscroll.toY(0);
		navigateBack();
		localStorage.setItem('current', back);
	}
	else {
		navigateBack();
		localStorage.setItem('current', total);		
	}

	zenscroll.toY(0)    
});

// Next click
$( ".next" ).click(function() {
	var total = getTotal();
	var current = getCurrent();
	var next = current + 1;

	if (current != total) {
		zenscroll.toY(0);
		navigateNext();
		localStorage.setItem('current', next);
	}
	else {
		navigateNext();
		localStorage.setItem('current', 1);
	} 
});


// Page click
$( ".page" ).click(function() {

	//Update Page
	var current = getCurrent();
	var gotopage = this.getAttribute("page");
	var currentItem = document.getElementById(current);
	var currentHeaderItem = document.getElementById("header"+current);
	var gotoItem = document.getElementById(gotopage);
	var gotoHeaderItem = document.getElementById("header"+gotopage);
	currentItem.classList.add("hidden");
	currentHeaderItem.classList.add("hidden");
	gotoItem.classList.remove("hidden");
	gotoHeaderItem.classList.remove("hidden");

	//Update Pagination
	var currentPage = document.getElementById('page'+current);
	var gotoPage = document.getElementById('page'+gotopage);

	currentPage.classList.remove("is-current");
	gotoPage.classList.add("is-current");	

	localStorage.setItem('current', gotopage);
});


function getCurrent() {
	var current = parseInt(localStorage.getItem('current'));
	return current;
}

function getNext() {
	var next = getCurrent() + 1;
	return next;
}

function getTotal() {
	var total = parseInt(document.querySelectorAll('.details-highlights').length);
	return total;
}

function getCircles() {
	var current = getCurrent();
	var total = getTotal() +1;
	for (i=1;i<total;i++) {  
		//var page = $("<a class='page' page='"+i+"'><i id='page"+i+"' class='fas fa-circle'></i></a>");
		var page = $("<li><a id='page"+i+"' class='page pagination-link' page='"+i+"'>"+i+"</a></li>");
		var activepage = $("<a id='page"+i+"' class='page pagination-link is-current' page='"+i+"'>"+i+"</a>");
		//var activepage = $("<a id='page"+i+"' class='page' page='"+i+"'><i class='fas fa-dot-circle active'></i></a>");

		if(i === current){
			$('#pages').append(activepage);
		}
		else {
			$('#pages').append(page);
		}
	}
}

function navigateBack() {
	var current = getCurrent();
	var next = current + 1;
	var back = current - 1;
	var total = getTotal();

	if (current == 1) {
		var last = total;
		document.getElementById(1).classList.add("hidden");
		document.getElementById("header"+1).classList.add("hidden");
		document.getElementById(last).classList.remove("hidden");
		document.getElementById("header"+last).classList.remove("hidden");

	}
	else {
		var currentItem = document.getElementById(current).classList.add("hidden");
		var currentItem2 = document.getElementById("header"+current).classList.add("hidden");
		var backItem = document.getElementById(back).classList.remove("hidden");	
		var backItem2 = document.getElementById("header"+back).classList.remove("hidden");
	}
	updatePagination('back');
}

function navigateNext() {
	var current = getCurrent();
	var next = current + 1;
	var total = getTotal();
	var last = getTotal();

	if (current == total) {
		next = 1;
		document.getElementById(last).classList.add("hidden");
		document.getElementById("header"+last).classList.add("hidden");
		document.getElementById(next).classList.remove("hidden");
		document.getElementById("header"+next).classList.remove("hidden");
	}
	else {
		document.getElementById(current).classList.add("hidden");
		document.getElementById("header"+current).classList.add("hidden");
		document.getElementById(next).classList.remove("hidden");
		document.getElementById("header"+next).classList.remove("hidden");
	}
	updatePagination('next');
}

function updatePagination(e) {
	var current = getCurrent();
	var direction = e;
	var back = current - 1;
	var next = current + 1;
	var total = getTotal();

	if (current == total) {
		next = 1;
	}
	else if (current == 1) {
		back = total;
	}

	var currentPage = document.getElementById('page'+current).classList;
	var previousPage = document.getElementById('page'+back).classList;
	var nextPage = document.getElementById('page'+next).classList;

	if (direction == 'next') {
		currentPage.remove("fa-dot-circle");
		currentPage.remove("is-current");
		currentPage.add("fa-circle");
	
		nextPage.remove("fa-circle");
		nextPage.add("fa-dot-circle");
		nextPage.add("is-current");		
	}
	else if (direction == 'back') {
		currentPage.remove("fa-dot-circle");
		currentPage.remove("is-current");
		currentPage.add("fa-circle");
	
		previousPage.remove("fa-circle");
		previousPage.add("fa-dot-circle");
		previousPage.add("is-current");		
	}
	else {
		currentPage.add("is-current");
	}
	
}

