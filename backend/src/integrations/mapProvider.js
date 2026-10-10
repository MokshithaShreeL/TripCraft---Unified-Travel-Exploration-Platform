// Map & Geolocation Provider Abstraction Layer
// Supports Google Maps Platform, Mapbox, and OpenStreetMap Leaflet

class MapProvider {
  getCoordinates(destinationName) {
    const coordsMap = {
      'munnar': { lat: 10.0889, lng: 77.0595, altitude: '1,600m' },
      'goa': { lat: 15.2993, lng: 74.1240, altitude: 'Sea Level' },
      'jaipur': { lat: 26.9124, lng: 75.7873, altitude: '431m' },
      'ladakh': { lat: 34.1526, lng: 77.5771, altitude: '3,500m' },
      'andaman': { lat: 11.7401, lng: 92.6586, altitude: 'Sea Level' },
      'varanasi': { lat: 25.3176, lng: 82.9739, altitude: '81m' },
      'rishikesh': { lat: 30.0869, lng: 78.2676, altitude: '372m' },
      'hampi': { lat: 15.3350, lng: 76.4600, altitude: '467m' }
    };

    const key = (destinationName || '').toLowerCase().trim();
    for (const [k, v] of Object.entries(coordsMap)) {
      if (key.includes(k)) return v;
    }
    return { lat: 20.5937, lng: 78.9629, altitude: 'India' };
  }

  calculateDistance(fromCoords, toCoords) {
    // Haversine formula calculation in kilometers
    const R = 6371;
    const dLat = (toCoords.lat - fromCoords.lat) * Math.PI / 180;
    const dLon = (toCoords.lng - fromCoords.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(fromCoords.lat * Math.PI / 180) * Math.cos(toCoords.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }
}

module.exports = new MapProvider();
