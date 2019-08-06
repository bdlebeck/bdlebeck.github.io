var current = getCurrent();

//Render the template
var template = $('#template').html();
Mustache.parse(template);	
var rendered = Mustache.render(template, career);

// Render the HTML
$('#details').html(rendered);

// Show currently selected
$("#"+current).removeClass('hidden');

// Init
getCircles();

// Home click
$( ".home" ).click(function() {
	localStorage.clear();
	window.location.href = "index.html#career";
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
		localStorage.clear();
		window.location.href = "index.html";
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
		localStorage.clear();
		window.location.href = "index.html";
	} 
});

// Page click
$( ".page" ).click(function() {
	zenscroll.toY(0);
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

	currentPage.classList.remove("fa-dot-circle");
	currentPage.classList.remove("active");
	currentPage.classList.add("fa-circle");

	gotoPage.classList.remove("fa-circle");
	gotoPage.classList.add("fa-dot-circle");
	gotoPage.classList.add("active");	

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
	var total = parseInt(document.querySelectorAll('.career__highlights').length);
	return total;
}

function getCircles() {
	var current = getCurrent();
	var total = getTotal() +1;
	for (i=1;i<total;i++) {  
		var page = $("<a class='page' page='"+i+"'><i id='page"+i+"' class='fas fa-circle'></i></a>");
		var activepage = $("<a class='page' page='"+i+"'><i id='page"+i+"' class='fas fa-dot-circle active'></i></a>");

		if(i === current){
			$('#pages').append(activepage);
		}
		else {
			$('#pages').append(page);
		}
	}
}

function navigateBack() {
	var total = getTotal();
	var current = getCurrent();

	var next = current + 1;
	var back = current - 1;

	var currentItem = document.getElementById(current);
	var backItem = document.getElementById(back);

	currentItem.classList.add("hidden");
	backItem.classList.remove("hidden");	
	updatePagination('back');

}

function navigateNext() {
	var current = getCurrent();
	var next = current + 1;

	var currentItem = document.getElementById(current);
	var nextItem = document.getElementById(next);

	currentItem.classList.add("hidden");
	nextItem.classList.remove("hidden");
	updatePagination('next');
}

function updatePagination(e) {
	var current = getCurrent();
	var direction = e;
	var back = current - 1;
	var next = current + 1;

	var currentPage = document.getElementById('page'+current);
	var previousPage = document.getElementById('page'+back);
	var nextPage = document.getElementById('page'+next);

	if (direction == 'next') {
		currentPage.classList.remove("fa-dot-circle");
		currentPage.classList.remove("active");
		currentPage.classList.add("fa-circle");
	
		nextPage.classList.remove("fa-circle");
		nextPage.classList.add("fa-dot-circle");
		nextPage.classList.add("active");		
	}
	else if (direction == 'back') {
		currentPage.classList.remove("fa-dot-circle");
		currentPage.classList.remove("active");
		currentPage.classList.add("fa-circle");
	
		previousPage.classList.remove("fa-circle");
		previousPage.classList.add("fa-dot-circle");
		previousPage.classList.add("active");		
	}
	else {
		currentPage.classList.add("active");
	}
	
}



