import 'normalize.css';
import './helpers/base.scss';

import './layouts/Header/LayoutHeader.scss'
import './layouts/Container/LayoutContainer.scss'
import './layouts/Section/LayoutSection.scss'

import './components/AppTitle/AppTitle.scss'
import './components/Button/Button.scss'
import './components/Pagination/Pagination.scss'

import Controller from './controllers/controller';
import Storage from './services/storage';
import IndexPage from './pages/index.js'
import SubmittedPage from './pages/submitted.js'

const storage = new Storage('bookmark-manager');
const indexPage = new IndexPage();
const submittedPage = new SubmittedPage();

const routes = {
  '': indexPage,
  'submitted': submittedPage
};

const controller = new Controller(routes, storage);

window.addEventListener('load', () => controller.setView(document.location.hash));
window.addEventListener('hashchange', () => controller.setView(document.location.hash));
