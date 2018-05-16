export default class App {

    constructor() {
        const button = document.createElement('button');
        button.textContent = 'Open chat';
        document.body.appendChild(button);

        button.onclick = async () => {
            const chat = await import(/* webpackChunkName: 'chat' */ './chat');

            chat.init();
        };
    }

}
