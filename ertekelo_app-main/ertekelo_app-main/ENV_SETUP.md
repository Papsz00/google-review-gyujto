# Environment setup

This repo blocks committing `.env*` files. Use the values below to create your own local `/.env.local` (do **not** commit it) and to configure Vercel.

## Required (Resend)

```
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXX
```

## Optional (defaults for quick testing)

If `RESEND_TO` is not set, the API route falls back to `matepolo06@gmail.com` (dev/testing only).

```
RESEND_TO=matepolo06@gmail.com
RESEND_FROM="Értékelés" <no-reply@yourdomain.com>
```

## Multi-client build selector

```
NEXT_PUBLIC_CLIENT_ID=drkovacs
```

## Analytics (optional)

```
NEXT_PUBLIC_GA_ID=
```


