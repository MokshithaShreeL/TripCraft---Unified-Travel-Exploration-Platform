// Bus Provider Abstraction Layer
// Supports RedBus / AbhiBus / State Transport (KSRTC, MSRTC, RSRTC) integration

const mockBuses = [
  { id: 'BS-SWIFT-01', operator: 'KSRTC Swift Scania AC Multi-Axle', busType: 'Semi-Sleeper (2+2)', from: 'Bengaluru', to: 'Munnar', depTime: '21:30', arrTime: '07:30', duration: '10h 00m', fare: 1450, seatsAvailable: 28, rating: 4.8 },
  { id: 'BS-INTR-02', operator: 'IntrCity SmartBus Volvo Club Class', busType: 'AC Sleeper (2+1)', from: 'Mumbai', to: 'Goa', depTime: '19:45', arrTime: '07:45', duration: '12h 00m', fare: 1850, seatsAvailable: 19, rating: 4.9 },
  { id: 'BS-ZING-03', operator: 'Zingbus Premium Volvo', busType: 'Electric AC Sleeper', from: 'New Delhi', to: 'Jaipur', depTime: '06:00', arrTime: '11:15', duration: '5h 15m', fare: 750, seatsAvailable: 34, rating: 4.75 }
];

class BusProvider {
  async searchBuses({ from, to, date }) {
    return {
      success: true,
      provider: 'Intercity Bus Network Engine',
      isLive: false,
      count: mockBuses.length,
      data: mockBuses
    };
  }

  getSeatLayout(busId) {
    // Generate realistic 2x1 or 2x2 seat matrix with upper/lower berths
    const seats = [];
    for (let i = 1; i <= 30; i++) {
      seats.push({
        seatNumber: `${i}`,
        type: i % 3 === 0 ? 'Upper Berth' : 'Lower Berth',
        isAvailable: i !== 4 && i !== 12 && i !== 17,
        fare: 1450
      });
    }
    return seats;
  }
}

module.exports = new BusProvider();
