/* eslint-disable no-undef, prefer-arrow-callback */

(function () {
	document.addEventListener('DOMContentLoaded', function () {
		themeSelection();
		fetchRepos();

		// Say hi to fellow devs!
		[
			'Hello, fellow developer!',
			'Source code @ Github: GabrielMangiurea/gabrielmangiurea.github.io-source',
			'Have a great day!'
		].forEach(function (message) {
			console.log(message);
		});
	});
})();

function themeSelection() {
	const ct = document.getElementById('change-theme');

	ct.addEventListener('click', function (e) {
		const body = document.querySelector('body');

		e.preventDefault();
		body.classList.toggle('light-theme');
		body.classList.toggle('dark-theme');
		ct.innerHTML = body.classList.contains('light-theme') ?
								'<span class="fa fa-sun-o"></span>Too bright?' :
								'<span class="fa fa-moon-o"></span>Too dark?';
	});
}

function fetchRepos() {
	const repoEl = document.querySelector('.last-updated-repo');

	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (this.readyState === 4) {
			if (this.status === 200) {
				// Gulp-uglify will complain if using 'let' instead of 'var'
				// ESLint (XO) will complain if using 'var' instead of 'let'
				var data = JSON.parse(this.responseText); // eslint-disable-line no-var

				data = data.sort(function (a, b) {
					return new Date(b.pushed_at) - new Date(a.pushed_at);
				})[0];

				repoEl.innerHTML = '<a class="text-repo-name" href="' + data.html_url + '">' + data.name + '</a> ' +
					(data.language ? '<span>(' + data.language + ')</span>' : '') +
					'<br>' +
					'<span class="text-repo-date text-muted">' + new Date(data.pushed_at).toDateString() + '</span>';
			} else {
				repoEl.innerHTML = '<span class="text-error">Something went wrong!</span>';
			}
		}
	};

	xhr.open('GET', 'https://api.github.com/users/gabrielmangiurea/repos', true);
	xhr.send();
}
