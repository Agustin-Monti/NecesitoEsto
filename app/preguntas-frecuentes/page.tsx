// app/preguntas-frecuentes/page.tsx
import LegalPageLayout from '@/components/LegalPageLayout';
import FAQ from '@/components/FAQ';

export default function PreguntasFrecuentes() {
  return (
    <LegalPageLayout title="Preguntas Frecuentes">
      <FAQ />
    </LegalPageLayout>
  );
}
