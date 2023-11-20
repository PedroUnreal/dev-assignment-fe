import { useCallback, useEffect, useState } from "react";
import { GET_JOURNEYS_COLLECTION } from "../../api/getJourneyCollection";
import InputFilter from "../../components/InputFilter";
import "./Journeys.scss";
import SelectFilter from "../../components/SelectFilter";
import CreateNewJourneyComponent from "../../components/CreateNewJourneyComponent";
import ButtonCancellJourney from "../../components/ButtonCancellJourney";
import { useLazyQuery } from "@apollo/client";
import { addVariablesWrapper } from "../../api/utils/variablesAdapter";

export default function Journeys() {
  const [inputAddress, setAddress] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("");
  const [journeys, setJourneys] = useState<JourneyDTO[]>([]);

  const [getJourneys] = useLazyQuery(GET_JOURNEYS_COLLECTION);

  const getJourneysHandler = useCallback(() => {
    getJourneys(addVariablesWrapper({ address: inputAddress, status: orderStatus })).then(({ data }) => {
      if (data?.journeyCollection) {
        setJourneys(data.journeyCollection.edges.map((edge: any) => {
          return edge.node;
        }));
      }
    })
  }, [inputAddress, orderStatus, getJourneys])

  useEffect(() => {
    getJourneysHandler();
  }, [getJourneysHandler]);
  // const { data: journeys } = useGetJourneyCollection(inputAddress, orderStatus);

  return (
    <div className="content">
      <p className="greeting">Orders table</p>
      <CreateNewJourneyComponent onAdd={getJourneysHandler} />
      <div className="input-box">
        <InputFilter setAddress={setAddress} />
        <SelectFilter
          orderStatus={orderStatus}
          setOrderStatus={setOrderStatus}
        />
      </div>
      {journeys && journeys.length > 0 && (
        <div className="table-container">
          <table data-testid="journeys_table">
            <thead>
              <tr>
                <th></th>
                <th>First name</th>
                <th>Last name</th>
                <th>From</th>
                <th>To </th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {journeys.map((journey) => (
                <tr className="journey" key={journey.id}>
                  {journey.inbound ? (
                    <td className="icon">&#128747;</td>
                  ) : (
                    <td className="icon">&#128748;</td>
                  )}
                  <td>{journey.traveller_info.first_name}</td>
                  <td>{journey.traveller_info.last_name}</td>
                  <td>{journey.from_address}</td>
                  <td>{journey.to_address}</td>
                  <td>{journey.status}</td>
                  <td>{journey.status === "IN PROGRESS" && (<ButtonCancellJourney id={journey.id} />)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {journeys && journeys.length === 0 && <div>No journeys were found</div>}
    </div>
  );
}
