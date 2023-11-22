/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'ico-bagsto\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-checkbox_off': '&#xe922;',
		'icon-checkmark': '&#xe923;',
		'icon-more': '&#xe924;',
		'icon-add_a_photo': '&#xe900;',
		'icon-add_photo_alternate': '&#xe901;',
		'icon-add_shopping_cart': '&#xe902;',
		'icon-call': '&#xe903;',
		'icon-cart': '&#xe904;',
		'icon-check': '&#xe905;',
		'icon-checkbox_indeterminate': '&#xe906;',
		'icon-checkbox_on': '&#xe907;',
		'icon-chevron_down': '&#xe908;',
		'icon-chevron_left': '&#xe909;',
		'icon-chevron_right': '&#xe90a;',
		'icon-chevron_up': '&#xe90b;',
		'icon-clock': '&#xe90c;',
		'icon-clock_outline': '&#xe90d;',
		'icon-close': '&#xe90e;',
		'icon-dot': '&#xe90f;',
		'icon-edit': '&#xe910;',
		'icon-facebbook': '&#xe911;',
		'icon-filter': '&#xe912;',
		'icon-instagram': '&#xe913;',
		'icon-linkedin': '&#xe914;',
		'icon-location': '&#xe915;',
		'icon-mail': '&#xe916;',
		'icon-menu': '&#xe917;',
		'icon-minus': '&#xe918;',
		'icon-person': '&#xe919;',
		'icon-plus': '&#xe91a;',
		'icon-radio_off': '&#xe91b;',
		'icon-radio_on': '&#xe91c;',
		'icon-search': '&#xe91d;',
		'icon-trash': '&#xe91e;',
		'icon-trending_down': '&#xe91f;',
		'icon-trending_up': '&#xe920;',
		'icon-twitter': '&#xe921;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
