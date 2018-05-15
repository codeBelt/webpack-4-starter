import 'bootstrap/dist/css/bootstrap.css';
import './scss/style.scss';
import App from './scripts/App';

const app = new App();

if (module.hot) {
    module.hot.accept()
}
