type JourneyDTO = {
  id: string;
  fare: number;
  status: string;
  to_address: string;
  from_address: string;
  inbound: boolean;
  traveller_info: TravellerDTO;
};

type TravellerDTO = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  passenger_count: number;
  flight_number: string;
};

type OrderStatus = "PENDING" | "COMPLETED" | "" | "IN PROGRESS" | "CANCELLED";
