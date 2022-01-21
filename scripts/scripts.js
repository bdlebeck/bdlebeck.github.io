$(document).ready(function() {

	$.get('templates/skills.html', function(strengthTemplate) {
		var strengthOutput = Mustache.render(strengthTemplate);
		$('#strength').html(strengthOutput);
	});	

	$.get('templates/skills2.html', function(strength2Template) {
		var strength2Output = Mustache.render(strength2Template);
		$('#strength2').html(strength2Output);
	});		

	$.get('templates/careers.html', function(careerTemplate) {
		var careerOutput = Mustache.render(careerTemplate, career);
		$('#career').html(careerOutput);
	});

	$.get('templates/projects.html', function(projectTemplate) {
		var projectOutput = Mustache.render(projectTemplate, project);
		$('#projects').html(projectOutput);
	});		

});