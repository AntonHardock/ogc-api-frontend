# Known issues
- OpenLayers component uses geometry extents to fit map view - does not work properly for  single points (only relevant for /item endpoints)
- /items page does not refresh when returning to previous page using paging buttons or browser return (probably a caching issue)
- static assets are rendered correctly but respective get requests issue warings or errors

# further developement ideas

## smaller things

- refine paging buttons (only barebones implementation so far)
- enable get feature info in OpenLayers component
- make background map settings configurable (currently using basemap.de WMTS)
- implement a breadcrumb component
- check and ensure that useRef hook cleanup (as used in OpenLayers component) is implemented correctly (see: https://stackoverflow.com/questions/71242012/how-to-cleanup-useref-in-useeffect)
- finalize html and css
- import project configs as gobal module to avoid relative paths

## bigger undertakings

- upgrade to newest next.js version - adapt to new developements in data fetching, dynamic routing and api routes
- consolidate and optimize data fetching (so far, the demo tests various options)
- replace mock_data api with database backend
- use api routes for dynamic output of /dataset, /collections and /collection jsons conforming to OGC API
- use api routes for dynamic output of open api json templates for each dataset
- refactor according to react best practices (e.g. functional vs. presentational components etc.)