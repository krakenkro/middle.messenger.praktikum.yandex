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
  	'edit': [ Pages.PageEdit ],
  	'change-password': [ Pages.ChangePassword ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  	Handlebars.registerPartial(name, component);
}); 

function navigate(page: string, customArgs: any = null) {
	const [source, args] = (pages as any)[page];
	const handlebarsFunct = Handlebars.compile(source);
	const main = document.getElementById('app');
	if (main) {
	  main.innerHTML = handlebarsFunct(customArgs || args);
	}
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
        window.location.pathname = page;

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
