# Sample Application - Bookmark Manager

  > A sample application allowing the user to add/edit/delete bookmark URLs. Implemented with "vanilla" JavaScript (ES6) (no libraries or frameworks)

  > Run the app at: https://app-bookmarks.chrismendes.uk (may show insecure SSL certificate while new)

  > Or: https://bookmark-manager-bac58.web.app (https/SSL secure)

## Overview

**Key Points**

* Solution consists of a classical MVC approach
* Single controller and two views (or "pages")
* Controller responsible for binding its methods with view-fired events, and liaising with LocalStorage
* Views responsible for initialising components and rendering view
* No need for formal "model" given data is a simple stack of URL strings
* Major UI features implemented as standalone components with JS/CSS grouped together (in /components directory)
* CSS follows the SMACSS convention so as to separate "modules" (or components) with "layouts" (layout CSS in /layouts directory)

**Technology Breakdown**

* HTML5, CSS3, Sass
* JavaScript ES6
* Parcel bundler
* Google Firebase Hosting

**Limitations**

* Components are completely re-rendered upon update, as opposed to constituent elements only, and thus this solution is relatively less performant, given the absence of a virtual DOM implementation as with libraries such as React.js
* Not responsive due to time restrictions (desktop only)
* Not thoroughly tested cross-browser due to time restriction (modern browser such as Chrome recommended)

## License

Copyright (c) 2020 Chris Mendes

Licensed under the MIT License