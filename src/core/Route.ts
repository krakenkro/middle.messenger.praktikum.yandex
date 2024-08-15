import Block from './Block';
import { render } from '../utils/render';

function isEqual(lhs:string, rhs:string) {
    return lhs === rhs;
}

export default class Route {
    private _pathname: string;
    private readonly _page: Block;

    constructor(pathname:string, page: Block) {
        this._pathname = pathname;
        this._page = page;
    }

    navigate(pathname:string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._page) {
            this._page.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render() {
        render(this._page as unknown as Block);
    }
}