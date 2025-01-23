import * as React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { PrimaryButton, Stack } from '@fluentui/react';
import AppRoutes from '../Routes/AppRoutes';

const navStyles: Partial<INavStyles> = {
    root: {
        width: 190,
        height: "100vh",
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
    },
};
const layoutStyle = {
    root: {
        height: 60,
        padding: '10px',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f3f2f1',
    },
};


const navLinkGroups: INavLinkGroup[] = [
    {
        links: [
            {
                name: 'Dashboard',
                url: '/',
                key: 'key1',
                icon: 'HomeSolid'
            },
            {
                name: 'Leaves',
                url: '/leaves',
                key: 'key2',
                icon: 'Calendar'
            },
            {
                name: 'Attendance Request',
                url: '/attendanceRequest',
                key: 'key3',
                icon: 'Group'
            },
            {
                name: 'Reports',
                url: '/reports',
                key: 'key4',
                icon: 'BarChartVerticalFill'
            },
            {
                name: 'Events',
                url: '/userDetailTable',
                key: 'key5',
                icon: 'TaskSolid'
            },
            {
                name: 'Company Policies',
                url: '/companyPolicies',
                key: 'key6',
                icon: 'TextDocument'
            },
        ],
    },
];

const Home = () => {
    return (
        <>
            <Stack verticalFill style={{ width: '100%' }}>
                <Stack horizontal styles={layoutStyle} >
                    <img src="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/capLogo.svg" alt="" width={"170px"} />
                    <Stack>
                        <PrimaryButton text='Logout' />
                    </Stack>
                </Stack>
                <Stack horizontal grow>
                    <Nav
                        styles={navStyles}
                        groups={navLinkGroups}
                    />
                    <Stack grow style={{ padding: '5px' }}>
                        <AppRoutes />
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default Home