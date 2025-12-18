export enum CarCategory {
  ALL = 'Todos',
  SUV = 'SUV',
  SPORT = 'Deportivo',
  SEDAN = 'Sedán',
  ECONOMY = 'Económico'
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  deposit: number;
  category: CarCategory;
  imageUrl: string;
  description: string;
  specs: {
    speed: string;
    seats: number;
    fuel: 'Gasolina' | 'Eléctrico' | 'Híbrido';
    acceleration: string;
    transmission: 'Automático' | 'Manual';
  };
  features: string[];
  gallery: { url: string; label: string }[];
  rating: number;
}

export type ViewState = 'WELCOME' | 'CATALOG' | 'DETAILS' | 'BOOKING';

export interface BookingData {
  carId: string;
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  message: string;
}