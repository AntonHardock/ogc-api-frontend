# OGC API Frontend

A React + NextJS prototype implementing only presentational capabilities of the OGC API:
data previews, map previews and Open API documentation pages.
See `./docs` for setup instructions and ideas for further development.

## The goal

The intended use is a microservice architecture: different OGC API Specs
(features, tiles, maps etc.) shall be served by standalone implementations.
Those services would only need to implement core API functionalities.
With this prototype, all presentational logic for data, metadata and documentation could be centralized. It would act as a unified entrypoint for all preview and documentation needs.
The approach facilitates replacing or further developing the underlying APIs.

## Demo

For demonstration purposes, the prototype partially implements the OGC Open API Features Spec. The actual geodata requests are forwarded to https://api.hamburg.de/datasets/v1.
It is a live example of an OGC API Features implementation, serving Open Data from Hamburg.
The demo reuses a few of its datasets as well as the application's CSS.
Going forward, the prototype can be extended to add new endpoints (e.g. /tiles) which
could be served from different sources.

## Metadata middleware

All metadata on datasets, collections and API documentation come from a separate mock-api,
which is also included in the demo. In a production environment, that mockup would be replaced by a proper backend. Additional middleware to fetch and provide metadata conforming to OGC API and Open API Specs is **not necessary**. For that, the API routes functionality of Next.js is used. As this is an early development draft, JSON responses covered by API routes do not conform to aforementioned standards.

## Deployment draft

When requesting the actual geodata (so called "features" coming from /items or /item endpoints),
Next.js rewrites are used to forward requests to the features API (see included next.config.js).
This is for demonstration and development purposes only since the setup is simple.
A production environment would use a separate reverse proxy.
Otherwise, the OGC API Frontend becomes an unnesseccary bottleneck.
Below figure illustrates a possible deployment draft.
Data requests shall be routed directly to responsible APIs while
html preview and documentation requests go to OGC API Frontend:

![Deployment draft](docs/architecture.jpg)
