$(document).ready(function() {

	$.get('templates/skills.html', function(skillTemplate) {
		var skillOutput = Mustache.render(skillTemplate, skill);
		$('#skills').html(skillOutput);
	});	

	$.get('templates/careers.html', function(careerTemplate) {
		var careerOutput = Mustache.render(careerTemplate, career);
		$('#career').html(careerOutput);
	});

	$.get('templates/projects.html', function(projectTemplate) {
		var projectOutput = Mustache.render(projectTemplate, project);
		$('#projects').html(projectOutput);
	});	

	$.get('templates/education.html', function(educationTemplate) {
		var educationOutput = Mustache.render(educationTemplate, education);
		$('#education').html(educationOutput);
	});		



});