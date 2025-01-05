# Authentication in backend API using Firebase

- Status: Accepted
- Authors: [Ashwin Santhosh](mailto:ashwin.santhosh2004@outlook.com)

## Context

We currently use OAuth 2.0 with JWTs for authentication. Utilizing this system to implement Role Based Access Control
(RBAC) will prove to be difficult.

## Decisions

- Move to Firebase Authentication with Google as provider
- Use Firebase's free tier (up to 50k auth hits)
- Let Firebase handle credential storage and validation

## Consequences / adaptations

- Removes need to maintain OAuth 2.0 flow and JWT management
- Offloads security responsibilities to Firebase
- Opens up possibility to implement RBAC through Firebase custom claims
- Creates dependency on Firebase service

## References

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Custom Claims for RBAC in Firebase](https://firebase.google.com/docs/auth/admin/custom-claims)