# ----------- PRE-COMMIT -----------
.PHONY: precommit
precommit:
	pre-commit run --all-files

.PHONY: export_openapi_types
export_openapi_types:
	npx openapi-typescript http://localhost:8000/openapi.json --output src/types.ts

# ----------- DEPLOYMENT -----------
.PHONY: clasp_push
clasp_push:
	echo "Re-initializing dist..." && \
	rm -rf dist && \
	mkdir dist && \
	echo "Building with esbuild..." && \
	npx esbuild src/index.ts --bundle --outfile=dist/Code.js --format=esm --target=es2020 && \
	echo "Removing exports..." && \
	node scripts/remove-exports.cjs && \
	echo "Replacing API URL placeholder..." && \
	node scripts/replace-api-url-placeholder.cjs && \
	echo "Copying other files..." && \
	cp -r src/html/ dist/html && \
	cp .clasp.json dist/.clasp.json && \
	cp appsscript.json dist/appsscript.json && \
	echo "Pushing to Apps Script project..." && \
	cd dist && \
	clasp push

.PHONY: encrypt_credentials
encrypt_credentials:
	gpg --batch --yes \
		--passphrase-file pass.txt \
		--symmetric --cipher-algo AES256 \
		-o .clasprc.json.gpg ~/.clasprc.json

.PHONY: decrypt_credentials
decrypt_credentials:
	gpg --batch --yes \
		--passphrase-file pass.txt \
		--decrypt -o .clasprc.json .clasprc.json.gpg
