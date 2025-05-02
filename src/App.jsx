// Modified App.jsx with EmailJS implementation

import { useState, useEffect } from 'react'
import { FaBalanceScale, FaGavel, FaHandshake, FaBook, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: null,
    error: null
  })
  
  const [formErrors, setFormErrors] = useState({
    name: null,
    email: null,
    phone: null,
    message: null
  })

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    // Reemplazar 'YOUR_PUBLIC_KEY' con tu actual EmailJS public key
    emailjs.init("NPFppts74nYqJf4Ci");
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
    }
  }

  // Form validation function
  const validateForm = (data) => {
    const errors = {};
    
    // Name validation
    if (!data.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    
    // Email validation
    if (!data.email.trim()) {
      errors.email = 'El correo electrónico es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        errors.email = 'Por favor ingrese un correo electrónico válido';
      }
    }
    
    // Message validation
    if (!data.message.trim()) {
      errors.message = 'El mensaje es requerido';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: null
      }));
    }
  };
  
  const handleBlur = (e) => {
    const { id, value } = e.target;
    
    // Validate just this field on blur
    const fieldErrors = validateForm({
      ...formData,
      [id]: value
    });
    
    if (fieldErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: fieldErrors[id]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all form fields
    const errors = validateForm(formData);
    
    // If there are errors, display them and stop submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus({
        submitting: false,
        success: null,
        error: 'Por favor corrija los errores en el formulario.'
      });
      return;
    }
    
    setFormStatus({
      submitting: true,
      success: null,
      error: null
    });

    // EmailJS Configuracion
    // Reemplace estos valores por su actual EmailJS service ID and template ID
    const serviceId = 'service_ozy7fik';
    const templateId = 'template_f2fqs41';

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      phone: formData.phone || 'No proporcionado',
      message: formData.message
    };

    try {
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams);
      
      setFormStatus({
        submitting: false,
        success: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
        error: null
      });
      
      // Reset form
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
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaBalanceScale className="text-yellow-400 text-2xl" />
            <span className="text-xl font-serif font-bold">Delgado Maradiaga Y Asociados</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection('inicio')}
              className={`hover:text-yellow-400 transition ${activeSection === 'inicio' ? 'text-yellow-400' : ''}`}
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('filosofia')}
              className={`hover:text-yellow-400 transition ${activeSection === 'filosofia' ? 'text-yellow-400' : ''}`}
            >
              Filosofía
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className={`hover:text-yellow-400 transition ${activeSection === 'servicios' ? 'text-yellow-400' : ''}`}
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className={`hover:text-yellow-400 transition ${activeSection === 'nosotros' ? 'text-yellow-400' : ''}`}
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className={`hover:text-yellow-400 transition ${activeSection === 'contacto' ? 'text-yellow-400' : ''}`}
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4 px-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('inicio')}
                className={`hover:text-yellow-400 transition ${activeSection === 'inicio' ? 'text-yellow-400' : ''}`}
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('filosofia')}
                className={`hover:text-yellow-400 transition ${activeSection === 'filosofia' ? 'text-yellow-400' : ''}`}
              >
                Filosofía
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className={`hover:text-yellow-400 transition ${activeSection === 'servicios' ? 'text-yellow-400' : ''}`}
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('nosotros')}
                className={`hover:text-yellow-400 transition ${activeSection === 'nosotros' ? 'text-yellow-400' : ''}`}
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className={`hover:text-yellow-400 transition ${activeSection === 'contacto' ? 'text-yellow-400' : ''}`}
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="inicio" className="relative bg-gradient-to-br from-blue-500 to-indigo-800 text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Expertos en Derecho</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              <cite>Somos una empresa con la finalidad principal de realizar auditorias administrativas y financieras. Estudios de factibilidad de proyectos, adecuación de sistemas contables a sistemas computarizados, instalación de redes, elaboración de software para cualquier actividad empresarial, adecuar registros contables de empresas y proporcionar asesorías administrativas y financieras.</cite>
            </p>
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Leer Mas
            </button>
          </div>
        </section>

        {/* Filosofía Section */}
        <section id="filosofia" className="py-16 bg-gray-50 mt-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">Nuestra Filosofía</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaHandshake className="text-yellow-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Honestidad</h3>
                <p className="text-gray-600">
                  Transparencia y comunicación clara en cada paso del proceso legal.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaGavel className="text-yellow-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Excelencia</h3>
                <p className="text-gray-600">
                  La más alta calidad en servicios legales, con atención meticulosa a cada detalle.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaBook className="text-yellow-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Compromiso</h3>
                <p className="text-gray-600">
                  Defendemos los derechos de nuestros clientes con pasión y dedicación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios Section */}
        <section id="servicios" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">Nuestros Servicios</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                title="Auditoria de estados financieros"
                description="Ofrecemos la revisión y adecuación de los procedimientos establecidos, análisis e investigación de los movimientos y saldos de las cuentas de los estados financieros, establecimiento de métodos y procedimientos de control sean estos técnicos o administrativos, la certificación de los estados financieros y nuestra opinión como auditores independientes"
              />
              <ServiceCard
                title="Servicios de auditoría Interna"
                description="Siguiendo los pasos de la globalización, ofrecemos los servicios de Auditoría Interna para las empresas, llevando a cabo planes de trabajo para el desarrollo de una fiscalización y revisión de las operaciones en forma eficiente y eficaz durante todo el período contable, además de arqueos sorpresivos y tomas de inventario."
              />
              <ServiceCard
                title="Ingeniería en Sistemas"
                description="Nuestra firma asociada LUGON, Auditing Consulting especialistas en sistemas tecnológicos, ha desarrollado el software para la prevención del lavado de activos y financiamiento del terrorismo (PLA/FT), así como el software de monitoreo de operaciones."
              />
              <ServiceCard
                title="Servicios de Asociados"
                description="Como complemento a nuestros servicios profesionales, contamos con personal asociado a nuestra firma en las especialidades de Sistemas de Información, Ingeniería Civil, Industria,  Asesoría Legal y otras."
              />
              <ServiceCard
                title="Implementaciones Tecnológicas"
                description="Auditoría al entorno tecnológico basado en COBIT.
                            Auditoría de Seguridad de la Información.
                            Instalación y mantenimiento de Software Administrativo-Financiero-Contable.
                            Instalación y mantenimiento de Software de Prevención de Lavado de Activos y Financiamiento del Terrorismo (PLA/FT) ."
              />
              <ServiceCard
                title="Derecho Inmobiliario"
                description="Transacciones de bienes raíces y contratos de arrendamiento."
              />
            </div>
          </div>
        </section>

        {/* Nosotros Section */}
        <section id="nosotros" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">Nuestro Equipo</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <TeamMember
                name="Dr. Javier Mendoza"
                position="Socio Fundador"
                bio="Especialista en derecho corporativo con más de 30 años de experiencia."
              />
              <TeamMember
                name="Dra. Ana Lucía Rojas"
                position="Socia"
                bio="Experta en derecho familiar y sucesiones, con enfoque humanizado."
              />
              <TeamMember
                name="Lic. Carlos Villanueva"
                position="Socio"
                bio="Especialista en litigio civil y arbitraje, estrategia legal innovadora."
              />
            </div>
          </div>
        </section>

        {/* Contacto Section - UPDATED WITH EMAILJS */}
        <section id="contacto" className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">Contáctenos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-yellow-400 mt-1 mr-3" />
                    <p>Condominios Toncontín, calle principal de Lomas de Toncontín hacia la Fuerza Aérea, contiguo a FECORAH<br/>casa No. 29, Comayagüela, Francisco Morazán , Honduras</p>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-yellow-400 mr-3" />
                    <p>2234-3340 /42 <br />3175-3538 <br/>3175-3542.</p>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-yellow-400 mr-3" />
                    <p>auditoria@delgadomaradiaga.com</p>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-yellow-400 mr-3" />
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
                      className={`w-full px-4 py-2 rounded text-gray-800 bg-amber-50 ${
                        formErrors.name ? 'border-2 border-red-500' : 'border-amber-400'
                      }`}
                      placeholder="Su nombre"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1">Correo Electrónico <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-2 rounded text-gray-800 bg-amber-50 ${
                        formErrors.email ? 'border-2 border-red-500' : 'border-amber-400'
                      }`}
                      placeholder="Su email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-1">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      className={`w-full px-4 py-2 rounded text-gray-800 bg-amber-50 ${
                        formErrors.phone ? 'border-2 border-red-500' : 'border-amber-400'
                      }`}
                      placeholder="Su teléfono"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1">Mensaje <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      rows="4"
                      className={`w-full px-4 py-2 rounded text-gray-800 bg-amber-50 ${
                        formErrors.message ? 'border-2 border-red-500' : 'border-amber-400'
                      }`}
                      placeholder="Su mensaje"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                    )}
                  </div>
                  
                  {/* Form Status Messages */}
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
                    className={`bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition duration-300 ${
                      formStatus.submitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
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
      <footer className="bg-gradient-to-br from-blue-500 to-indigo-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl text-yellow-400 font-bold mb-4 font-serif">Nosotros</h3>
              <p>Expertos en derecho comprometidos con la excelencia y la justicia para nuestros clientes.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-yellow-400">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('inicio')} className="hover:text-yellow-400 transition">Inicio</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className="hover:text-yellow-400 transition">Servicios</button></li>
                <li><button onClick={() => scrollToSection('nosotros')} className="hover:text-yellow-400 transition">Nosotros</button></li>
                <li><button onClick={() => scrollToSection('contacto')} className="hover:text-yellow-400 transition">Contacto</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-yellow-400">Servicios</h4>
              <ul className="space-y-2">
                <li>Ingenieria en Sistemas</li>
                <li>Auditoria</li>
                <li>Servicios Asociados</li>
                <li>Propiedad Intelectual</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-yellow-400">Contactenos</h4>
              <p>Condominios Toncontín, calle principal de Lomas de Toncontín hacia la Fuerza Aérea, contiguo a FECORAH<br/>casa No. 29,</p>
              <p>Tegucigalpa, Honduras</p>
              <p>auditoria@delgadomaradiaga.com</p>
              <p>3175-3538</p>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} Bufete Legal. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ServiceCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 h-full">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button className="mt-4 text-yellow-500 font-semibold hover:underline">
        Más información
      </button>
    </div>
  )
}

function TeamMember({ name, position, bio }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-yellow-500 mb-3">{position}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  )
}

export default App