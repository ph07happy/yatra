# Yatra — Authentication Module (Reserved)

This directory is reserved for the future authentication module (`frontend/login/`).

## Future Structure
```text
login/
├── login.html
├── login.css
└── login.js
```

## Planned Specifications
- **Authentication Provider**: Firebase Authentication (Email/Password, Google OAuth).
- **Password Requirements**:
  - Minimum 8 characters.
  - At least 1 uppercase letter (`A-Z`).
  - At least 1 lowercase letter (`a-z`).
  - At least 1 number (`0-9`).
  - At least 1 special character (e.g. `!@#$%^&*`).
- **Validation**:
  - Real-time client-side validation.
  - Password confirmation check (`password === confirmPassword`).
  - Prevention of redundant inputs between login and signup flows.
