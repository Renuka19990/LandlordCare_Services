import React, { useEffect, useState } from 'react'
import { Box,Heading,Flex } from '@chakra-ui/react'
import  axios  from 'axios';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spacer } from '@chakra-ui/react'

import { AddMens } from '../Admin/AddMens';
import { AddWomens } from '../Admin/AddWomens';
import Tenants from './Tenants';
import Properties from './Properties';







 const Admin = () => {
  
        const [users,setUsers]=useState([]);
        const [mens,setMens]=useState([]);
        const [womens,setWomens]=useState([]);
        const [kids,setKids]=useState([]);
        const [state,setState]=useState(true);
        const [menState, setMenState]=useState(true);
        const [womenState, setWomenState]=useState(true);
        

        console.log(mens);
        console.log(womens);
        console.log(kids);
        

     
        const menUrl="https://landloards-json-server.onrender.com/properties";
        const womenUrl="https://landloards-json-server.onrender.com/tenants";
        const kidsUrl="https://landloards-json-server.onrender.com/expenses";
        const usersUrl="https://landloards-json-server.onrender.com/users";

   useEffect(()=>{
        async function fetchUsers(){
             try {
                let res= await axios.get(usersUrl);
                // console.log(res.data);
                setUsers(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers();
    },[state])
    
//    useEffect(()=>{
//     async function fetchKids(){
//          try {
//             let res= await axios.get(kidsUrl);
//             // console.log(res.data);
//             setKids(res.data);
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     fetchKids();
// },[setKidState])

useEffect(()=>{
    async function fetchWomens(){
         try {
            let res= await axios.get(womenUrl);
            // console.log(res.data);
            setWomens(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    fetchWomens();
},[setWomenState])

useEffect(()=>{
    async function fetchMens(){
         try {
            let res= await axios.get(menUrl);
            // console.log(res.data);
            setMens(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    fetchMens();
},[setMenState])

    console.log(users);
  return (
    <Box>
        <Flex bgColor={'whitesmoke'} p={'4'} justifyContent={'space-evenly'}> 
        {/* <SideDrawer/> */}

        <Heading color='teal'>Admin Dashboard</Heading>
        </Flex>
       
       <Spacer/>
       <Spacer/>
<Tabs isFitted variant='soft-rounded' colorScheme='blue' >
  <TabList>
  <Tab>Tenants</Tab>
    <Tab>Properties</Tab>
   
    
  
  </TabList>

  <TabPanels  >
    <TabPanel>
   {/* {data.length<=0?"loading......." : */}
    {/* <AdminTable props={data}/> */}
    <AddWomens />
    <Tenants props={womens} setState={setWomenState} state={womenState}/>
  
    {/* } */}
    </TabPanel>
    <TabPanel>
    <AddMens />
        <Properties props={mens} setState={setMenState} state={menState}/>
       
    </TabPanel>
    

    
  </TabPanels>
  
</Tabs>
{/* <AddWomens />
<AddMens /> */}
        

    </Box>
  )
}

export default Admin;