
# Run a development server and load it in your default browser.
# Will reload as soon as some source has changed.
dev:
	yarn start

# Build the web application to be served by a static web server
build:
	yarn build

# Copy build output to the /docs folder where it's served by Github pages
dist: build
	cp -r build docs
