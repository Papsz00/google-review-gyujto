import { notFound } from 'next/navigation';
import { App } from '../../components/App';
import { clientEntries, getClientBySlug } from '../../config/clients';

export function generateStaticParams() {
  return clientEntries.map((c) => ({ client: c.slug }));
}

export default async function ClientPage({ params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const entry = getClientBySlug(client);
  if (!entry) return notFound();

  return <App config={entry.config} clientSlug={entry.slug} />;
}
