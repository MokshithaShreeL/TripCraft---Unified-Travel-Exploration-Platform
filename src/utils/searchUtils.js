import { DESTINATIONS, HOTELS, PACKAGES, LOCAL_GUIDES, SOLO_TRIPS } from "../data/mockData.js";

/**
 * Universal Search across all TripCraft datasets
 * Used by GlobalSearchModal and quick search bars
 */
export function searchAll(query = "") {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) {
    return {
      destinations: DESTINATIONS.slice(0, 4),
      hotels: HOTELS.slice(0, 4),
      packages: PACKAGES.slice(0, 4),
      guides: LOCAL_GUIDES.slice(0, 4),
      soloTrips: SOLO_TRIPS.slice(0, 4),
      totalMatches: 0
    };
  }

  const destinations = DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(cleanQ) ||
    d.state.toLowerCase().includes(cleanQ) ||
    d.tagline.toLowerCase().includes(cleanQ) ||
    d.category.toLowerCase().includes(cleanQ) ||
    d.description.toLowerCase().includes(cleanQ)
  );

  const hotels = HOTELS.filter((h) =>
    h.name.toLowerCase().includes(cleanQ) ||
    h.location.toLowerCase().includes(cleanQ) ||
    h.type.toLowerCase().includes(cleanQ) ||
    h.amenities.some((a) => a.toLowerCase().includes(cleanQ))
  );

  const packages = PACKAGES.filter((p) =>
    p.title.toLowerCase().includes(cleanQ) ||
    p.theme.toLowerCase().includes(cleanQ) ||
    p.inclusions.some((inc) => inc.toLowerCase().includes(cleanQ))
  );

  const guides = LOCAL_GUIDES.filter((g) =>
    g.name.toLowerCase().includes(cleanQ) ||
    g.city.toLowerCase().includes(cleanQ) ||
    g.state.toLowerCase().includes(cleanQ) ||
    g.specialization.toLowerCase().includes(cleanQ) ||
    g.languages.some((l) => l.toLowerCase().includes(cleanQ))
  );

  const soloTrips = SOLO_TRIPS.filter((s) =>
    s.title.toLowerCase().includes(cleanQ) ||
    s.stayType.toLowerCase().includes(cleanQ) ||
    s.socialActivities.some((act) => act.toLowerCase().includes(cleanQ))
  );

  const totalMatches =
    destinations.length +
    hotels.length +
    packages.length +
    guides.length +
    soloTrips.length;

  return {
    destinations,
    hotels,
    packages,
    guides,
    soloTrips,
    totalMatches
  };
}

/**
 * Filtered Hotel Search
 * Guarantees that searching a destination like "Munnar" returns ALL matching hotels
 */
export function searchHotels({
  query = "",
  destination = "All",
  minPrice = 0,
  maxPrice = Infinity,
  minRating = 0,
  childFriendlyOnly = false,
  selectedAmenity = "All",
  sortBy = "popular"
} = {}) {
  const cleanQ = query.trim().toLowerCase();

  let results = HOTELS.filter((h) => {
    // Text search matching name, location, or type
    const matchesQuery =
      !cleanQ ||
      h.name.toLowerCase().includes(cleanQ) ||
      h.location.toLowerCase().includes(cleanQ) ||
      h.type.toLowerCase().includes(cleanQ) ||
      h.amenities.some((a) => a.toLowerCase().includes(cleanQ));

    // Destination filter
    const matchesDest =
      destination === "All" ||
      h.location.toLowerCase().includes(destination.toLowerCase()) ||
      (h.destinationId && h.destinationId.toLowerCase().includes(destination.toLowerCase()));

    // Price bounds
    const matchesPrice =
      h.basePricePerNight >= minPrice &&
      (maxPrice === Infinity || h.basePricePerNight <= maxPrice);

    // Rating minimum
    const matchesRating = h.rating >= minRating;

    // Child friendly requirement
    const matchesChild = !childFriendlyOnly || h.childFriendly;

    // Amenity filter
    const matchesAmenity =
      selectedAmenity === "All" ||
      h.amenities.some((a) =>
        a.toLowerCase().includes(selectedAmenity.toLowerCase())
      );

    return (
      matchesQuery &&
      matchesDest &&
      matchesPrice &&
      matchesRating &&
      matchesChild &&
      matchesAmenity
    );
  });

  // Sorting
  if (sortBy === "price_asc") {
    results.sort((a, b) => a.basePricePerNight - b.basePricePerNight);
  } else if (sortBy === "price_desc") {
    results.sort((a, b) => b.basePricePerNight - a.basePricePerNight);
  } else if (sortBy === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else {
    // Default: Popularity (reviewsCount * rating)
    results.sort((a, b) => b.reviewsCount * b.rating - a.reviewsCount * a.rating);
  }

  return results;
}

/**
 * Filtered Local Guides Search
 */
export function searchGuides({
  query = "",
  city = "All",
  language = "All",
  specialization = "All",
  minRating = 0,
  sortBy = "rating"
} = {}) {
  const cleanQ = query.trim().toLowerCase();

  let results = LOCAL_GUIDES.filter((g) => {
    const matchesQuery =
      !cleanQ ||
      g.name.toLowerCase().includes(cleanQ) ||
      g.city.toLowerCase().includes(cleanQ) ||
      g.specialization.toLowerCase().includes(cleanQ) ||
      g.bio.toLowerCase().includes(cleanQ);

    const matchesCity =
      city === "All" ||
      g.city.toLowerCase().includes(city.toLowerCase()) ||
      g.state.toLowerCase().includes(city.toLowerCase());

    const matchesLanguage =
      language === "All" ||
      g.languages.some((l) => l.toLowerCase() === language.toLowerCase());

    const matchesSpecialization =
      specialization === "All" ||
      g.specialization.toLowerCase().includes(specialization.toLowerCase());

    const matchesRating = g.rating >= minRating;

    return (
      matchesQuery &&
      matchesCity &&
      matchesLanguage &&
      matchesSpecialization &&
      matchesRating
    );
  });

  if (sortBy === "rate_asc") {
    results.sort((a, b) => a.perDayRate - b.perDayRate);
  } else if (sortBy === "rate_desc") {
    results.sort((a, b) => b.perDayRate - a.perDayRate);
  } else if (sortBy === "experience") {
    results.sort((a, b) => b.experienceYears - a.experienceYears);
  } else {
    results.sort((a, b) => b.rating - a.rating);
  }

  return results;
}

/**
 * Filtered Solo Trips Search
 */
export function searchSoloTrips({
  destination = "All",
  duration = "All",
  budgetMax = Infinity,
  travelStyle = "All"
} = {}) {
  return SOLO_TRIPS.filter((trip) => {
    const matchesDest =
      destination === "All" ||
      trip.title.toLowerCase().includes(destination.toLowerCase()) ||
      (trip.destinationId && trip.destinationId.toLowerCase().includes(destination.toLowerCase()));

    const matchesDuration =
      duration === "All" ||
      trip.duration.toLowerCase().includes(duration.toLowerCase());

    const matchesBudget =
      budgetMax === Infinity || trip.price <= budgetMax;

    const matchesStyle =
      travelStyle === "All" ||
      trip.title.toLowerCase().includes(travelStyle.toLowerCase()) ||
      trip.socialActivities.some((act) => act.toLowerCase().includes(travelStyle.toLowerCase()));

    return matchesDest && matchesDuration && matchesBudget && matchesStyle;
  });
}
