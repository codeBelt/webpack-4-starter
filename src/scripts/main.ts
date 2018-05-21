import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';

import App from './views/App';

(async (window: Window) => {

    const app = new App();

    if (module.hot) {
        module.hot.accept()
    }


})(window);
