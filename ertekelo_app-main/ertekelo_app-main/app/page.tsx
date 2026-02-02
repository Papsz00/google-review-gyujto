import { redirect } from 'next/navigation';
import { defaultClientSlug } from '../config/clients';

export default function HomePage() {
  redirect(`/${defaultClientSlug}`);
}


