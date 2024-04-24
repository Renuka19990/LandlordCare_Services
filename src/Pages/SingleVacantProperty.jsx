import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVacantProperty } from '../Redux/actions'; // Import the action to fetch property details
import { useSelector, useDispatch } from 'react-redux';

const VacantPropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const dispatch = useDispatch();
  const vacantProperties = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchVacantProperty());
  }, [dispatch]);

  useEffect(() => {
    const property = vacantProperties.find(p => p.id === parseInt(id));
    setProperty(property);
  }, [vacantProperties, id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Vacant Property Details</h2>
      <p>Address: {property.address}</p>
      <p>City: {property.city}</p>
      <p>State: {property.state}</p>
      <p>Zipcode: {property.zipcode}</p>
      <p>Description: {property.description}</p>
      <p>Rent Amount: ${property.rent_amount}</p>
      <p>Available From: {property.available_from}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default VacantPropertyDetail;
