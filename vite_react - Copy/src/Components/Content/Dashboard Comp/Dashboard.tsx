import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { DetailsList, DetailsListLayoutMode, IColumn, Spinner, SpinnerSize, Stack, Text } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { TextField } from '@fluentui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserDetailPanel from './UserDetailPanel';

initializeIcons();

export interface formValues {
    id?: String,
    isDeleted: boolean,
    name: String,
    email: String,
    phoneNo: number,
    building: String,
    street: String,
    landMark: String,
    city: String,
    district: String,
    pinCode: number,
    state: String,
    country: String,
    discription: String,
    quantity: number,
    price: number,
    GST: String,
    amount: number,
    discount: String,
    amountPaid: number,
    description: String
}

const initialFormValues: formValues = {
    id: "",
    isDeleted: false,
    name: "",
    email: "",
    phoneNo: 0,
    building: "",
    street: "",
    landMark: "",
    city: "",
    district: "",
    pinCode: 0,
    state: "",
    country: "",
    discription: "",
    quantity: 0,
    price: 0,
    GST: "",
    amount: 0,
    discount: "",
    amountPaid: 0,
    description: ""
}

const stackTokens = { childrenGap: 20 };
const btStyle = {
    root: {
        width: 40,
        marginTop: 10
    }
};

const formSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    phoneNo: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(10)
        .required('A phone number is required'),
});

const Dashboard = () => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [data, setData] = useState<formValues[]>();
    const [viewUserdata, setviewUserData] = useState<formValues[]>();
    const [isLoading, setisLoading] = useState<boolean>(false);


    const handleView = (item: any) => {
        console.log(item);
        setviewUserData(item);
    }


    //Add Api...
    const handleSubmit = async (values: formValues) => {
        const UValues = {
            name: values.name,
            email: values.email,
            phoneNo: values.phoneNo,
            building: values.building,
            street: values.street,
            landMark: values.landMark,
            city: values.city,
            district: values.district,
            pinCode: values.pinCode,
            state: values.state,
            country: values.country,
            discription: values.discription,
            quantity: values.quantity,
            price: values.price,
            GST: values.GST,
            amount: values.amount,
            discount: values.discount,
            amountPaid: values.amountPaid,
            description: values.description
        }
        await axios.post('https://localhost:7031/api/User/CreateUser', UValues)
        console.log(values);
        dismissPanel();
    }

    //Get Api...
    useEffect(() => {
        const getUser = async () => {
            setisLoading(true);
            try {
                const response = await axios.get('https://localhost:7031/api/User/GetAllUser');
                const userData: formValues[] = response.data;
                console.log('Fetched data:', userData);
                setData(userData);
                setisLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [])

    //SoftDelete Api.....
    const handleSoftDelete = async (id: any) => {
        await axios.post(`https://localhost:7031/api/User/${id}DeleteUser`);
        const deleteddata = data?.filter((item) => item.id !== id);
        console.log(data);
        setData(deleteddata);
    }

    //Recycle Api....
    const recycleDeleteItem = async (id: any) => {
        await axios.post(`https://localhost:7031/api/User/${id}RecycleUser`)
        const recycleddata = data?.filter((item) => item.id !== id);
        console.log(data);
        setData(recycleddata);
    }


    //Detail List....
    const column: IColumn[] = [
        {
            key: 'column1',
            name: 'SNo',
            fieldName: "index",
            minWidth: 30,
            maxWidth: 60,
            isResizable: true,

        },
        {
            key: 'column2',
            name: 'Name',
            fieldName: "name",
            minWidth: 200,
            maxWidth: 300,
            isResizable: true
        },
        {
            key: "column3",
            name: "Email",
            fieldName: "email",
            minWidth: 250,
            maxWidth: 350,
            isResizable: true,
        },
        {
            key: "column4",
            name: "Phone No",
            fieldName: "phoneNo",
            minWidth: 200,
            maxWidth: 300,
            isResizable: true,
        },
        {
            key: "column5",
            name: "Address",
            fieldName: "state",
            minWidth: 400,
            maxWidth: 500,
            isResizable: true,
        },

        {
            key: 'column7',
            name: 'Actions',
            fieldName: "actions",
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
            onRender: (item: formValues) => (
                <Stack horizontal>
                    <IconButton
                        menuIconProps={{ iconName: 'RedEye' }}
                        onClick={() => (handleView(item))}
                    />
                    {item.isDeleted === false ?
                        (<Stack horizontal>
                            <IconButton
                                menuIconProps={{ iconName: 'Edit' }}
                            />
                            <IconButton
                                menuIconProps={{ iconName: 'Delete' }}
                                onClick={() => (handleSoftDelete(item.id))}
                            />
                        </Stack>) : (<Stack>
                            <IconButton menuIconProps={{ iconName: 'Refresh' }} onClick={() => (recycleDeleteItem(item.id))} />
                        </Stack>)
                    }
                </Stack>
            )
        },
    ];

    return (
        <Stack>
            <Stack>
                <Stack>
                    <PrimaryButton style={{ width: '40px' }} text="Add" onClick={openPanel} />
                </Stack>
                <Panel
                    isOpen={isOpen}
                    onDismiss={dismissPanel}
                    headerText='Add Requst'
                    isFooterAtBottom={true}
                    type={PanelType.medium}
                >
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={handleSubmit}
                        validationSchema={formSchema}
                    >
                        {({ values, errors, touched, handleChange }) => (
                            <Form>
                                <Stack>
                                    <Text variant='smallPlus'>Personal Details</Text>
                                    <Stack tokens={stackTokens}>
                                        <Stack horizontal tokens={stackTokens}>
                                            <Field
                                                as={TextField}
                                                name="name"
                                                label='Name'
                                                value={values.name}
                                                onChange={handleChange}
                                                errorMessage={
                                                    touched.name && errors.name ? errors.name : ""
                                                }
                                            />

                                            <Field as={TextField}
                                                name="email" label='Email'
                                                value={values.email}
                                                onChange={handleChange}
                                                errorMessage={
                                                    touched.email && errors.email ? errors.email : ""
                                                }
                                            />
                                            <Field as={TextField}
                                                name="phoneNo"
                                                label='Phone No'
                                                value={values.phoneNo}
                                                onChange={handleChange}
                                                errorMessage={
                                                    touched.phoneNo && errors.phoneNo ? errors.phoneNo : ""
                                                } />

                                        </Stack>
                                        <Stack>
                                            <Text>Address</Text>
                                            <Stack horizontal tokens={stackTokens}>
                                                <Field as={TextField}
                                                    name="building"
                                                    label='Building'
                                                    value={values.building}
                                                    onChange={handleChange}
                                                />
                                                <Field as={TextField}
                                                    name="street"
                                                    label='Street'
                                                    value={values.street}
                                                    onChange={handleChange}
                                                />
                                                <Field as={TextField}
                                                    name="landMark"
                                                    label='landMark'
                                                    value={values.landMark}
                                                    onChange={handleChange}
                                                />
                                            </Stack>
                                            <Stack horizontal tokens={stackTokens}>
                                                <Field as={TextField}
                                                    name="city"
                                                    label='City'
                                                    v alue={values.city}
                                                    onChange={handleChange}
                                                />
                                                <Field as={TextField}
                                                    name="district"
                                                    label='District'
                                                    value={values.district}
                                                    onChange={handleChange}

                                                />
                                                <Field as={TextField}
                                                    name="pinCode"
                                                    label='Pin Code'
                                                    value={values.pinCode}
                                                    onChange={handleChange}
                                                />
                                            </Stack>
                                            <Stack horizontal tokens={stackTokens}>
                                                <Field as={TextField}
                                                    name="state"
                                                    label='State'
                                                    value={values.state}
                                                    onChange={handleChange} />
                                                <Field as={TextField}
                                                    name="country"
                                                    label='Country'
                                                    value={values.country}
                                                    onChange={handleChange} />
                                            </Stack>
                                        </Stack>
                                        <Stack>
                                            <Text>Item Discription</Text>
                                            <Stack horizontal tokens={stackTokens}>
                                                <Field as={TextField}
                                                    name="discription"
                                                    label='Discription'
                                                    value={values.discription}
                                                    onChange={handleChange} />
                                                <Field as={TextField}
                                                    name="quantity"
                                                    label='Quantity'
                                                    value={values.quantity}
                                                    onChange={handleChange} />
                                                <Field as={TextField}
                                                    name="price"
                                                    label='Price'
                                                    value={values.price}
                                                    onChange={handleChange} />
                                            </Stack>
                                            <Stack horizontal tokens={stackTokens}>
                                                <Field as={TextField}
                                                    name="GST"
                                                    label='GST%'
                                                    value={values.GST}
                                                    onChange={handleChange} />
                                                <Field as={TextField}
                                                    name="amount"
                                                    disabled label='Amount'
                                                    value={values.amount}
                                                    onChange={handleChange} />
                                            </Stack>
                                            <PrimaryButton text='Add' styles={btStyle} />
                                        </Stack>
                                        <Stack>
                                            <Text>Payment Deatils</Text>
                                            <Stack horizontal tokens={stackTokens}>
                                                <Field as={TextField} name="discount"
                                                    label='Discount'
                                                    value={values.discount}
                                                    onChange={handleChange} />
                                                <Field as={TextField} name="amountPaid"
                                                    label='Amount Paid'
                                                    value={values.amountPaid}
                                                    onChange={handleChange} />
                                            </Stack>
                                            <Field as={TextField}
                                                name="description"
                                                label='Description'
                                                multiline value={values.description}
                                                onChange={handleChange} />
                                        </Stack>
                                    </Stack>
                                    <Stack horizontal tokens={stackTokens} styles={{ root: { marginTop: '20px' } }}>
                                        <PrimaryButton type='submit' text='Save' />
                                        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
                                    </Stack>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Panel>
            </Stack >
            <Stack>
                {isLoading === true ?
                    <Spinner style={{ marginTop: '10px' }} size={SpinnerSize.large} /> : <DetailsList
                        items={(data || []).map((user, index) => ({
                            ...user,
                            index: index + 1,
                        }))}
                        columns={column}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        checkboxVisibility={2}
                    />
                }
            </Stack>
            <Stack>
                <UserDetailPanel usersDetailprop={viewUserdata} />
            </Stack>
        </Stack >
    )
}

export default Dashboard