# squeely

## Table of Contents

- [Note](#note)
- [Installation](#installation)
- [Features](#features)
  - [Autocomplete](#autocomplete)
  - [Supports Multiple Spaces](#supports-multiple-spaces)
  - [Supports CSV and JSON Data Formats](#supports-csv-and-json-data-formats)
  - [Bookmarks and History](#bookmarks-and-history)
- [Performance Analysis](#performance-analysis)
- [Future Scopes](#future-scopes)

## Note

Through out this application, it is assumed that the user is authenticated and has authorization to perform all the functions in the application.

## Installation

```bash
yarn
yarn start
```

## Features

### Autocomplete

- Autocomplete for SQL Editor.
- Sublime Key Bindings

### Supports Multiple Spaces

- Multiple Workspaces in a single app.
- Clicking the share button will copy the link to space (concept only).
- Double click the title to change the name.

### Supports CSV and JSON Data Formats

- Import/Export data in CSV and JSON formats.

### Bookmarks and History

- Queries will be saved for each workspace.
- Queries can be Bookmarked for later use.

## Performace Analysis

By using the Google Chrome's Lighthouse audit, we are able to measure different metrics of the website. Before making any improvements, these are the results.

![before-lazy](https://github.com/rabeehrz/squeely/blob/master/docs/before-lazy.png?raw=true)

### Improvements

### GZip

The source code was run through webpack (provided by CRA) and the files were minified and compressed using GZip compression. The difference in bundle size is given below.

![gzip](https://github.com/rabeehrz/squeely/blob/master/docs/gzip.png?raw=true)

### Code Splitting and Lazy Loading

The whole source code was split into different bundles. This helps to reduce the main bundle size and lazily load the splitted components as needed.

The bundle size after GZip and Code splitting is:

![code-split](https://github.com/rabeehrz/squeely/blob/master/docs/code-split.png?raw=true)

After implementation of lazy loading, around 200ms was saved in all metrics including FCP as shown.

![after-lazy](https://github.com/rabeehrz/squeely/blob/master/docs/after-lazy.png?raw=true)

### Future Scope

These are the features I wanted to implement, but couldn't due to time constraints.

- Implementing persistant application state.
- Implementing sorting, grouping and aggregation using menus instead of raw SQL.
