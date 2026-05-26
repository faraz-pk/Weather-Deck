const STORAGE_KEY = "cities";
const UPDATE_EVENT = "saved-cities-updated";

export const getSavedCities = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveCityWeather = (cityWeather) => {
  const previousCities = getSavedCities();
  const normalizedName = cityWeather.name.toLowerCase();

  const nextCities = previousCities.some(
    (city) => city.name?.toLowerCase() === normalizedName,
  )
    ? previousCities.map((city) =>
        city.name?.toLowerCase() === normalizedName ? cityWeather : city,
      )
    : [...previousCities, cityWeather];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCities));
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

export const subscribeToSavedCities = (callback) => {
  const syncSavedCities = () => callback(getSavedCities());

  window.addEventListener("storage", syncSavedCities);
  window.addEventListener(UPDATE_EVENT, syncSavedCities);

  return () => {
    window.removeEventListener("storage", syncSavedCities);
    window.removeEventListener(UPDATE_EVENT, syncSavedCities);
  };
};
