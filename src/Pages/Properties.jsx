// import React, { useState } from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
//   Image,
//   Button,
// } from "@chakra-ui/react";
// import axios from "axios";

// //    export async function DeleteUser(id){
// //     try {
// //         let res= await axios.delete(`https://moke-api-server.onrender.com/Mens/${id}`);
// //         console.log(res.data)
// //         console.log(id)
// //     } catch (error) {
// //         console.log(error)
// //     }
// // }

// const Properties = ({ props, setState, state }) => {
//   // const [state,setState]=useState(true);
//   async function DeleteUser(id) {
//     try {
//       let res = await axios.delete(
//         `https://landloards-json-server.onrender.com/properties/${id}`
//       );
//       console.log(res.data);
//       setState(!state);
//       console.log(id);
//     } catch (error) {
//       // setState(!state)
//       console.log(error);
//     }
//   }
//   return (
//     <TableContainer p={"10"}>
//       <Table variant="striped">
//         {/* <Th>Mens Available</Th> */}
//         <Thead>
//           <Tr>
//             <Th>Image</Th>
//             <Th>Title</Th>
//             <Th>Location</Th>
//             <Th>Rent</Th>
//             <Th>Description</Th>
//              <Th>nearBy</Th> 
//             <Th>delete</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {/* {
//     "image": "https://rukminim2.flixcart.com/image/850/1000/jmccb680/sweater/g/q/m/10-11-years-ujsw5232-us-polo-kids-original-imaf995dw8sczyfr.jpeg?q=90&crop=false",
//     "title": "V-Neck Sweater",
//     "price": "$59.99"
//   }, */}
//           {props.map((item) => {
//             return (
//               <Tr key={item.id}>
//                 <Td>
//                   <Image src={item.images[0]} style={{ width: "50px" }} />
//                 </Td>
//                 <Td>{item.title}</Td>
//                 <Td>{item.location}</Td>
//                 <Td>{item.category}</Td>
//                 <Td>{item.Rent}</Td>
//                 <Td>
//                   <details>
//                     <summary>Details</summary>
//                     {item.description}
//                   </details>
//                 </Td>

//                 <Td>{item.nearBy}</Td>

//                 <Td>
//                   <Button
//                     colorScheme="red"
//                     onClick={() => {
//                       DeleteUser(item.id);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </Td>
//               </Tr>
//             );
//           })}
//         </Tbody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default Properties;
import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";

const Properties = ({ props, setState, state }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletedProperty, setDeletedProperty] = useState(null);

  async function deleteProperty(id) {
    try {
      let res = await axios.delete(
        `https://landloards-json-server.onrender.com/properties/${id}`
      );
      setState(!state);
      setDeletedProperty(id);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const onClose = () => setIsOpen(false);

  return (
    <>
      <TableContainer p={"10"}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Title</Th>
              <Th>Location</Th>
              <Th>Rent</Th>
              <Th>Description</Th>
              <Th>nearBy</Th>
              <Th>delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.map((item) => {
              return (
                <Tr key={item.id}>
                  <Td>
                    <Image src={item.images[0]} style={{ width: "50px" }} />
                  </Td>
                  <Td>{item.title}</Td>
                  <Td>{item.location}</Td>
                  <Td>{item.Rent}</Td>
                  <Td>
                    <details>
                      <summary>Details</summary> {item.description}
                    </details>
                  </Td>
                  <Td>{item.nearBy}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        deleteProperty(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {/* AlertDialog for delete confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={null}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Property Deleted
            </AlertDialogHeader>

            <AlertDialogBody>
              Property with ID {deletedProperty} has been successfully deleted.
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
};

export default Properties;
