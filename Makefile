

.PHONY: webapp

# Build webapp
build: node_modules
	npx webpack --config webpack.config.js
	cp node_modules/tooltipster/dist/css/tooltipster.bundle.min.css ./docs/css/

# export JSON data for the webapp
export:
	docker run --rm -ti \
		-v $(PWD)/docs/data:/out \
		-v $(PWD)/secrets:/secrets \
		-v $(PWD)/docs/siteicons:/icons \
		quay.io/netzbegruenung/green-spider:latest \
		data_export.py /secrets/datastore-reader.json

# NodeJS modules for the webapp creation
node_modules:
	npm install

venv:
	virtualenv venv -p python3

# Run a dev server for the webapp
serve: venv
	cd docs && ../venv/bin/python -m http.server
