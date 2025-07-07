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

export default function Login() {
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      axios
        .post("http://localhost:7000/api/v1.0.0/users/login", values)
        .then((response) => {
          Cookies.set("user", JSON.stringify(response.data.user));
          Cookies.set("token", response.data.token);
          console.log(response.data.user);
          console.log(response.data.token);
          resetForm();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setError("البريد الالكتروني   أو كلمة المررو غير صالحة");
          }
          console.log(error);
        });
    },
  });

  return (
    <div className='login-container'>
      <Paper className='login-paper'>
        <Text size='lg' fw={500}>
          Welcome back!
        </Text>
        <Divider label='Login with email' labelPosition='center' my='lg' />
        <form onSubmit={formik.handleSubmit}>
          <Stack>
            <TextInput
              label='Email'
              required
              placeholder='example@example.com'
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
              radius='md'
            />
            <PasswordInput
              label='Password'
              required
              placeholder='Your password'
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.errors.password}
              radius='md'
            />
          </Stack>
          <Group justify='space-between' mt='xl'>
            <Anchor href='/register' size='xs'>
              Don't have an account? Register
            </Anchor>
            <Button type='submit' radius='xl'>
              Login
            </Button>
          </Group>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </form>
      </Paper>
    </div>
  );
}
