# Profile Module

This module provides the "My Profile" page allowing a logged user to view and update personal information.

## Endpoints
- `GET /user-profile` — fetch current user profile
- `POST /account/profile` — update profile details (form-data)
- `PUT /account/change-password` — change user password
- `POST /deactivate-account` — deactivate the account
- `DELETE /delete-account` — delete the account

All requests use the JWT token via `baseQueryWithRefresh`.
