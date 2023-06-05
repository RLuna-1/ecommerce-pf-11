import React, { useState } from 'react';
import '../css/FilterComponent.css'; // Importar el archivo CSS

function FilterComponent() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  //const [selectedSystemRequirements, setSelectedSystemRequirements] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleOptionChange = (option, selectedOptions, setSelectedOptions) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="filter-container">
      <div className="option">
        <h2 className="option-title">Categorías</h2>
        <div className="suboptions">
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Diseño gráfico')}
              onChange={() =>
                handleOptionChange('Diseño gráfico', selectedCategories, setSelectedCategories)
              }
            />
            Diseño gráfico
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Desarrollo web')}
              onChange={() =>
                handleOptionChange('Desarrollo web', selectedCategories, setSelectedCategories)
              }
            />
            Desarrollo web
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Administración de proyectos')}
              onChange={() =>
                handleOptionChange('Administración de proyectos', selectedCategories, setSelectedCategories)
              }
            />
            Administración de proyectos
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Marketing y publicidad')}
              onChange={() =>
                handleOptionChange('Marketing y publicidad', selectedCategories, setSelectedCategories)
              }
            />
            Marketing y publicidad
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Contabilidad y finanzas')}
              onChange={() =>
                handleOptionChange('Contabilidad y finanzas', selectedCategories, setSelectedCategories)
              }
            />
            Contabilidad y finanzas
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Recursos humanos')}
              onChange={() =>
                handleOptionChange('Recursos humanos', selectedCategories, setSelectedCategories)
              }
            />
            Recursos humanos
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Seguridad y antivirus')}
              onChange={() =>
                handleOptionChange('Seguridad y antivirus', selectedCategories, setSelectedCategories)
              }
            />
            Seguridad y antivirus
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Multimedia')}
              onChange={() =>
                handleOptionChange('Multimedia', selectedCategories, setSelectedCategories)
              }
            />
            Multimedia
          </label>
        </div>
      </div>

      <div className="option">
        <h2 className="option-title">Tipo de licencia</h2>
        <div className="suboptions">
          <label>
            <input
              type="checkbox"
              checked={selectedLicenseTypes.includes('Licencia de por vida')}
              onChange={() =>
                handleOptionChange('Licencia de por vida', selectedLicenseTypes, setSelectedLicenseTypes)
              }
            />
            Licencia de por vida
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLicenseTypes.includes('Licencia mensual')}
              onChange={() =>
                handleOptionChange('Licencia mensual', selectedLicenseTypes, setSelectedLicenseTypes)
              }
            />
            Licencia mensual
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLicenseTypes.includes('Suscripción anual')}
              onChange={() =>
                handleOptionChange('Suscripción anual', selectedLicenseTypes, setSelectedLicenseTypes)
              }
            />
            Suscripción anual
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLicenseTypes.includes('Gratuito')}
              onChange={() =>
                handleOptionChange('Gratuito', selectedLicenseTypes, setSelectedLicenseTypes)
              }
            />
            Gratuito
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLicenseTypes.includes('Suscripción anual')}
              onChange={() =>
                handleOptionChange('Suscripción anual', selectedLicenseTypes, setSelectedLicenseTypes)
              }
            />
            Suscripción anual
          </label>
        </div>
      </div>
      <div className="option">
        <h2 className="option-title">Plataforma</h2>
        <div className="suboptions">
          <label>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes('Windows')}
              onChange={() =>
                handleOptionChange('Windows', selectedPlatforms, setSelectedPlatforms)
              }
            />
            Windows
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes('Mac')}
              onChange={() =>
                handleOptionChange('Mac', selectedPlatforms, setSelectedPlatforms)
              }
            />
            Mac
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes('Linux')}
              onChange={() =>
                handleOptionChange('Linux', selectedPlatforms, setSelectedPlatforms)
              }
            />
            Linux
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes('Android')}
              onChange={() =>
                handleOptionChange('Android', selectedPlatforms, setSelectedPlatforms)
              }
            />
            Android
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes('iOS')}
              onChange={() =>
                handleOptionChange('iOS', selectedPlatforms, setSelectedPlatforms)
              }
            />
            iOS
          </label>
        </div>
      </div>

      <div className="option">
        <h2 className="option-title">Funcionalidades clave</h2>
        <div className="suboptions">
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Edición de imágenes')}
              onChange={() =>
                handleOptionChange('Edición de imágenes', selectedFeatures, setSelectedFeatures)
              }
            />
            Edición de imágenes
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Gestión de proyectos')}
              onChange={() =>
                handleOptionChange('Gestión de proyectos', selectedFeatures, setSelectedFeatures)
              }
            />
            Gestión de proyectos
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Creación de sitios web responsivos')}
              onChange={() =>
                handleOptionChange('Creación de sitios web responsivos', selectedFeatures, setSelectedFeatures)
              }
            />
            Creación de sitios web responsivos
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Automatización de marketing')}
              onChange={() =>
                handleOptionChange('Automatización de marketing', selectedFeatures, setSelectedFeatures)
              }
            />
            Automatización de marketing
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Contabilidad y facturación')}
              onChange={() =>
                handleOptionChange('Contabilidad y facturación', selectedFeatures, setSelectedFeatures)
              }
            />
            Contabilidad y facturación
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Contabilidad y facturación')}
              onChange={() =>
                handleOptionChange('Contabilidad y facturación', selectedFeatures, setSelectedFeatures)
              }
            />
            Contabilidad y facturación
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Protección contra malware')}
              onChange={() =>
                handleOptionChange('Protección contra malware', selectedFeatures, setSelectedFeatures)
              }
            />
            Protección contra malware
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Edición de video')}
              onChange={() =>
                handleOptionChange('Edición de video', selectedFeatures, setSelectedFeatures)
              }
            />
            Edición de video
          </label>
          
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;