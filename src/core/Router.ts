import Block from './Block.ts';
import Route from './Route.ts';

class Router {
    private static __instance: Router;
    private _routes:Record<string, Route> = {};
    private _history: History = window.history;
    private _currentRoute: Route | null = null;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }
        Router.__instance = this;
    }

    use(pathname: string, block: Block): Router {
        const route = new Route(pathname, block);

        this._routes[pathname] = route;

        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }

    go(pathname:string) {
        this._history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    
    back() {
        this._history.back();
    }
    
    forward() {
        this._history.forward();
    }

    getRoute(pathname: string): Route {
        return this._routes[pathname] ?? this._routes['*'];
    }
}

export default new Router();