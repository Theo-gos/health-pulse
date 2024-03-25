import {
    Box,
    Stack,
} from "@chakra-ui/layout";

export default function PatientList({ selectManager }) {
    const { selected, setSelected } = selectManager;

    return (
        <Box
            w={'100%'}
            h={'100%'}
            p={'16px'}

            borderRadius={'xl'}
            
            bg={'#F6F7FA'}
        >
            <Box
                fontSize={'20px'}
                fontWeight={'bold'}
                
                borderBottom={'1px solid black'}
                mb={'24px'}
            >
                Patients List
            </Box>
            <Box
                w={'100%'}
                h={'90%'}

                overflowY={'scroll'}
            >
                <Stack spacing={3}>
                    <Box
                        w={'100%'}
                        p={'16px'}

                        borderRadius={'xl'}
                        border={'1px solid black'}

                        _hover={{
                            cursor: 'pointer',
                            backgroundColor: 'gray',
                        }}

                        bg={selected === 1 ? 'blue.100' : 'transparent'}
                        onClick={() => setSelected(1)}

                        fontSize={'14px'}
                    >
                        <Box fontWeight={'bold'}>Name</Box>
                        <Box fontSize={'12px'}>Date</Box>
                        <Box fontSize={'12px'}>Time</Box>
                    </Box>

                    <Box
                        w={'100%'}
                        p={'16px'}

                        borderRadius={'xl'}
                        border={'1px solid black'}

                        _hover={{
                            cursor: 'pointer',
                            backgroundColor: 'gray',
                        }}

                        bg={selected === 2 ? 'blue.100' : 'transparent'}
                        onClick={() => setSelected(2)}

                        fontSize={'14px'}
                    >
                        <Box fontWeight={'bold'}>Name</Box>
                        <Box fontSize={'12px'}>Date</Box>
                        <Box fontSize={'12px'}>Time</Box>
                    </Box>

                    <Box
                        w={'100%'}
                        p={'16px'}

                        borderRadius={'xl'}
                        border={'1px solid black'}

                        _hover={{
                            cursor: 'pointer',
                            backgroundColor: 'gray',
                        }}

                        bg={selected === 3 ? 'blue.100' : 'transparent'}
                        onClick={() => setSelected(3)}

                        fontSize={'14px'}
                    >
                        <Box fontWeight={'bold'}>Name</Box>
                        <Box fontSize={'12px'}>Date</Box>
                        <Box fontSize={'12px'}>Time</Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}