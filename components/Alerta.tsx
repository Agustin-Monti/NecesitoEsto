import { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export type AlertaTipo = 'success' | 'error' | 'warning' | 'info';

interface AlertaProps {
  tipo: AlertaTipo;
  mensaje: string;
  visible: boolean;
  onClose: () => void;
  autoCerrar?: boolean;
  duracion?: number;
}

const Alerta: React.FC<AlertaProps> = ({
  tipo,
  mensaje,
  visible,
  onClose,
  autoCerrar = true,
  duracion = 5000
}) => {
  // Configuración por tipo
  const config = {
    success: {
      icon: CheckCircleIcon,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-400'
    },
    error: {
      icon: XCircleIcon,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-400'
    },
    warning: {
      icon: ExclamationTriangleIcon,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-400'
    },
    info: {
      icon: InformationCircleIcon,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-400'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[tipo];

  // Auto cerrar después de un tiempo
  useEffect(() => {
    if (visible && autoCerrar) {
      const timer = setTimeout(() => {
        onClose();
      }, duracion);

      return () => clearTimeout(timer);
    }
  }, [visible, autoCerrar, duracion, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-500">
      <div className={`${bgColor} ${borderColor} ${textColor} border rounded-xl shadow-lg max-w-sm w-full`}>
        <div className="flex p-4">
          <div className="flex-shrink-0">
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{mensaje}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${bgColor.split('-')[1]}-50 focus:ring-${bgColor.split('-')[1]}-600 transition-colors`}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Barra de progreso para auto cerrar */}
        {autoCerrar && (
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-current h-1 rounded-full transition-all duration-1000 ease-linear"
              style={{ 
                width: '100%',
                animation: `shrink ${duracion}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Alerta;