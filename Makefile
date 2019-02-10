
IMAGE := quay.io/netzbegruenung/green-spider:latest

# Build the web application to be served by a static web server
build:
	yarn build

# Run a development server on http://localhost:8000
dev:
	docker-compose -f docker-compose.yaml up --build

# Run a staging server at http://localhost:8080
serve-staging:
	docker-compose -f docker-compose-staging.yaml up --build

# Run the production setup at https://localhost
serve-prod:
	docker-compose -f docker-compose-prod.yaml up --build

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
