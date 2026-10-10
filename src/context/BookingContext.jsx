import React, { createContext, useContext, useState, useMemo } from "react";
import { calculateFare } from "../utils/pricing";
import { apiService } from "../services/api";
import { useApp } from "./AppContext";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const { addToast, addNotification } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1); // 1: Overview, 2: Travellers, 3: Services, 4: Payment
  const [bookingItem, setBookingItem] = useState(null); // The entity being booked (package, hotel, transport, etc.)
  const [bookingType, setBookingType] = useState("package"); // "package" | "hotel" | "transport" | "solo" | "cab"

  // Dates
  const [travelDate, setTravelDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split("T")[0];
  });
  const [returnDate, setReturnDate] = useState("");
  const [nights, setNights] = useState(2);

  // Party size & rooms
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]); // array of integers e.g. [5, 8]
  const [rooms, setRooms] = useState(1);

  // Lead Traveller Contact
  const [contactInfo, setContactInfo] = useState({
    fullName: "Priya Sharma",
    email: "priya.backpacker@gmail.com",
    phone: "+91 94455 12345",
    specialRequests: ""
  });

  // Individual Guest Details
  const [guests, setGuests] = useState([
    { name: "Priya Sharma", age: "27", gender: "Female", isLead: true }
  ]);

  // Optional Add-on Services
  const [addons, setAddons] = useState({
    travelInsurance: true,
    airportTransfer: false,
    carbonOffset: true
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("upi"); // "upi" | "card" | "netbanking"
  const [upiId, setUpiId] = useState("priya@oksbi");
  const [cardDetails, setCardDetails] = useState({
    number: "4532 •••• •••• 8892",
    nameOnCard: "PRIYA SHARMA",
    expiry: "09/28",
    cvv: "824"
  });
  const [selectedBank, setSelectedBank] = useState("sbi");

  // Processing & Confirmation State
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // When childrenCount changes, synchronize childAges array
  const handleSetChildrenCount = (newCount) => {
    const count = Math.max(0, newCount);
    setChildrenCount(count);
    setChildAges((prev) => {
      if (count > prev.length) {
        const added = Array(count - prev.length).fill(7); // default age 7
        return [...prev, ...added];
      } else {
        return prev.slice(0, count);
      }
    });
  };

  const handleUpdateChildAge = (index, age) => {
    setChildAges((prev) => {
      const copy = [...prev];
      copy[index] = Number(age);
      return copy;
    });
  };

  // Base price extraction
  const baseAdultPrice = useMemo(() => {
    if (!bookingItem) return 0;
    if (bookingType === "package") return bookingItem.baseAdultPrice || 9999;
    if (bookingType === "hotel") return bookingItem.basePricePerNight || 4500;
    if (bookingType === "transport") return bookingItem.adultPrice || bookingItem.baseFare || 2500;
    if (bookingType === "solo") return bookingItem.price || 4900;
    if (bookingType === "cab") return bookingItem.baseFare || 3500;
    return bookingItem.price || bookingItem.basePrice || 3000;
  }, [bookingItem, bookingType]);

  // Real-time dynamic calculation
  const fare = useMemo(() => {
    const rawFare = calculateFare({
      baseAdultPrice,
      travelDate,
      adults,
      children: childrenCount,
      infants,
      rooms,
      type: bookingType,
      vehicleCapacity: bookingItem?.capacity || 6,
      availableSeats: bookingItem?.availableSeats || 50,
      nights
    });

    // Add optional services price
    let addonCost = 0;
    const totalPersons = adults + childrenCount;
    if (addons.travelInsurance) addonCost += 399 * totalPersons;
    if (addons.airportTransfer) addonCost += 1200;
    if (addons.carbonOffset) addonCost += 99 * totalPersons;

    const grandTotalWithAddons = rawFare.grandTotal + addonCost;

    return {
      ...rawFare,
      addonCost,
      grandTotal: grandTotalWithAddons
    };
  }, [baseAdultPrice, travelDate, adults, childrenCount, infants, rooms, bookingType, bookingItem, nights, addons]);

  // Open modal helper
  const openBooking = (item, type = "package") => {
    setBookingItem(item);
    setBookingType(type);
    setActiveTab(1);
    setConfirmedBooking(null);
    setIsProcessing(false);
    setIsOpen(true);
  };

  const closeBooking = () => {
    if (isProcessing) return; // prevent closing while payment gateway is processing
    setIsOpen(false);
  };

  // Submit payment & finalize booking
  const processPayment = async () => {
    if (!fare.validation.valid) {
      addToast(fare.validation.error, "error");
      return;
    }

    setIsProcessing(true);
    try {
      const payload = {
        itemTitle: bookingItem?.title || bookingItem?.name || bookingItem?.carrier || "TripCraft Experience",
        itemType: bookingType,
        destination: bookingItem?.destinationId || bookingItem?.toCity || bookingItem?.location || "India",
        travelDate,
        returnDate,
        adults,
        children: childrenCount,
        childAges,
        infants,
        rooms: bookingType === "hotel" ? rooms : 1,
        nights: bookingType === "hotel" ? nights : undefined,
        contactInfo,
        guests,
        addons,
        fareSummary: {
          effectiveAdultRate: fare.effectiveAdultRate,
          effectiveChildRate: fare.effectiveChildRate,
          adultSubtotal: fare.adultSubtotal,
          childSubtotal: fare.childSubtotal,
          groupDiscount: fare.groupDiscount,
          addonCost: fare.addonCost,
          gst: fare.gst,
          grandTotal: fare.grandTotal
        },
        paymentDetails: {
          method: paymentMethod,
          accountRef: paymentMethod === "upi" ? upiId : paymentMethod === "card" ? cardDetails.number : selectedBank.toUpperCase()
        }
      };

      const result = await apiService.createBooking(payload);
      setConfirmedBooking(result);
      setActiveTab(4); // navigate to confirmation tab
      addToast(`Booking confirmed! Reference #${result.id}`, "success");
      addNotification("Booking Confirmed", `Your booking for ${payload.itemTitle} has been confirmed (Ref: ${result.id}).`, "success");
    } catch (err) {
      addToast("Payment authorization failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        activeTab,
        setActiveTab,
        bookingItem,
        bookingType,
        travelDate,
        setTravelDate,
        returnDate,
        setReturnDate,
        nights,
        setNights,
        adults,
        setAdults,
        childrenCount,
        setChildrenCount: handleSetChildrenCount,
        infants,
        setInfants,
        childAges,
        setChildAge: handleUpdateChildAge,
        rooms,
        setRooms,
        contactInfo,
        setContactInfo,
        guests,
        setGuests,
        addons,
        setAddons,
        paymentMethod,
        setPaymentMethod,
        upiId,
        setUpiId,
        cardDetails,
        setCardDetails,
        selectedBank,
        setSelectedBank,
        isProcessing,
        confirmedBooking,
        fare,
        openBooking,
        closeBooking,
        processPayment
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
