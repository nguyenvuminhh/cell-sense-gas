# ----------- PRE-COMMIT -----------
.PHONY: precommit
precommit:
	pre-commit run --all-files

.PHONY: export_openapi_types
export_openapi_types:
	npx openapi-typescript http://localhost:8000/openapi.json --output src/types.ts

# ----------- DEPLOYMENT -----------
.PHONY: compile_ts
compile_ts:
	cd ts && npx tsc

.PHONY: gcloud_deploy_to_app_script
gcloud_deploy_to_app_script:
	cd app_script && clasp push
