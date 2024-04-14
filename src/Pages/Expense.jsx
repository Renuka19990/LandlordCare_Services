import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Heading, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import { fetchExpenses } from '../Redux/actions';

export default function Expense() {
  const dispatch = useDispatch();
  const { expenses } = useSelector(state => state.auth);
  console.log(expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Expenses
      </Heading>
      {expenses.length > 0 ? (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense.id}>
                <Td>{expense.title}</Td>
                <Td>{expense.description}</Td>
                <Td>${expense.amount}</Td>
                <Td>{expense.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No expenses found.</Text>
      )}
    </Box>
  );
}
