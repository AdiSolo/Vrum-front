import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function RegisterClient() {
  const [serverState, setServerState] = useState();
  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };
  const handleOnSubmit = (values, actions) => {
    console.log(values);
    Axios({
      method: 'POST',
      url: 'http://vrum-api.test/api/register/client',
      data: values,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, 'Thanks!');
      })
      .catch((error) => {
        actions.setSubmitting(false);
        handleServerResponse(false, error.response.data.error);
      });
  };
  return (
    <div className='container my-4 mx-auto px-4 md:px-4'>
      <div className='flex w-full justify-center items-center bg-yellow-400 p-4 mb-4'>
        <div className='back flex-1 flex justify-start '>
          <Link
            className='w-30 py-2 ml-4 px-4 my-4 bg-gray-300 text-black font-semibold rounded-lg '
            to='/register'
          >
            Back
          </Link>
        </div>

        <h1 className='flex-1 text-white'>Register Client</h1>
        <div className='flex-1'></div>
      </div>
      <div className='flex flex-col md:flex-row items-center w-full mb-8 space-x-4'>
        <div className='w-full md:w-1/1 bg-blue-100 rounded-lg shadow-md mb-4 md:mb-0 px-4 py-4'>
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              phone: '',
              email: '',
              country: '',
              city: '',
              state: '',
              postcode: '',
              line_1: '',
              password: '',
              password_confirmation: ''
            }}
            onSubmit={(values) => {
              // console.log(values);
              // alert(JSON.stringify(values, null, 2));
              handleOnSubmit(values);
            }}
          >
            <Form className='flex flex-wrap' method='POST'>
              <div className='w-full md:w-1/3 personal-details px-3'>
                <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                  Your details
                </h3>
                <div className='flex flex-wrap -mx-3 mb-6'>
                  <div className='w-full md:w-1/2 mb-6 md:pr-3 md:mb-0'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      First Name
                    </label>
                    <Field
                      name='first_name'
                      className='appearance-none block w-full bg-white-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                      id='grid-first-name'
                      type='text'
                      placeholder='Jane'
                    />
                    {/* <p className='hidetext-red-500 text-xs italic'>
                      Please fill out this field.
                    </p> */}
                  </div>
                  <div className='w-full md:w-1/2 md:pl-3'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-last-name'
                    >
                      Last Name
                    </label>
                    <Field
                      name='last_name'
                      className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-last-name'
                      type='text'
                      placeholder='Doe'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full md:w-1/3 contact-details px-3'>
                <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                  Contact details
                </h3>
                <div className='flex flex-wrap -mx-3 mb-6 px-3 phone'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-last-name'
                  >
                    Phone Number
                  </label>
                  <Field
                    name='phone'
                    className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-last-name'
                    type='phone'
                    placeholder='+40770009770'
                  />
                </div>
                <div className='flex flex-wrap -mx-3 mb-6 px-3 email'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-last-name'
                  >
                    Email
                  </label>
                  <Field
                    name='email'
                    className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-last-name'
                    type='email'
                    placeholder='company@domain.com'
                  />
                </div>

                <div className='flex flex-wrap -mx-3 mb-6 px-3 country'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-state'
                  >
                    Country
                  </label>
                  <div className='w-full relative'>
                    <Field
                      name='country'
                      className='block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-state'
                      as='select'
                    >
                      <option>MD</option>
                      <option>RO</option>
                      <option>US</option>
                    </Field>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                      <svg
                        className='fill-current h-4 w-4'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className='flex flex-wrap -mx-3 mb-6 location-details'>
                  <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-city'
                    >
                      City
                    </label>
                    <Field
                      name='city'
                      className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-city'
                      type='text'
                      placeholder='Albuquerque'
                    />
                  </div>
                  <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-state'
                    >
                      State
                    </label>
                    <div className='relative'>
                      <Field
                        name='state'
                        className='block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='grid-state'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-zip'
                    >
                      Zip
                    </label>
                    <Field
                      name='zip'
                      className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-zip'
                      type='text'
                      placeholder='90210'
                    />
                  </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-6 px-3 address'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-last-name'
                  >
                    Your Address
                  </label>
                  <Field
                    name='line_1'
                    className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-last-name'
                    type='text'
                    placeholder='Robert Robertson, 1234 NW Bobcat Lane'
                  />
                </div>
              </div>
              <div className='w-full md:w-1/3 security'>
                <h3 className='uppercase tracking-wide text-gray-700 text-md font-bold mb-3'>
                  Security
                </h3>

                <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Password
                  </label>
                  <Field
                    name='password'
                    className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-password'
                    type='password'
                    placeholder='******************'
                  />
                  <p className='text-gray-600 text-xs italic'>
                    Make it as long and as crazy as you'd like
                  </p>
                </div>
                <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Confirm Password
                  </label>
                  <Field
                    name='password_confirmation'
                    className='appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-password'
                    type='password'
                    placeholder='******************'
                  />
                  <p className='text-gray-600 text-xs italic'>
                    Make it as long and as crazy as you'd like
                  </p>
                </div>
              </div>
              <div className='w-full flex justify-center'>
                <button
                  type='submit'
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-20 rounded'
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default RegisterClient;