/* eslint-disable no-undef, prefer-arrow-callback */

(function () {
	document.addEventListener('DOMContentLoaded', function () {
		themeSelection();
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
