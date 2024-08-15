import Block  from '../core/Block';

export function render(block: Block) {
    const root = document.getElementById('app');
    if (root === null) {
        return '';
    }
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
    return root;
}
