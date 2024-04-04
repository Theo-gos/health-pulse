import DashboardSidebar from "@/Components/DashboardSidebar";
import PatientList from "@/Components/PatientList";
import PatientMedicalRecord from "@/Components/PatientMedicalRecord";
import DoctorLayout from "@/Layouts/DoctorLayout";
import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const icdObj = {}

export default function Records({medical_info, icd}) {
    const [selected, setSelected] = useState(0)
    const selectManager = {
        selected: selected,
        setSelected: setSelected,
    }

    useMemo(() => {
        icd.forEach(item => {
            icdObj[item.icd_code] = item
        })
    }, [icd])

    return (
        <DoctorLayout state={'records'}>
            <Box
                w={'55%'}
                h={'100%'}
            >
                <Box
                    w={'100%'}
                    h={'100%'}
                    p={'4px 8px'}
                >
                    {selected === 0 ? <PatientList selectManager={selectManager} medicalInfo={medical_info ? medical_info : []} />
                        :
                        <PatientMedicalRecord selectManager={selectManager} medicalInfo={medical_info ? medical_info : []} icd={icdObj} />}
                </Box>
            </Box>

            <Box
                w={'32%'}
                h={'100%'}
                p={'4px'}
            >
                {selected === 0 ? '' : <PatientList selectManager={selectManager} medicalInfo={medical_info ? medical_info : []} />}
            </Box>
        </DoctorLayout>
    )
}