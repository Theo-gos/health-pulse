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
                        border={'1px solid gray'}

                        _hover={{
                            cursor: 'pointer',
                            backgroundColor: '#EAF1FA',
                            color: '#1366DE'
                        }}

                        bg={selected === 1 ? '#EAF1FA' : 'transparent'}
                        color={selected === 1 ? '#1366DE' : 'black'}
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
                        border={'1px solid gray'}

                        _hover={{
                            cursor: 'pointer',
                            backgroundColor: '#EAF1FA',
                            color: '#1366DE'
                        }}

                        bg={selected === 2 ? '#EAF1FA' : 'transparent'}
                        color={selected === 2 ? '#1366DE' : 'black'}
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
                        border={'1px solid gray'}

                        _hover={{
                            cursor: 'pointer',
                            backgroundColor: '#EAF1FA',
                            color: '#1366DE'
                        }}

                        bg={selected === 3 ? '#EAF1FA' : 'transparent'}
                        color={selected === 3 ? '#1366DE' : 'black'}
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