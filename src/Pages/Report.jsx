import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Grid, Stat, StatLabel, StatNumber, StatHelpText, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Reports = () => {
  const { properties, tenants, expenses } = useSelector(state => state.auth);

  const [occupiedProperties, setOccupiedProperties] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    generateReports();
  }, [properties, tenants, expenses]);

  const generateReports = () => {
    generateOccupiedProperties();
    calculateTotalIncome();
    calculateTotalExpenses();
  };

  const generateOccupiedProperties = () => {
    const occupiedPropertiesData = properties.filter(property => tenants.some(tenant => tenant.property_id === property.id));
    setOccupiedProperties(occupiedPropertiesData);
  };

  const calculateTotalIncome = () => {
    const totalIncomeAmount = occupiedProperties.reduce((acc, property) => {
      return acc + property.Rent; // Assuming monthly rent for each occupied property
    }, 0);
    setTotalIncome(totalIncomeAmount);
  };

  const calculateTotalExpenses = () => {
    const totalExpensesAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(totalExpensesAmount);
  };

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>Reports</Heading>

      <Box mb={10}>
        <Heading as="h2" size="lg" mb={4}>Occupied Properties</Heading>
        <Table variant="striped" colorScheme="green">
          <Thead>
            <Tr>
              <Th>Property Name</Th>
              <Th isNumeric>Rent Amount (Monthly)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {occupiedProperties.map(property => (
              <Tr key={property.id}>
                <Td>{property.title}</Td>
                <Td isNumeric>${property.Rent}</Td> {/* Monthly rent */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box mb={10}>
        <Heading as="h2" size="lg" mb={4}>Income Statement</Heading>
        <Stat>
          <StatLabel>Total Income</StatLabel>
          <StatNumber>${totalIncome+occupiedProperties.length+totalExpenses*30}</StatNumber>
          <StatHelpText>Total rent collected from occupied properties (monthly)</StatHelpText>
        </Stat>
      </Box>

      <Box mb={10}>
        <Heading as="h2" size="lg" mb={4}>Expense Statement</Heading>
        <Stat>
          <StatLabel>Total Expenses</StatLabel>
          <StatNumber>${totalExpenses}</StatNumber>
          <StatHelpText>Total expenses incurred</StatHelpText>
        </Stat>
      </Box>
    </Box>
  );
};

export default Reports;
