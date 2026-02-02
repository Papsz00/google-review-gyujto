import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getClientBySlug } from '../../../config/clients';

type Payload = {
  clientSlug?: string;
  companyName: string;
  rating: number;
  feedback: string;
  name?: string;
  phone?: string;
  email?: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export async function POST(req: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const defaultResendTo = process.env.RESEND_TO || 'matepolo06@gmail.com';
  const resendFrom = process.env.RESEND_FROM || '"Értékelés" <no-reply@example.com>';

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const p = body as Partial<Payload>;
  if (!isNonEmptyString(p.companyName)) {
    return NextResponse.json({ error: 'companyName is required' }, { status: 400 });
  }
  if (typeof p.rating !== 'number' || !Number.isFinite(p.rating) || p.rating < 1 || p.rating > 5) {
    return NextResponse.json({ error: 'rating must be 1..5' }, { status: 400 });
  }
  if (!isNonEmptyString(p.feedback)) {
    return NextResponse.json({ error: 'feedback is required' }, { status: 400 });
  }

  const clientSlug = isNonEmptyString(p.clientSlug) ? p.clientSlug.trim() : '';
  const entry = clientSlug ? getClientBySlug(clientSlug) : undefined;
  const resendTo = entry?.emailTo || defaultResendTo;

  const subject = `[${p.companyName}] Új visszajelzés (panasz) – ${p.rating}/5`;

  const lines: string[] = [];
  lines.push('Új panasz érkezett');
  lines.push('=================');
  lines.push(`Cég: ${p.companyName}`);
  lines.push(`Értékelés: ${p.rating}/5`);
  lines.push(`Időpont: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('Üzenet');
  lines.push('------');
  lines.push(p.feedback.trim());
  lines.push('');

  const name = isNonEmptyString(p.name) ? p.name.trim() : '';
  const phone = isNonEmptyString(p.phone) ? p.phone.trim() : '';
  const email = isNonEmptyString(p.email) ? p.email.trim() : '';

  lines.push('Kapcsolat (opcionális)');
  lines.push('----------------------');
  lines.push(`Név: ${name || '-'}`);
  lines.push(`Telefon: ${phone || '-'}`);
  lines.push(`Email: ${email || '-'}`);

  // If no API key is configured, simulate success so the UI flow can be tested locally.
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not set - skipping actual email send.');
    return NextResponse.json({ ok: true, skipped: true });
  }

  const resend = new Resend(resendApiKey);

  try {
    const result = await resend.emails.send({
      from: resendFrom,
      to: resendTo,
      subject,
      text: lines.join('\n'),
    });

    return NextResponse.json({ ok: true, id: result.data?.id ?? null });
  } catch (err) {
    console.error('Resend email send failed:', err);
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
  }
}


