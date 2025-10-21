// app/blog/page.tsx (Server Component)
import LegalPageLayout from '@/components/LegalPageLayout';
import Blog from '@/components/Blog';

export default function BlogPage() {
  return (
    <LegalPageLayout title="Blog">
      <Blog />
    </LegalPageLayout>
  );
}