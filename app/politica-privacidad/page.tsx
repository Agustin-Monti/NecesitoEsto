// app/politica-privacidad/page.tsx
import LegalPageLayout from '@/components/LegalPageLayout';

export default function PoliticaPrivacidad() {
  return (
    <LegalPageLayout title="Política de Privacidad">
      <div className="space-y-8">
        <section>
          <h2>1. Información que Recopilamos</h2>
          <p>Recopilamos la siguiente información:</p>
          <ul>
            <li><strong>Información personal:</strong> nombre, email, teléfono</li>
            <li><strong>Información de perfil:</strong> empresa, rubro, ubicación</li>
            <li><strong>Información de uso:</strong> demandas publicadas, ofertas realizadas</li>
            <li><strong>Información técnica:</strong> IP, navegador, dispositivo</li>
          </ul>
        </section>

        <section>
          <h2>2. Uso de la Información</h2>
          <p>Utilizamos su información para:</p>
          <ul>
            <li>Proveer y mejorar nuestros servicios</li>
            <li>Facilitar conexiones entre usuarios</li>
            <li>Enviar comunicaciones importantes</li>
            <li>Personalizar su experiencia</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>
        </section>

        <section>
          <h2>3. Compartición de Información</h2>
          <p>Compartimos información en estos casos:</p>
          <ul>
            <li><strong>Entre usuarios:</strong> Al realizar una oferta, el oferente recibe información de contacto del demandante</li>
            <li><strong>Proveedores de servicio:</strong> Hosting, email marketing, análisis</li>
            <li><strong>Requerimientos legales:</strong> Cuando es obligatorio por ley</li>
          </ul>
        </section>

        <section>
          <h2>4. Sus Derechos</h2>
          <p>Usted tiene derecho a:</p>
          <ul>
            <li>Acceder a sus datos personales</li>
            <li>Rectificar datos inexactos</li>
            <li>Eliminar sus datos personales</li>
            <li>Oponerse al tratamiento de datos</li>
            <li>Portabilidad de datos</li>
          </ul>
        </section>

        <section>
          <h2>5. Seguridad</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger 
            sus datos. Sin embargo, ningún sistema es 100% seguro.
          </p>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>
            Utilizamos cookies para mejorar su experiencia. Puede gestionar sus 
            preferencias de cookies en cualquier momento.
          </p>
        </section>

        <section>
          <h2>7. Contacto</h2>
          <p>
            Para ejercer sus derechos o consultas sobre privacidad: 
            privacidad@necesitoesto.com
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}