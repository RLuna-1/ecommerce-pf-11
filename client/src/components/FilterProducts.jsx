import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, fetchCategories } from "../redux/actions/actions";
import SearchBar from "../components/SearchBar";
import { SearchContext } from "../redux/context/SearchContext";

function Filters() {
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => state);
  const { products } = useSelector((state) => state);
  const { categories } = useSelector((state) => state);

  const { handleSearchInputReset } = useContext(SearchContext);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    event.preventDefault();
    const selectedCategory = event.target.value;
    const updatedCategories = selectedCategory ? [selectedCategory] : [];
    dispatch(
      setFilters({ ...filters, categories: updatedCategories, page: 1 })
    );
  };


  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const handlePlatformChange = (e) => {
    const platform = e.target.value;
    const isChecked = e.target.checked;

    setSelectedPlatforms((prevSelectedPlatforms) => {
      let updatedPlatforms;
      if (isChecked) {
        updatedPlatforms = [...prevSelectedPlatforms, platform];
      } else {
        updatedPlatforms = prevSelectedPlatforms.filter((p) => p !== platform);
      }
      dispatch(
        setFilters({ ...filters, platforms: updatedPlatforms, page: 1 })
      );
      return updatedPlatforms;
    });
  };

  const [selectedLicenses, setSelectedLicenses] = useState([]);

  const handleLicenseChange = (e) => {
    const license = e.target.value;
    const isChecked = e.target.checked;

    setSelectedLicenses((prevSelectedLicenses) => {
      let updatedLicenses;
      if (isChecked) {
        updatedLicenses = [...prevSelectedLicenses, license];
      } else {
        updatedLicenses = prevSelectedLicenses.filter((p) => p !== license);
      }
      dispatch(setFilters({ ...filters, licenses: updatedLicenses, page: 1 }));
      return updatedLicenses;
    });
  };

  const handleOrderChange = (event) => {
    dispatch(setFilters({ ...filters, order: event.target.value }));
  };

  const handleDirectionChange = (event) => {
    dispatch(setFilters({ ...filters, direction: event.target.value }));
  };

  const handleResetClick = () => {
    const resetFilters = {
      name: "",
      categories: [],
      platforms: [],
      licenses: [],
      order: "",
      direction: "",
      page: 1,
    };
    dispatch(setFilters(resetFilters));
    handleSearchInputReset();
    document.querySelectorAll("select").forEach((select) => {
      select.selectedIndex = 0;
    });
    setSelectedPlatforms([]);
    setSelectedLicenses([])
  };

  return (
    <div>
      Filters
      <h2>Categorías</h2>
      <select value={filters.categories} onChange={handleCategoryChange}>
        <option value="" disabled>
          Categorías
        </option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
      </select>
      <h2>Plataformas</h2>
      <label key={1}>
        <input
          type="checkbox"
          value={"windows"}
          checked={selectedPlatforms.includes("windows")}
          onChange={handlePlatformChange}
        />
        Windows
      </label>
      <label key={2}>
        <input
          type="checkbox"
          value={"linux"}
          checked={selectedPlatforms.includes("linux")}
          onChange={handlePlatformChange}
        />
        Linux
      </label>
      <label key={3}>
        <input
          type="checkbox"
          value={"macos"}
          checked={selectedPlatforms.includes("macos")}
          onChange={handlePlatformChange}
        />
        macOS
      </label>
      <label key={4}>
        <input
          type="checkbox"
          value={"ios"}
          checked={selectedPlatforms.includes("ios")}
          onChange={handlePlatformChange}
        />
        iOS
      </label>
      <label key={5}>
        <input
          type="checkbox"
          value={"web"}
          checked={selectedPlatforms.includes("web")}
          onChange={handlePlatformChange}
        />
        Web
      </label>
      <h2>Licencias</h2>
      <label key={6}>
        <input
          type="checkbox"
          value={"licencia de por vida"}
          checked={selectedLicenses.includes("licencia de por vida")}
          onChange={handleLicenseChange}
        />
        Licencia de por vida
      </label>
      <label key={7}>
        <input
          type="checkbox"
          value={"suscripción anual"}
          checked={selectedLicenses.includes("suscripción anual")}
          onChange={handleLicenseChange}
        />
        Suscripción anual
      </label>
      <label key={8}>
        <input
          type="checkbox"
          value={"suscripción mensual"}
          checked={selectedLicenses.includes("suscripción mensual")}
          onChange={handleLicenseChange}
        />
        Suscripción mensual
      </label>
      <label key={9}>
        <input
          type="checkbox"
          value={"prueba gratuita"}
          checked={selectedLicenses.includes("prueba gratuita")}
          onChange={handleLicenseChange}
        />
        Prueba gratuita
      </label>
      <label key={10}>
        <input
          type="checkbox"
          value={"código abierto"}
          checked={selectedLicenses.includes("código abierto")}
          onChange={handleLicenseChange}
        />
        Código abierto
      </label>
      <h2>Ordenar</h2>
      <select value={filters.order} className={""} onChange={handleOrderChange}>
        <option selected disabled value="">
          Ordenar
        </option>
        <option value="alphabetical">Alphabetically</option>
        <option value="price">Pricing</option>
      </select>
      <h3>Dirección</h3>
      <select
        value={filters.direction}
        className={""}
        onChange={handleDirectionChange}
      >
        <option value="" selected disabled>
          Dirección
        </option>
        <option value="DESC">Descending</option>
        <option value="ASC">Ascending</option>
      </select>
      <SearchBar />
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
}

export default Filters;
