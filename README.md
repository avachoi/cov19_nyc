## Description

Users can see COVID-19 cases in NYC by zip code. The user can switch between seeing the data in a table or a choropleth map.

Scraped COVID-19 data using cheerio and combined it with geojson file for NYC with coordinates. Rendered the map using the combined data with D3.js. Created components using React and conditionally changed which component should be rendered when tab is clicked.

![Demo](./images/tabledemo.gif)
![Demo](./images/mapdemo.gif)

## Technologies

- HTML/CSS
- JavaScript
- React
- D3.js
- Node.js
- Express.js
- Webpack
- Cheerio
- Cors

## Minimum Viable Product

- Display a table with data.
- Filter table data by zip code and COVID-19 cases.
- Render a choropleth map with legend.
- Show data on tooltip on hover.
- Tabs to switch between table and map.

## Wireframe

![wireframe](./images/wireframe.png)

## Instructions

- Git clone
- npm install
- npm run dev

## Deployment

- <a href="https://cov19nyc.herokuapp.com/">Heroku</a>
