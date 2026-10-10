// TripCraft Real-World Price Realism & Dynamic Yield Engine

export const PEAK_MONTHS = [0, 4, 5, 9, 10, 11]; // Jan, May, Jun, Oct, Nov, Dec (0-indexed)

/**
 * Calculates dynamic seasonal and weekend multiplier for a given date
 * @param {string|Date} dateStr 
 * @returns {number} Multiplier (e.g. 1.0, 1.25, 1.35, 1.55)
 */
export function getSeasonalMultiplier(dateStr) {
  if (!dateStr) return 1.0;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 1.0;

  let multiplier = 1.0;
  const month = d.getMonth();
  const dayOfWeek = d.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday

  // Peak season boost
  if (PEAK_MONTHS.includes(month)) {
    multiplier += 0.25; // 25% peak season surge
  }

  // Weekend surge (Fri, Sat, Sun)
  if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
    multiplier += 0.15; // 15% weekend premium
  }

  return Math.round(multiplier * 100) / 100;
}

/**
 * Comprehensive TripCraft Fare Calculator
 */
export function calculateFare({
  baseAdultPrice = 0,
  travelDate = new Date().toISOString().split("T")[0],
  adults = 1,
  children = 0,
  infants = 0,
  rooms = 1,
  type = "package", // "package" | "hotel" | "flight" | "train" | "bus" | "cab"
  vehicleCapacity = 6,
  availableSeats = 99,
  nights = 1,
}) {
  const multiplier = getSeasonalMultiplier(travelDate);
  const effectiveAdultRate = Math.round(baseAdultPrice * multiplier);
  // Child fare is 60% of adult fare (40% discount)
  const effectiveChildRate = Math.round(effectiveAdultRate * 0.60);
  const effectiveInfantRate = 0; // Infants (< 2 years) travel free

  let adultSubtotal = 0;
  let childSubtotal = 0;
  let roomMultiplier = 1;

  if (type === "hotel") {
    // Hotel base is per room per night
    adultSubtotal = effectiveAdultRate * rooms * Math.max(1, nights);
    // Extra child bed fee if children > 0
    childSubtotal = Math.round(effectiveChildRate * 0.35) * children * Math.max(1, nights);
  } else if (type === "cab") {
    // Cab is per vehicle flat + driver allowance
    adultSubtotal = effectiveAdultRate;
    childSubtotal = 0;
  } else {
    // Packages, Flights, Trains, Buses (per person)
    adultSubtotal = effectiveAdultRate * adults;
    childSubtotal = effectiveChildRate * children;
  }

  const subtotalBeforeDiscounts = adultSubtotal + childSubtotal;

  // Group discount for 4+ travelers on packages
  let groupDiscount = 0;
  const totalTravelers = adults + children;
  if (type === "package" && totalTravelers >= 4) {
    groupDiscount = Math.round(subtotalBeforeDiscounts * 0.10); // 10% off
  }

  const netSubtotal = subtotalBeforeDiscounts - groupDiscount;
  const gst = Math.round(netSubtotal * 0.12); // 12% standard GST
  const grandTotal = netSubtotal + gst;

  // Capacity Validations
  let validation = { valid: true, error: null };

  if (type === "hotel") {
    const maxAllowedGuests = rooms * 3;
    if (totalTravelers > maxAllowedGuests) {
      const requiredRooms = Math.ceil(totalTravelers / 3);
      validation = {
        valid: false,
        error: `Please select at least ${requiredRooms} rooms for ${totalTravelers} guests (max 3 guests per standard room).`
      };
    }
  }

  if (type === "cab") {
    if (totalTravelers > vehicleCapacity) {
      validation = {
        valid: false,
        error: `This vehicle seats a maximum of ${vehicleCapacity} passengers. Please select a larger vehicle.`
      };
    }
  }

  if (type === "flight" || type === "train" || type === "bus") {
    const requiredSeats = adults + children;
    if (requiredSeats > availableSeats) {
      validation = {
        valid: false,
        error: `Only ${availableSeats} seats remaining for this departure. Please reduce passenger count.`
      };
    }
  }

  return {
    multiplier,
    isPeak: multiplier > 1.1,
    effectiveAdultRate,
    effectiveChildRate,
    effectiveInfantRate,
    adultSubtotal,
    childSubtotal,
    groupDiscount,
    netSubtotal,
    gst,
    grandTotal,
    validation
  };
}

/**
 * Currency conversion formatter
 */
export function formatCurrency(amountINR, currency = "INR") {
  if (isNaN(amountINR)) return "₹0";
  const num = Math.round(amountINR);

  switch (currency) {
    case "USD":
      return `$${(num / 84).toFixed(1)}`;
    case "EUR":
      return `€${(num / 91).toFixed(1)}`;
    case "INR":
    default:
      return `₹${num.toLocaleString("en-IN")}`;
  }
}
