import {
  Box,
  BoxProps,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Select
} from '@chakra-ui/react';
import React, { useRef } from 'react';

type EventsSearchProps = BoxProps & {
  onSearch: (year: number, month: number) => void;
};

const EventsSearch = ({
  onSearch,
  ...others
}: EventsSearchProps): JSX.Element => {
  const yearInputRef = useRef<any>();
  const monthInputRef = useRef<any>();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const year = yearInputRef.current?.value;
    const month = monthInputRef.current?.value;
    if (year && month) {
      onSearch(year, month);
    }
  };
  return (
    <Box
      as="form"
      boxShadow="md"
      borderRadius="md"
      onSubmit={handleSubmit}
      {...others}
    >
      <Flex p="2">
        <Box p="3" flex="1 1">
          <FormControl id="year" display="flex" alignItems="center">
            <FormLabel marginBottom="0">Year</FormLabel>
            <Select name="year" ref={yearInputRef}>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
            </Select>
          </FormControl>
        </Box>
        <Box p="3" flex="1 1">
          <FormControl id="month" display="flex" alignItems="center">
            <FormLabel marginBottom="0">Month</FormLabel>
            <Select name="month" ref={monthInputRef}>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">Septemer</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Select>
          </FormControl>
        </Box>
        <Box p="3">
          <Button type="submit" colorScheme="primary">
            Find Events
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default EventsSearch;
