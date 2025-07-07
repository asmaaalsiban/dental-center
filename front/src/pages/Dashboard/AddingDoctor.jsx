/** @format */

// import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
export default function AddingDoctor() {
  const validation = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    specialty: Yup.string().required("التخصص مطلوب"),
    email: Yup.string().email("الايميل غير صالح").required("الايميل مطلوب"),
    phone: Yup.string()
      .matches(/^(\+?\d{9,15})$/, "رقم الهاتف غير صالح")
      .required("رقم الهاتف مطلوب"),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
    alert("تمت إضافة الطبيب");
    actions.resetForm();
  };

  return (
    <div
      style={{
        position: "relative",
        top: "100px",
      }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          margin: "auto",
        }}>
        <Typography variant='h4' mb={3} align='center'>
          إضافة طبيب
        </Typography>
        <Formik
          initialValues={{
            name: "",
            specialty: "",
            email: "",
            phone: "",
          }}
          validationSchema={validation}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Box component='form' onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label='اسم الطبيب'
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.name && touched.name && (
                  <div style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.name}
                  </div>
                )}

                <TextField
                  label='التخصص'
                  name='specialty'
                  value={values.specialty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.specialty && touched.specialty && (
                  <div style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.specialty}
                  </div>
                )}

                <TextField
                  label='البريد الإلكتروني'
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.email && touched.email && (
                  <div style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.email}
                  </div>
                )}

                <TextField
                  label='رقم الهاتف'
                  name='phone'
                  type='tel'
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                {errors.phone && touched.phone && (
                  <div style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.phone}
                  </div>
                )}

                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={{ py: 1.5, fontSize: "1.2rem" }}>
                  إضافة الطبيب
                </Button>
              </Stack>
            </Box>
          )}
        </Formik>
      </Paper>
    </div>
  );
}
