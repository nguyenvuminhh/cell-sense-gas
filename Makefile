
.PHONE: export_openapi_types
export_openapi_types:
	npx openapi-typescript http://localhost:8000/openapi.json --output app_script/types.ts
