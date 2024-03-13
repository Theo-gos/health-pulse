import {
    ListIcon,
    ListItem,
} from "@chakra-ui/react";
import { Link } from "@inertiajs/react";

export default function SideBarItem({ color = '#637185', bg = 'transparent', href, icon, title = 'title', selected, ...props }) {
    console.log(href)
    return (
        <ListItem
            {...props}
            _hover={selected ? '' :
            {
                backgroundColor: '#F2F7FF',
            }}
            style={{cursor: 'pointer'}}
            

            borderRadius={'lg'}
            bg={selected ? '#F2F7FF' : 'transparent'}
            color={selected ? '#1366DE' : '#637185'}

            w={'97%'}
            p={'5px 16px'}

            fontSize={'12px'}
        >
            <ListIcon mb={'1px'} as={icon} />
            <Link href={href}>{title}</Link>
        </ListItem>
    )
}