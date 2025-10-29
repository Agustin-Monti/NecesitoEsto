// app/aviso-legal/page.tsx
import LegalPageLayout from '@/components/LegalPageLayout';

export default function AvisoLegal() {
  return (
    <LegalPageLayout title="Aviso Legal">
      <div className="space-y-8">
        <section className="bg-blue-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Información General Superficial Momentaneamente</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Razón Social</h3>
              <p className="text-gray-700">Necesito Esto! S.A.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">CUIT/CUIL</h3>
              <p className="text-gray-700">30-12345678-9</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Domicilio Legal</h3>
              <p className="text-gray-700">Av. Siempre Viva 123, Buenos Aires, Argentina</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Actividad</h3>
              <p className="text-gray-700">Plataforma digital de conexión entre demandantes y proveedores</p>
            </div>
          </div>
        </section>

        <section>
          <h2>1. Datos de la Empresa</h2>
          <ul>
            <li><strong>Nombre Comercial:</strong> Necesito Esto!</li>
            <li><strong>Razón Social:</strong> Necesito Esto! S.A.</li>
            <li><strong>CUIT:</strong> 30-12345678-9</li>
            <li><strong>Domicilio Social:</strong> Av. Siempre Viva 123, CABA, Argentina</li>
            <li><strong>Teléfono:</strong> +54 9 11 1234-5678</li>
            <li><strong>Email:</strong> legal@necesitoesto.com</li>
            <li><strong>Inscripción:</strong> Registro Público de Comercio de CABA, Tomo X, Folio Y</li>
          </ul>
        </section>

        <section>
          <h2>2. Propiedad Intelectual e Industrial</h2>
          <p>
            Todos los contenidos de este sitio web (textos, imágenes, marcas, 
            logotipos, archivos de audio, archivos de software, combinaciones 
            de colores, así como la estructura, selección, ordenación y 
            presentación de sus contenidos) están protegidos por las leyes de 
            Propiedad Intelectual e Industrial.
          </p>
          <p>
            Queda expresamente prohibida la reproducción, distribución, 
            comunicación pública y transformación, total o parcial, sin la 
            autorización expresa de Necesito Esto! S.A.
          </p>
        </section>

        <section>
          <h2>3. Condiciones de Uso</h2>
          <p>
            El acceso a este sitio web implica la aceptación plena de estos 
            términos. El uso de determinados servicios ofrecidos en este sitio 
            estará sometido a condiciones particulares propias.
          </p>
        </section>

        <section>
          <h2>4. Limitación de Responsabilidad</h2>
          <p>
            Necesito Esto! S.A. no se hace responsable de los daños y perjuicios 
            de cualquier naturaleza que puedan derivarse de:
          </p>
          <ul>
            <li>La falta de disponibilidad o continuidad del funcionamiento del sitio</li>
            <li>La defraudación de la utilidad que los usuarios hubieren podido atribuir al sitio</li>
            <li>La fiabilidad, exactitud o veracidad de los contenidos</li>
            <li>Los acuerdos comerciales entre usuarios de la plataforma</li>
          </ul>
        </section>

        <section>
          <h2>5. Legislación Aplicable y Jurisdicción</h2>
          <p>
            Este Aviso Legal se rige por la legislación argentina. Para la 
            resolución de cualquier conflicto que pudiera derivarse del acceso 
            a la página web, el usuario y Necesito Esto! S.A. se someterán 
            expresamente a los juzgados y tribunales de la Ciudad de Buenos Aires, 
            con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
          </p>
        </section>

        <section>
          <h2>6. Protección de Datos</h2>
          <p>
            De conformidad con lo establecido en la Ley 25.326 de Protección de 
            Datos Personales, le informamos que sus datos personales serán 
            incorporados a un fichero titularidad de Necesito Esto! S.A., 
            debidamente inscrito en la Agencia de Acceso a la Información Pública.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );

}
