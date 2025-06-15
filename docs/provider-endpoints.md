# Provider Module

This document lists the API endpoints used for managing providers.

## Endpoints
- `GET /providers` — list all providers
- `GET /providers/{id}` — provider details
- `GET /providers/by-user/{userId}` — provider linked to a specific user
- `POST /providers` — create a provider
- `PUT /providers/{id}` — update a provider
- `POST /providers/{id}/image` — upload provider picture
- `DELETE /providers/{id}` — remove a provider

All requests are made through `baseQueryWithRefresh` so JWT authentication is applied.
