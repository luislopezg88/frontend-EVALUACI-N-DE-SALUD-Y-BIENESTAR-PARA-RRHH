import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";

// Define la información de los recursos
const recursos = [
  {
    titulo: "1. Burnout: Cómo Identificarlo y Prevenirlo",
    descripcion:
      "Este artículo te guiará a través de los signos y síntomas del burnout, ayudándote a identificar si estás experimentando agotamiento. Aprenderás estrategias prácticas para prevenirlo y cuidar de tu bienestar",
    enlace: "https://www.chubb.com/co-es/pymes/articulos/sindrome-burnout.html",
  },
  {
    titulo: "2. Estrategias de Autocuidado para Combatir el Burnout",
    descripcion:
      "Descubre consejos y técnicas efectivas de autocuidado que puedes incorporar en tu rutina diaria para reducir el estrés y prevenir el burnout",
    enlace: "enlace-al-articulo-2",
  },
  {
    titulo: "3. La Importancia de Establecer Límites Personales",
    descripcion:
      'Este recurso explora por qué establecer límites personales es esencial para evitar el burnout. Aprenderás cómo decir "no" de manera saludable y mantener un equilibrio entre trabajo y vida personal',
    enlace: "enlace-al-articulo-2",
  },
  {
    titulo: "4. La Importancia de Establecer Límites Personales",
    descripcion:
      'Este recurso explora por qué establecer límites personales es esencial para evitar el burnout. Aprenderás cómo decir "no" de manera saludable y mantener un equilibrio entre trabajo y vida personal',
    enlace: "enlace-al-articulo-2",
  },
  {
    titulo: "5. Cómo la Resiliencia Puede Ayudarte a Superar el Burnout",
    descripcion:
      "La resiliencia es una habilidad crucial para enfrentar el burnout y superar las adversidades. Este artículo te enseñará cómo desarrollar la resiliencia y mantener una mentalidad positiva",
    enlace: "enlace-al-articulo-2",
  },
  {
    titulo: "6. Gestión del Estrés en el Trabajo: Estrategias Efectivas",
    descripcion:
      "Obtén consejos prácticos para gestionar el estrés en el trabajo y evitar que te lleve al agotamiento. Descubre técnicas de manejo del estrés que te ayudarán a mantenerte saludable y productivo",
    enlace: "enlace-al-articulo-2",
  },

  {
    titulo: "7. Cómo la Meditación y la Mindfulness Pueden Combatir el Burnout",
    descripcion:
      "Explora los beneficios de la meditación y la atención plena para reducir el estrés y promover la claridad mental. Aprende cómo incorporar estas prácticas en tu vida cotidiana",
    enlace: "enlace-al-articulo-2",
  },
  {
    titulo: "8. Burnout en Profesionales de la Salud: Desafíos y Soluciones",
    descripcion:
      "Este recurso se centra en el agotamiento experimentado por profesionales de la salud. Ofrece información sobre los desafíos específicos que enfrentan y estrategias para proteger su bienestar",
    enlace: "enlace-al-articulo-2",
  },
  {
    titulo:
      "9. Apoyo Psicológico: Terapia y Consejería para Superar el Burnout",
    descripcion:
      "Descubre cómo la terapia y la consejería pueden ser recursos valiosos para superar el burnout. Obtén información sobre diferentes enfoques terapéuticos y cómo buscar ayuda profesional",
    enlace: "enlace-al-articulo-2",
  },
  {
    titulo:
      "10. El Papel de la Nutrición y el Ejercicio en la Prevención del Burnout",
    descripcion:
      "Explora cómo una alimentación saludable y el ejercicio físico pueden tener un impacto positivo en tu bienestar emocional y ayudarte a prevenir el burnout",
    enlace: "enlace-al-articulo-2",
  },
  {
    titulo: "11. Historias de Superación del Burnout: Experiencias Personales",
    descripcion:
      "Lee testimonios inspiradores de personas que han enfrentado y superado el burnout. Descubre cómo han aplicado estrategias efectivas para recuperarse y encontrar un equilibrio en sus vidas.",
    enlace: "enlace-al-articulo-2",
  },
  // Agrega más recursos aquí...
];

export default function Biblioteca() {
  // Inicializa resourceOpen con -1 para indicar que ningún recurso está abierto inicialmente
  const [resourceOpen, setResourceOpen] = useState(-1);

  // Función para manejar la apertura/cierre del acordeón
  const toggleResource = (index: number) => {
    if (resourceOpen === index) {
      setResourceOpen(-1); // Cierra el recurso
    } else {
      setResourceOpen(index); // Abre el recurso con el índice proporcionado
    }
  };

  return (
    <PortalLayout>
      <div className="container">
        <div className="row">
          <div className="card mt-2 mb-5">
            <div className="card-header">
              <h2 className="text-center text-primary ">
                Biblioteca de Recursos
              </h2>
            </div>

            <div className="col-12 col-sm-12 mt-4">
              <div className="">
                <div className="">
                  {recursos.map((recurso, index) => (
                    <div className="mb-2 p-2">
                      <div key={index} className="resource">
                        <h5
                          className="titulo-acordeon"
                          onClick={() => toggleResource(index)}
                        >
                          {recurso.titulo}
                        </h5>
                        {resourceOpen === index && (
                          <div>
                            <p>{recurso.descripcion}</p>
                            <button>
                              <a
                                className="enlace-acordeon"
                                href={recurso.enlace}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Leer más
                              </a>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
