type ResponseDTO<DTO> = {
  edges: Array<{
    node: DTO;
  }>;
  pageInfo: PagitationData | undefined;
  totalCount: number | undefined;
};

type JourneyDTO<TravellerDTO> = {
  id
  fare: number;
  status: string;
  to_address: string;
  from_address: string;
  inbound: boolean;
  traveller_info: TravellerDTO;
}

type TravellerDTO = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

type OrderStatus = "PENDING" | "COMPLETED" | ""
