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
	rm -rf dist && \
	mkdir dist && \
	npx esbuild src/index.ts --bundle --outfile=dist/Code.js --format=esm --target=es2020 && \
	node scripts/remove-exports.cjs && \
	cp -r src/html/ dist/html && \
	cp .clasp.json dist/.clasp.json && \
	cp appsscript.json dist/appsscript.json && \
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
