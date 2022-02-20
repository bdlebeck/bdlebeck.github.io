var current = getCurrent();

//Render the template
var template = $('#template').html();
Mustache.parse(template);	
var rendered = Mustache.render(template, project);


//Render the HTML
$('#details').html(rendered);

// Show currently selected
$("#"+current).removeClass('hidden');
$("#"+current).removeClass('display-none');


// Init
getCircles();

// Arrow keyboard navigation
document.addEventListener("keydown", function(event) {
	if(event.keyCode === 39){
		clickNext();
	}
	if(event.keyCode === 37){
		clickBack();
	}
});  

//Touch events
$('body').swipeLeft(function(){
	clickNext();
})

$('body').swipeRight(function(){
	clickBack();
})


// Home click
$( ".home" ).click(function() {
	localStorage.clear();
	window.location.href = "index.html#projects";
});

// Back click
$( ".back" ).click(function() {
	clickBack();
});

// Next click
$( ".next" ).click(function() {
	clickNext();
});

function clickNext() {
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
}

function clickBack() {
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
}
  


// Page click
$( ".page" ).click(function() {

	//Update Page
	var current = getCurrent();
	var gotopage = this.getAttribute("page");
	var currentItem = document.getElementById(current);
	var gotoItem = document.getElementById(gotopage);
	
	currentItem.classList.add("hidden");
	gotoItem.classList.remove("hidden");

	//Update Pagination
	var currentPage = document.getElementById('page'+current);
	var gotoPage = document.getElementById('page'+gotopage);

	currentPage.classList.remove("currentPage");
	currentPage.classList.add("defaultPage");
	gotoPage.classList.remove("defaultPage");	
	gotoPage.classList.add("currentPage");	

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

		var page = $("<a class='page' page='"+i+"'><div id='page"+i+"' class='defaultPage'></div></a>");
		var activepage = $("<a class='page' page='"+i+"'><div id='page"+i+"' class='currentPage'></div></a>");
		
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
		document.getElementById(1).classList.remove("show");
		document.getElementById(last).classList.remove("hidden");
		document.getElementById(last).classList.add("show");
	}
	else {
		document.getElementById(current).classList.add("hidden");
		document.getElementById(current).classList.remove("show");
		document.getElementById(back).classList.remove("hidden");	
		document.getElementById(back).classList.add("show");	
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
		document.getElementById(last).classList.remove("show");
		document.getElementById(next).classList.remove("hidden");	
		document.getElementById(next).classList.add("show");
	}
	else {
		document.getElementById(current).classList.add("hidden");
		document.getElementById(current).classList.remove("show");
		document.getElementById(next).classList.remove("hidden");	
		document.getElementById(next).classList.add("show");	
	}
	updatePagination('next');
}

function hideThis(c){
    $(c).addClass("hidden");
	$(c).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
		function(event) {
	});	
}
function showThis(e){
	$(e).removeClass("hidden");
	$(e).addClass("show");
	
	$(e).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
		function(event) {	
	});	
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

		currentPage.remove("currentPage");
		currentPage.add("defaultPage");
	
		nextPage.remove("defaultPage");
		nextPage.add("currentPage");	
	}
	else if (direction == 'back') {
		currentPage.remove("currentPage");
		currentPage.add("defaultPage");
	
		previousPage.remove("defaultPage");
		previousPage.add("currentPage");		
	}
	else {
		previousPage.add("currentPage");
	}
	
}




