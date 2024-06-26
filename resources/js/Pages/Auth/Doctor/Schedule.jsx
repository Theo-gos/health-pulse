import DashboardSchedule from "@/Components/DashboardSchedule";
import DashboardSidebar from "@/Components/DashboardSidebar";
import ScheduleAside from "@/Components/ScheduleAside";
import ScheduleForm from "@/Components/ScheduleForm";
import DoctorLayout from "@/Layouts/DoctorLayout";
import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

export default function Schedule({calendars, aside}) {
    const { message, flash } = usePage().props
    let calendarData = calendars
    let asideData = aside
    
    const [editData, setEditData] = useState({})

    const [mode, setMode] = useState('add')
    const modeManager = {
        changeMode: setMode,
        mode: mode,
    }

    const [selectedTaskId, setSelectedTaskId] = useState(0)
    const taskIdManager = {
        changeId: setSelectedTaskId,
        id: selectedTaskId,
    }

    useEffect(() => {
        if (selectedTaskId !== 0) {
            setMode('edit')
        }
    }, [selectedTaskId])

    useEffect(() => {
        if (mode === 'add') {
            setSelectedTaskId(0)
        }
    }, [mode])

    useMemo(() => { 
        if (flash.schedule) {
            if (flash.schedule.edit) {
                setEditData(flash.schedule.edit)
            }
        }
    }, [flash])

    return (
        <DoctorLayout state={'schedule'}>
            <Box
                w={'55%'}
                h={'100%'}
            >
                <Box
                    w={'100%'}
                    h={'100%'}
                    p={'4px 8px'}

                    fontSize={'14px'}
                >
                    <Box
                        w={'100%'}
                        h={'50%'}
                        pb={'8px'}
                    >
                        <DashboardSchedule width={'100%'} height={'100%'} schedule={calendarData} navigation={false} />
                    </Box>
                    <Box
                        w={'100%'}
                        h={'50%'}
                    >
                        <ScheduleForm modeManager={modeManager} idManager={taskIdManager} editData={editData} />
                    </Box>
                </Box>
            </Box>
            <Box
                w={'32%'}
                h={'100%'}
            >
                <ScheduleAside idManager={taskIdManager} asideData={asideData} />
            </Box>
        </DoctorLayout>
    )
}