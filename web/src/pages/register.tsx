import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react'
import { toErrorMap } from '../../utils/toErrorMap';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={
          async (values, {setErrors}) => {
            const response = await register(values);
            console.log(response);
            if (response.data?.register.errors) {
              setErrors(
                toErrorMap(response.data.register.errors)
              );
            } else if (response.data?.register.user) {
              // worked
              router.push('/');
            }
          }
        }
      >
        {
          ({isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="username"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="password"
                  type="password"
                />
              </Box>

              <Button type="submit" colorScheme="teal" isLoading={isSubmitting} mt={4}>
                register
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
}
export default withUrqlClient(createUrqlClient)(Register);