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

const storage = new Storage('bookmark-manager');
const indexPage = new IndexPage();
const controller = new Controller(indexPage, storage);
