ertekelo_app

## Multi-client builds (recommended)

This project supports one build per client using a client config file.

- Add a new client file under `clients/` (copy `clients/drkovacs.ts`).
- Select which client to build via environment variable:
  - `NEXT_PUBLIC_CLIENT_ID=drkovacs`

On Vercel, set `NEXT_PUBLIC_CLIENT_ID` per project (or per deployment) to create separate builds per client.

## Environment variables (Resend / Analytics)

See `ENV_SETUP.md` for the exact env var names and examples.
