/** @format */

import "../Css fills/style.css";
import Cookies from "js-cookie";

import axios from "axios";
import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function Register() {
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhonelError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required").max(10, "Max 10 digits"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      axios
        .post("http://localhost:7000/api/v1.0.0/users/signup", values)
        .then((response) => {
          Cookies.set("user", JSON.stringify(response.data.user));
          Cookies.set("token", JSON.stringify(response.data.token));
          resetForm();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            const message = error.response.data.message;
            if (message.includes("@")) {
              setEmailError("البريد الالكتروني موجود مسبقاً");
            } else {
              setPhonelError("الرقم موجود مسبقاً");
            }
          } else {
            console.log(error);
          }
        });
    },
  });

  return (
    <div className='login-container'>
      <Paper className='login-paper'>
        <Text size='lg' fw={500}>
          Create your account
        </Text>
        <Divider label='Register with email' labelPosition='center' my='lg' />
        <form onSubmit={formik.handleSubmit}>
          <Stack>
            <TextInput
              label='Name'
              placeholder='Your name'
              {...formik.getFieldProps("name")}
              error={formik.touched.name && formik.errors.name}
              radius='md'
            />
            <TextInput
              label='Email'
              placeholder='example@example.com'
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
              radius='md'
              onChange={(e) => {
                formik.handleChange(e);
                setEmailError("");
              }}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <PasswordInput
              label='Password'
              placeholder='Your password'
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.errors.password}
              radius='md'
            />
            <TextInput
              label='Phone Number'
              placeholder='963+'
              {...formik.getFieldProps("phone")}
              error={formik.touched.phone && formik.errors.phone}
              radius='md'
              type='number'
            />
            {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
          </Stack>
          <Group justify='space-between' mt='xl'>
            <Anchor href='/login' size='xs'>
              Already have an account? Login
            </Anchor>
            <Button type='submit' radius='xl'>
              Register
            </Button>
            <br />
          </Group>
        </form>
      </Paper>
    </div>
  );
}
