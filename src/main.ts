import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages: Record<string, any[]> = {
  	'404': [ Pages.Page404 ],
  	'500': [ Pages.Page500 ],
  	'login': [ Pages.PageLogin ],
  	'registration': [ Pages.PageRegistration ],
  	'chat': [ Pages.PageChat ],
  	'profile': [ Pages.PageProfile ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  	Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
	const [ source, args ] = pages[page];
	const handlebarsFunct = Handlebars.compile(source);
	document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => {
	const page = window.location.pathname.substring(1);

	if (page) {
		navigate(page);
	} else {
		navigate('login')
	}
});

document.addEventListener('click', (e: MouseEvent) => {
    const page = (e.target as HTMLElement).getAttribute('page');

    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});