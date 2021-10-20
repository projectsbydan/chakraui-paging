import React, { useState } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { PagingControls } from "./components/pagingControls"

const generateRandomItems = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      id: i,
      text: (Math.random() + 1).toString(36).substring(7)
    });
  }
  return data;
}

export const App = () => {
  const [items, setItems] = useState<{ id: number, text: string }[]>(generateRandomItems());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);


  return <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>

          <Text fontSize="3xl" >
            Chakra UI Paging Demo
          </Text>
          {items.slice((currentPage-1) * pageSize, (currentPage)*pageSize).map(x => <Box key={x.id}>{x.text}</Box>)}
          <PagingControls currentPage={currentPage} onGoToPage={(newPageNumber) => setCurrentPage(newPageNumber)} pageSize={pageSize} totalCount={items.length} totalCountDescription={"items avaialable"} />
          <Box mt="2em" textAlign="center">
          <Text fontSize="2xl" fontWeight="semibold">Debugging</Text>
          <Text>currentPage: {currentPage}</Text>
          <Text>pageSize: {pageSize}</Text>
        </Box>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
}