export default class App {

    constructor() {
        const button = document.createElement('button');
        button.textContent = 'Open chat';
        document.body.appendChild(button);

        button.onclick = () => {
            import(/* webpackChunkName: 'chat' */ './chat').then(chat => {
                chat.init()
            })
        };
    }

}
