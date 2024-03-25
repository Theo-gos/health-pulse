import DashboardSidebar from "@/Components/DashboardSidebar";
import PatientList from "@/Components/PatientList";
import PatientMedicalRecord from "@/Components/PatientMedicalRecord";
import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Records({medical_info}) {
    const { auth, message, flash } = usePage().props
    const [selected, setSelected] = useState(0)
    const selectManager = {
        selected: selected,
        setSelected: setSelected,
    }

    return (
        <Box
            w={'100vw'}
            h={'100vh'}
        >
            <Flex
                w={'100%'}
                h={'100vh'}
            >
                <DashboardSidebar state={'records'} user={auth.user}/>
                <Box
                    w={'55%'}
                    h={'100%'}
                >
                    <Box
                        w={'100%'}
                        h={'5%'}
                    >
                        Header
                    </Box>

                    <Box
                        w={'100%'}
                        h={'95%'}
                        p={'4px 8px'}
                    >
                        {selected === 0 ? <PatientList selectManager={selectManager} medicalInfo={medical_info ? medical_info : []} />
                            :
                            <PatientMedicalRecord selectManager={selectManager} medicalInfo={medical_info ? medical_info : []} />}
                    </Box>
                </Box>

                <Box
                    w={'32%'}
                    h={'100%'}
                    p={'4px'}
                >
                    {selected === 0 ? '' : <PatientList selectManager={selectManager} medicalInfo={medical_info ? medical_info : []} />}
                </Box>
            </Flex>
        </Box>
    )
}