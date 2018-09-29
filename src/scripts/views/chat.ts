import styles from './chat.module.scss';

import people from "../data/people"

export function init() {
    const root = document.createElement("div");

    root.innerHTML = `<p class="${styles.wrapper}">There are ${people.length} people in the room.</p>`;
    document.body.appendChild(root);
}
