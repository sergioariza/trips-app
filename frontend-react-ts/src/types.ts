export interface Trip {
  id: number;
  origin: string;
  destination: string;
  departure: string | Date | null;
  returnDate: string | Date | null;
  price: number;
  isWorkTrip: boolean;
}

export interface TripPayload {
  id?: number;
  origin: string;
  destination: string;
  departure: string | Date | null;
  returnDate: string | Date | null;
  price: number;
  isWorkTrip: boolean;
}

export interface SnackbarMessage {
  severity: 'success' | 'error';
  text: string;
}
