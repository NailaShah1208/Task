import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import '../styling/style.css';
import TextError from './TextError';
import { useNavigate } from 'react-router-dom';
const AddData = () => {
    const navigate = useNavigate()
    const initialValues = {
        title: '',
        model: '',
        price: ''
    }
    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
        model: Yup.string().required('Required'),
        price: Yup.string().required('Required'),

    })
    const onSubmit = (values) => {
        console.log("posting values", values)
        axios.post('http://localhost:5000/post/', values).then((res) => {
            console.log("res of posting", res);
            navigate("/")
        })
            .catch((err) => {
                console.log("error");
            })

    }
    return (
        <div>
            <h1>Submit form</h1>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formik => {
                        return <Form>


                            <div className="formControl">
                                <label htmlFor='title'>Title</label>
                                <Field name="title" id="title" type="text" />
                                <ErrorMessage name="title" component={TextError} />
                            </div>
                            <div className="formControl">
                                <label htmlFor='model'>Model</label>
                                <Field name="model" id="model" type="text" />
                                <ErrorMessage name="model" component={TextError} />
                            </div>
                            <div className="formControl">
                                <label htmlFor='price'>Price</label>
                                <Field name="price" id="price" type="text" />
                                <ErrorMessage name="price" component={TextError} />
                            </div>
                            <Box>
                                <Button type="submit" variant="contained" sx={{ m: 2 }}>Submit</Button>
                            </Box>
                        </Form>
                    }

                }
            </Formik>
        </div>
    )
}

export default AddData
