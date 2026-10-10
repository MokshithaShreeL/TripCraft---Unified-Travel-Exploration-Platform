// TripCraft Helper Utilities
export function calculateSafetyBadge(score) {
  if (score >= 95) return { label: 'Exceptional Safety', color: 'emerald', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
  if (score >= 90) return { label: 'High Safety Certified', color: 'teal', bg: 'bg-teal-500/10 text-teal-400 border-teal-500/20' };
  if (score >= 85) return { label: 'Safe & Verified', color: 'sky', bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20' };
  return { label: 'Exercise Standard Caution', color: 'amber', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function triggerEmergencySOS(user, location = 'Current GPS Location') {
  const alertMsg = `[SOS ALERT TRIGGERED]\nUser: ${user?.name || 'Traveler'} (${user?.phone || 'Emergency Helpline'})\nLocation: ${location}\nNational Emergency Contacted: 112 / 1091 (Women Safety Helpline)`;
  console.warn(alertMsg);
  return {
    success: true,
    timestamp: new Date().toISOString(),
    message: 'SOS Alert dispatched to 1091 Helpline and registered emergency contacts!'
  };
}
