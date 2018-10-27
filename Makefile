
IMAGE := quay.io/netzbegruenung/green-spider:latest

# Run a development server and load it in your default browser.
# Will reload as soon as some source has changed.
dev:
	yarn start

# Build the web application to be served by a static web server
build:
	yarn build

# Copy build output to the /docs folder where it's served by Github pages
dist: build
	rm -rf docs
	cp -r build docs

serve-prod:
	cd docs && python3 -m http.server

clean:
	rm -rf build

# export JSON data for the webapp
export:
	docker run --rm -ti \
		-v $(PWD)/src:/out \
		-v $(PWD)/secrets:/secrets \
		-v $(PWD)/public/siteicons:/icons \
		$(IMAGE) \
		--credentials-path /secrets/datastore-reader.json \
		--loglevel info \
		export --kind spider-results

docker-build:
	docker build -t quay.io/netzbegruenung/green-spider-webapp:latest .
