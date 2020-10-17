import 'normalize.css';
import './helpers/base.scss';

import './layouts/Header/LayoutHeader.scss'
import './layouts/Container/LayoutContainer.scss'
import './layouts/Section/LayoutSection.scss'

import './components/AppTitle/AppTitle.scss'
import './components/Button/Button.scss'
import './components/Form/Form.scss'
import './components/Bookmark/Bookmark.scss'
import './components/Pagination/Pagination.scss'

import Controller from './controllers/controller';


const controller = new Controller(null, null);
controller.addBookmark('https://chrismendes.uk');
