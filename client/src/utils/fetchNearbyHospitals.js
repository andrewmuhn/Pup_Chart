const fetchNearbyHospitals = async () => {
  const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[%22amenity%22=%22veterinary%22](around:8000,38.9219893,-77.2368027);out;`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const vetFacilities = data.elements.map(
      (element) => element.tags,
    );
    return vetFacilities;
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    return [];
  }
};

export default fetchNearbyHospitals;
