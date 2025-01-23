import React from 'react'
import { Button, DefaultButton, Panel, PanelType, PrimaryButton, Stack, Text } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks';
import { formValues } from './Dashboard';
import { useState } from 'react';

interface UserDetailPanelProps {

    usersDetailprop: formValues[] | undefined;

}
const UserDetailPanel = ({ usersDetailprop }: UserDetailPanelProps) => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [usersDetail, setUsersDetail] = useState<formValues[]>();

    const save = () => {
        console.log(usersDetailprop); 
    }

    return (
        <div>
            <DefaultButton onClick={save}>asd</DefaultButton>
            <Panel
                isOpen={isOpen}
                onDismiss={dismissPanel}
                headerText='User Details'
                isFooterAtBottom={true}
                type={PanelType.medium}
            >
                <Stack horizontal horizontalAlign='space-between'>
                    <Stack>
                        <Text>Name</Text>
                        <Text>Email</Text>
                        <Text>Phone No</Text>
                        <Text>City</Text>
                        <Text>District</Text>
                        <Text>Country</Text>
                    </Stack>
                    <Stack>
                        <Text>:</Text>
                        <Text>:</Text>
                        <Text>:</Text>
                        <Text>:</Text>
                        <Text>:</Text>
                        <Text>:</Text>
                    </Stack>
                    <Stack>
                        <Text>asdf</Text>
                        <Text>asdf</Text>
                        <Text>asdf</Text>
                        <Text>asdf</Text>
                        <Text>asdf</Text>
                        <Text>asdf</Text>
                    </Stack>
                </Stack>
            </Panel>
        </div >
    )
}

export default UserDetailPanel
