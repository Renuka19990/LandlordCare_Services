import React, { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import axios from 'axios';

const Tenants = ({ props }) => {
    const [tenants, setTenants] = useState(props);
    const [isOpen, setIsOpen] = useState(false);
    const [deletedTenant, setDeletedTenant] = useState(null);

    useEffect(() => {
        setTenants(props);
    }, [props]);

    async function deleteUser(id) {
      try {
          await axios.delete(`https://landloards-json-server.onrender.com/tenants/${id}`);
          // Filter out the deleted user from the tenants array
          const updatedTenants = tenants.filter(tenant => tenant.id !== id);
          setTenants(updatedTenants); // Update state with the updated tenants array
          setDeletedTenant(id);
          setIsOpen(true); // Open the AlertDialog immediately
      } catch (error) {
          console.log(error);
      }
  }
  
    const onClose = () => setIsOpen(false);

    return (
        <>
            <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>ID</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Rent Amount</Th>
                        <Th>Lease Start Date</Th>
                        <Th>Lease End Date</Th>
                        <Th>Status</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tenants.map(tenant => (
                        <Tr key={tenant.id}>
                            <Td>{tenant.name}</Td>
                            <Td>{tenant.property_id}</Td>
                            <Td>{tenant.email}</Td>
                            <Td>{tenant.phone}</Td>
                            <Td>{tenant.rent_amount}</Td>
                            <Td>{tenant.lease_start_date}</Td>
                            <Td>{tenant.lease_end_date}</Td>
                            <Td>{tenant.status}</Td>
                            <Td>
                                <Button colorScheme='red' onClick={() => deleteUser(tenant.id)}>Delete</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* AlertDialog for delete confirmation */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={null}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            User Deleted
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            User with ID {deletedTenant} has been successfully deleted.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose} bg={"darkgray"} ml={3}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default Tenants;
