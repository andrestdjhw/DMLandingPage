import { useState, useEffect } from 'react';
import { FaGavel, FaHandshake, FaBook, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaUserShield, FaBolt, FaBullseye, FaEye } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import DMLogoImage from './assets/DMLogo.png';

function App() {
  // State declarations
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [showMore, setShowMore] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: null,
    error: null
  });
  const [formErrors, setFormErrors] = useState({
    name: null,
    email: null,
    phone: null,
    message: null
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("F_nbCg0rutBQqBcjD");
  }, []);

  // Menu toggle function
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const navbarHeight = document.querySelector('nav').offsetHeight;

    if (element) {
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  // Accordion toggle function
  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Accordion Item Component
  const AccordionItem = ({ title, items, description, details, isOpen, toggleAccordion }) => {
    return (
      <div className="border-b border-[#546c94] shadow-lg">
        <button
          className="w-full py-4 px-6 text-left bg-white hover:bg-gray-50 focus:outline-none flex justify-between items-center"
          onClick={toggleAccordion}
        >
          <span className="text-lg font-medium text-gray-800">{title}</span>
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {isOpen && (
          <div className="py-4 px-6 bg-[#3c5472]">
            {description && <p className="text-white mb-4">{description}</p>}
            {details && (
              <div className="mb-4">
                {details.map((detail, index) => (
                  <p key={`detail-${index}`} className="text-white mb-2">
                    {detail.startsWith('**') ? (
                      <strong>{detail.replace(/\*\*/g, '')}</strong>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            )}
            <ul className="list-disc pl-5 space-y-2">
              {items.map((item, index) => (
                <li key={`item-${index}`} className="text-white">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // ServiceCard Component
  const ServiceCard = ({ title, description }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg shadow-[#145870]/50 ring-blue-600 transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  // TeamMember Component
  const TeamMember = ({ name, position, bio }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-blue-500 mb-3">{position}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    );
  };

  // Accordion data
  const accordionData = [
    {
      title: "Implementaciones Tecnológicas",
      items: [
        "Auditoría al entorno tecnológico basado en COBIT.",
        "Auditoría de Seguridad de la Información.",
        "Instalación y mantenimiento de Software Administrativo-Financiero-Contable.",
        "Instalación y mantenimiento de Software de Prevención de Lavado de Activos y Financiamiento del Terrorismo (PLA/FT).",
      ],
    },
    {
      title: "Consultorías",
      items: [
        "Elaborar un plan de acción. Crear estrategias a seguir en el corto y mediano plazo tomando en consideración los resultados encontrados en la auditoría y por el otro, del objetivo que tenga la organización.",
        "Crear un plan para recorte de gastos o una planeación fiscal para el pago de impuestos, replantear el plan de negocios o buscar alternativas de financiamiento para evitar que se sigan incrementando las deudas.",
        "Auxiliar en la puesta en marcha. La consultoría financiera también puede ayudar en la forma en que se implementa el plan de acción, para que se haga de manera óptima.",
        "Evaluar los resultados. Revisar cuáles son las dificultades que se presentaron para no obtener los resultados esperados y si se trata de factores externos o internos.",
      ],
      description: "Como estrategia de crecimiento empresarial, hacemos evaluaciones y realizamos auditorías para conocer la situación actual en la que se encuentra la organización para crear una estrategia integral que permita optimizar los recursos con los que se cuenta, para lograr las metas del plan de negocios. Entre las principales consultorías que ofrecemos están la consultoría financiera que puede abarcar, como las relacionadas con el entorno fiscal y administrativo del negocio. Sus principales tareas estarían enfocadas en lo siguiente:",
      details: [
        "",
        "",
        "",
        ""
      ]
    },
    {
      title: "Seminarios",
      items: [
        "Normas Internacionales de Contabilidad.",
        "Normas de Información Financiera.",
        "Manejo de Inventarios.",
        "Lavado de Activos y Financiamiento al Terrorismo.",
        "Precios de Transferencia.",
        "Auditorías a Fideicomisos.",
        "Seguridad de la Información.",
        "Riesgo Operativo.",
      ],
    },
  ];

  // Form validation
  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = 'El nombre es requerido';
    if (!data.email.trim()) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Por favor ingrese un correo electrónico válido';
    }
    if (!data.message.trim()) errors.message = 'El mensaje es requerido';
    return errors;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (formErrors[id]) setFormErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const fieldErrors = validateForm({ ...formData, [id]: value });
    if (fieldErrors[id]) setFormErrors(prev => ({ ...prev, [id]: fieldErrors[id] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus({ submitting: false, success: null, error: 'Por favor corrija los errores en el formulario.' });
      return;
    }

    setFormStatus({ submitting: true, success: null, error: null });

    try {
      await emailjs.send(
        'service_bb1ywxq',
        'template_hqmvdvy',
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone || 'No proporcionado',
          message: formData.message
        }
      );

      setFormStatus({
        submitting: false,
        success: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
        error: null
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setFormStatus({
        submitting: false,
        success: null,
        error: 'Error al enviar el mensaje. Por favor intente nuevamente.'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="bg-gray-50 text-black shadow-lg sticky top-0 z-50 h-24">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={DMLogoImage} alt="Delgado Maradiaga y Asociados" className='h-24' />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {['inicio', 'filosofia', 'servicios', 'nosotros', 'contacto'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`hover:text-[002366] transition ${activeSection === section ? 'font-bold text-[002366]' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-black focus:outline-none z-50" onClick={toggleMenu}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-gray-50 bg-opacity-95 z-40 pt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col space-y-6 py-8">
                {['inicio', 'filosofia', 'servicios', 'nosotros', 'contacto'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-xl py-3 hover:text-[002366] transition ${activeSection === section ? 'font-bold text-[002366]' : ''}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="inicio" className="relative bg-gradient-to-br from-[#546c94] to-[#3c5472] text-white py-20 md:py-32 pt-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Auditores y Consultores</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              <cite className='text-base text-gray-300'>Somos una Firma de Auditoría, Inscrita legalmente ante las leyes de nuestro país y ante los entes Supervisores del Sistema Financiero como la Comisión Nacional de Bancos y Seguros (CNBS) calificados en categoría "B" y el Consejo nacional Supervisor de Cooperativas (CONSUCOOP) calificados con Categoría "A", con la finalidad principal de realizar nuestro trabajo en forma profesional, cumpliendo con las Normas Internacionales de Información Financiera (NIIF) y las Normas Internacionales de Auditoría (NIA´s), cumpliendo con los estándares establecidos, con ética y dinamismo, para cumplir con nuestras actividades como ser: auditorias financieras, auditorías administrativas, Auditorías Forenses, Auditorías basadas en riesgos, Auditorías especiales, Precios de Transferencia, adecuación de sistemas contables y toda actividad relacionada con nuestra finalidad y dentro de los marcos legales.</cite>
            </p>
            <button
              onClick={() => scrollToSection('servicios')}
              className="bg-[#0f4cbc] hover:bg-blue-600 text-white-900 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Leer Mas
            </button>
          </div>
        </section>

        {/* Filosofía Section */}
        <section id="filosofia" className="py-16 bg-gradient-to-r from-[#546c94] to-[#3c5472] mt-20 pt-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif text-white">Nuestra Filosofía</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Mision */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaBullseye className="text-[002366] text-3xl mr-4" />
                  <h3 className="text-2xl font-bold">Misión</h3>
                </div>
                <p className="text-gray-600 pl-12">
                  Ofrecer servicios de la más alta calidad en las diferentes actividades de las auditorías, mejorar y proteger el valor de la organización proporcionando un aseguramiento, asesoría y análisis en base a riesgos, aplicando técnicas modernas de trabajo y metodologías creativas para lograr un mejor impacto en la gestión de las empresas y su rentabilidad.  
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaEye className="text-[002366] text-3xl mr-4" />
                  <h3 className="text-2xl font-bold">Visión</h3>
                </div>
                <p className="text-gray-600 pl-12">
                  Ser una empresa líder en el mercado de la auditoría y consultoría con excelencia competitiva,
                  logrando la mayor satisfacción en servicios para nuestros clientes.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                { icon: FaHandshake, title: "Integridad", text: "En la forma de actuar tanto en el campo profesional como personal de todo nuestro equipo." },
                { icon: FaGavel, title: "Legalidad", text: "Estudio, profundo conocimiento y respeto." },
                { icon: FaBook, title: "Compromiso", text: "Nuestro máximo esfuerzo por un trabajo con excelencia." },
                { icon: FaUserShield, title: "Confiabilidad", text: "Con la información que nos proporcionan los clientes y con el producto que nuestra firma produce." },
                { icon: FaBolt, title: "Eficiencia", text: "En tiempo y resultados." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <item.icon className="text-[002366] text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios Section */}
        <section id="servicios" className="py-16 pt-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">Nuestros Servicios</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: "Auditoria de estados financieros",
                  description: "Ofrecemos un proceso sistemático de revisión y evaluación de los estados financieros con el objetivo principal es verificar la precisión, integridad y confiabilidad de la información contable y financiera presentada, mediante un examen independente y objetivo, lo que aumenta el valor y la credibilidad de los estados financieros producidos por la administración, para aumentar la confianza de los usuarios, reducir el riesgo del inversor y en consecuencia reducir el costo del capital."
                },
                {
                  title: "Servicios de auditoría Interna",
                  description: "Siguiendo los pasos de la globalización, ofrecemos los servicios de Auditoría Interna tercerizada para las empresas, llevando a cabo planes de trabajo para el desarrollo de una fiscalización y revisión de las operaciones en forma eficiente y eficaz durante todo el período contable y además de aplicar todos los métodos y procedimientos para una auditoría interna eficiente."
                },
                {
                  title: "Tecnología",
                  description: "Nuestra alianza estratégica con la empresa Lugon Auditing Consulting, S. de R. L., con más de 12 años de experiencia, nos da la oportunidad de ofrecer a nuestros clientes una variedad de productos y servicios que abordan las demandas del sector financiero y asegurador. Estos incluyen soluciones de auditoría, consultoría en infraestructura tecnológica y herramientas innovadoras para la gestión de riesgos, prevención de lavado de activos y cumplimiento normativo. Cada producto esta diseñado para proporcionar a nuestros clientes un valor agregado a las instituciones, ayudándolas a mitigar riesgos y optimizar procesos."
                },
                {
                  title: "Servicios de Asociados",
                  description: "Como complemento a nuestros servicios profesionales, contamos con personal asociado a nuestra firma en las especialidades de Sistemas de Información, Ingeniería Civil, Industrial, Asesoría, elaboración de programas basados en riesgos, Asesoría Legal entre especialidades."
                }
              ].map((service, index) => (
                <ServiceCard key={index} title={service.title} description={service.description} />
              ))}
            </div>

            <div className="mt-8 border rounded-lg overflow-hidden shadow-md">
              {accordionData.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  items={item.items}
                  description={item.description}
                  details={item.details}
                  isOpen={openAccordion === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Nosotros Section */}
        <section id="nosotros" className="py-16 bg-gradient-to-r from-[#546c94] to-[#3c5472] pt-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif text-white">Organización</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-12">
              <p className="text-gray-700 mb-6">
                <strong>DELGADO MARADIAGA Y ASOCIADOS S.DE R.L. </strong> tiene el agrado de presentar nuestro nuevo sitio Web,
                con el pretendemos aprovechar las ventajas de las nuevas tecnologías a favor de nuestros clientes,
                convirtiéndose para nosotros en un gran logro cualitativo en la gestión empresarial en todos los niveles.
              </p>

              <p className="text-gray-700 mb-6">
                La empresa opera en Honduras como una Sociedad de Responsabilidad Limitada siendo constituida en escritura pública
                No.486 el 4 de Agosto de 2003, inscrita en el Registro Mercantil con el No.24 Tomo 544 del Registro de Sociedades
                Mercantiles de Tegucigalpa y en el Registro de La Cámara de Comercio e Industrias de Tegucigalpa con el No. 9982, Folio
                5245 Tomo IV de fecha 22 de Septiembre de 2003.
              </p>

              <div className="mb-4">
                <h3 className="text-xl font-bold mb-4">Acreditaciones</h3>
                <p className="text-gray-700 mb-4">En la actualidad nuestra empresa está inscrita en las siguientes instituciones:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Colegio Hondureño de Profesionales Universitarios en Contaduría Pública, bajo el No.05-03-046.</li>
                  <li>Comisión Nacional de Bancos y Seguros, calificados en categoría "B".</li>
                  <li>Consejo Nacional Supervisor de Cooperativas (CONSUCOOP) Calificados en categoría "A".</li>
                  <li>Cámara de Comercio e Industria de Tegucigalpa (CCIT) bajo el No.4352.</li>
                  <li>Asociación de Firmas de Auditoría (socios fundadores), integrados al régimen de control de calidad.</li>
                </ul>
              </div>

              {showMore && (
                <div className="mt-4">
                  <p className="text-gray-700 mb-4">
                    Nuestra firma se distingue por ofrecer servicios profesionales de alta calidad,
                    respaldados por nuestra extensa experiencia y compromiso con la excelencia.
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                {showMore ? "Ver menos" : "Ver más"}
              </button>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: "Lic. Jorge Delgado", position: "Socio - Director", bio: "Cel-3175-3538" },
                { name: "Lic. Ramon Maradiaga", position: "Socio - Gerente", bio: "Cel-3175-3542" },
                { name: "Lic. Lucia del Carmen Maradiaga", position: "Socio", bio: "" },
                { name: "Ing. Ramon Eduardo Maradiaga", position: "Socio", bio: "" }
              ].map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </section>

        {/* Contacto Section */}
        <section id="contacto" className="py-16 bg-gray-900 text-white pt-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">Contáctenos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-[002366] mt-1 mr-3" />
                    <p>Condominios Toncontín, calle principal de Lomas de Toncontín hacia la Fuerza Aérea, contiguo a FECORAH<br />casa No. 29, Comayagüela, Francisco Morazán , Honduras</p>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-[002366] mr-3" />
                    <p>2234-3340 /42 <br />3175-3538 <br />3175-3542.</p>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-[002366] mr-3" />
                    <p>auditoria@delgadomaradiaga.com</p>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-[002366] mr-3" />
                    <p>Lunes a Viernes: 9:00 am - 6:00 pm<br />Sábados: 9:00 am - 1:00 pm</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Envíenos un Mensaje</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block mb-1">Nombre <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-2 rounded text-gray-800 bg-blue-50 ${formErrors.name ? 'border-2 border-red-500' : 'border-amber-400'}`}
                      placeholder="Su nombre"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-1">Correo Electrónico <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-2 rounded text-gray-800 bg-blue-50 ${formErrors.email ? 'border-2 border-red-500' : 'border-amber-400'}`}
                      placeholder="Su email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-1">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      className={`w-full px-4 py-2 rounded text-gray-800 bg-blue-50 ${formErrors.phone ? 'border-2 border-red-500' : 'border-amber-400'}`}
                      placeholder="Su teléfono"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-1">Mensaje <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      rows="4"
                      className={`w-full px-4 py-2 rounded text-gray-800 bg-blue-50 ${formErrors.message ? 'border-2 border-red-500' : 'border-amber-400'}`}
                      placeholder="Su mensaje"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    ></textarea>
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>

                  {formStatus.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                      {formStatus.error}
                    </div>
                  )}

                  {formStatus.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                      {formStatus.success}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`bg-[#0f4cbc] hover:bg-blue-600 text-white-900 font-bold py-3 px-6 rounded-lg transition duration-300 ${formStatus.submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={formStatus.submitting}
                  >
                    {formStatus.submitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#546c94] to-[#3c5472] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl text-white-900 font-bold mb-4 font-serif">Nosotros</h3>
              <p>Expertos en derecho comprometidos con la excelencia y la justicia para nuestros clientes.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white-900">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                {['inicio', 'servicios', 'nosotros', 'contacto'].map((section) => (
                  <li key={section}>
                    <button 
                      onClick={() => scrollToSection(section)} 
                      className="hover:text-blue-600 transition"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white-900">Servicios</h4>
              <ul className="space-y-2">
                <li>Ingenieria en Sistemas</li>
                <li>Auditoria Interna</li>
                <li>Servicios Asociados</li>
                <li>Implementaciones Tecnologicas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white-900">Contactenos</h4>
              <p>Condominios Toncontín, calle principal de Lomas de Toncontín hacia la Fuerza Aérea, contiguo a FECORAH<br />casa No. 29,</p>
              <p>Tegucigalpa, Honduras</p>
              <p>auditoria@delgadomaradiaga.com</p>
              <p>3175-3538</p>
            </div>
          </div>
          <div className="border-t border-[#eff2f7] mt-8 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} Delgado Maradiaga Y Asociados. Todos los derechos reservados.</p>
            <p className='mt-3'><cite>Creado por itsbyte.com</cite></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;