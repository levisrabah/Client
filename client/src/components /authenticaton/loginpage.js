import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import { useFormik } from 'formik'; // Import Formik

const LoginPage = () => {
  const { login } = useAuth(); // Access login function from AuthContext
  const history = useHistory();

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      username:'',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { success, message, role } = await login(values); // Call login function from AuthContext
        if (success) {
          if (role === 'user') {
            history.push('/welcome');
          } else if (role === 'admin') {
            history.push('/welcome');
          }
        } else {
          formik.setFieldError('username',message || 'Login failed');
          formik.setFieldError('email', message || 'Login failed');
          formik.setFieldError('password', message || 'Login failed');
        }
      } catch (err) {
        formik.setFieldError('username'.err.response?.data?.message|| 'An error occurred during login');
        formik.setFieldError('email', err.response?.data?.message || 'An error occurred during login');
        formik.setFieldError('password', err.response?.data?.message || 'An error occurred during login');
      }
    },
  });

  return (
    <Container>
      <SignInContainer>
        <Form onSubmit={formik.handleSubmit}>
          <Title>Log in</Title>
          {formik.errors.email && formik.touched.email && <p style={{ color: 'red' }}>{formik.errors.email}</p>}
          <Input
          type='username'
          placeholder='username'
          name='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          />
          <Input
            type='email'
            placeholder='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.errors.password && formik.touched.password && <p style={{ color: 'red' }}>{formik.errors.password}</p>}
          <Input
            type='password'
            placeholder='Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <Anchor href='#'>Forgot your password?</Anchor>
          <Button type="submit">Log In</Button>
        </Form>
      </SignInContainer>

      <OverlayContainer>
        <Overlay>
          <LeftOverlayPanel>
            <Title>Welcome Back!</Title>
            <Paragraph>
              Create an account
            </Paragraph>
            <GhostButton as={Link} to="/register">
              Sign Up
            </GhostButton>
          </LeftOverlayPanel>

          {/* RightOverlayPanel for another panel if needed */}
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default LoginPage;
