import ModalBasic from '../../../components/ModalBasic';
import React, { useEffect, useState } from 'react';
import { useProfile } from '../../../hooks/profile';
import LoadingSvg from '../../../components/LoadingSvg';
import Image from '../../../images/user-avatar-80.png';
import { Formik, Field, Form } from 'formik';
import { useRegisterNewMember } from '../../../hooks/useProvider';

import { usePhotoUpload } from '../../../hooks/useFiles';
import settings from '../../../config/settings';
import Dropzone from '../../../components/Dropzone';
import Toast2 from '../../../components/Toast2';

function AddNewMemberModal({
  feedbackModalOpen,
  setFeedbackModalOpen,
  toastOpen,
  setToastOpen,
  toastType,
  setToastData
}) {
  const { saveUser, restoreUserAndToken, user } = useProfile();
  const [apiErrors, setApiErrors] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutateAsync: addMember, isLoading } = useRegisterNewMember();

  const { mutateAsync: upload, isUploading } = usePhotoUpload();

  const handleSubmit = async (values) => {
    setApiErrors({});

    await addMember({ ...values })
      .then((response) => {
        setToastData([
          { type: 'success', msg: ' New use was added successfully' }
        ]);
        setToastOpen(true);
        setFeedbackModalOpen(false);
      })
      .catch((error) => {
        setToastData([{ type: 'error', msg: ' An error occurred!' }]);
        setToastOpen(true);
        if (
          error &&
          error.hasOwnProperty('response') &&
          typeof error.response === 'object' &&
          error.response.hasOwnProperty('data')
        ) {
          let responseData = error.response.data;
          if (
            responseData.hasOwnProperty('errors') &&
            typeof responseData.errors === 'object' &&
            Object.keys(responseData.errors).length > 0
          ) {
            setApiErrors(responseData.errors[0]);
          }
        } else {
          console.log('An error occurred!');
        }
      });
  };

  useEffect(() => {
    const hideToast = setTimeout(() => {
      setToastOpen(false);
    }, 8000);
  }, [toastOpen]);

  return (
    <ModalBasic
      id='add-new-member-modal'
      className='w-full h-full max-w-2xl md:h-auto'
      modalOpen={feedbackModalOpen}
      setModalOpen={setFeedbackModalOpen}
      title='Register new team member'
    >
      <div className='px-5 py-4'>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            job_title: '',
            phone: '',
            password: '',
            password_confirmation: ''
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <section>
              <div className='sm:flex  space-y-4 sm:space-y-0 sm:space-x-4 mt-5'>
                <div className=''>
                  <div className='flex flex-wrap  mb-6'>
                    <div className='w-full md:w-1/2 mb-6 md:pr-3 md:mb-6'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='grid-first-name'
                      >
                        First Name
                      </label>
                      <Field
                        name='first_name'
                        className={`form-input w-full ${
                          apiErrors &&
                          apiErrors.hasOwnProperty('first_name') &&
                          typeof apiErrors.first_name[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='grid-first-name'
                        type='text'
                      />
                      {apiErrors &&
                        apiErrors.hasOwnProperty('first_name') &&
                        typeof apiErrors.first_name[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.first_name[0]}
                          </p>
                        )}
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
                        className={`form-input w-full ${
                          apiErrors &&
                          apiErrors.hasOwnProperty('last_name') &&
                          typeof apiErrors.last_name[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        id='grid-last-name'
                        type='text'
                      />
                      {apiErrors &&
                        apiErrors.hasOwnProperty('last_name') &&
                        typeof apiErrors.last_name[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.last_name[0]}
                          </p>
                        )}
                    </div>
                    <div className='w-full flex flex-wrap -mx-3 mb-6 px-3 job_title'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='grid-last-name'
                      >
                        Job Title
                      </label>
                      <Field
                        name='job_title'
                        className={`form-input w-full ${
                          apiErrors &&
                          apiErrors.hasOwnProperty('job_title') &&
                          typeof apiErrors.job_title[0] !== 'undefined'
                            ? `border-red-500`
                            : `border-gray-300`
                        }`}
                        type='text'
                      />
                      {apiErrors &&
                        apiErrors.hasOwnProperty('job_title') &&
                        typeof apiErrors.job_title[0] !== 'undefined' && (
                          <p className='text-red-500 text-12'>
                            {apiErrors.job_title[0]}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className='w-full flex flex-wrap -mx-3 mb-6 px-3 email'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-last-name'
                    >
                      Email
                    </label>
                    <Field
                      name='email'
                      className={`form-input w-full ${
                        apiErrors &&
                        apiErrors.hasOwnProperty('email') &&
                        typeof apiErrors.email[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('email') &&
                      typeof apiErrors.email[0] !== 'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.email[0]}
                        </p>
                      )}
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-6 px-3 phone'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-last-name'
                    >
                      Phone Number
                    </label>
                    <Field
                      name='phone'
                      className={`form-input w-full ${
                        apiErrors &&
                        apiErrors.hasOwnProperty('phone') &&
                        typeof apiErrors.phone[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='grid-last-phone'
                      type='phone'
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('phone') &&
                      typeof apiErrors.phone[0] !== 'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.phone[0]}
                        </p>
                      )}
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-6 px-3 password'>
                    <label
                      className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Password
                    </label>
                    <Field
                      name='password'
                      className={`form-input w-full ${
                        apiErrors &&
                        apiErrors.hasOwnProperty('password') &&
                        typeof apiErrors.password[0] !== 'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='password'
                      type='password'
                      placeholder='***'
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('password') &&
                      typeof apiErrors.password[0] !== 'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.password[0]}
                        </p>
                      )}
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
                      className={`form-input w-full ${
                        apiErrors &&
                        apiErrors.hasOwnProperty('password_confirmation') &&
                        typeof apiErrors.password_confirmation[0] !==
                          'undefined'
                          ? `border-red-500`
                          : `border-gray-300`
                      }`}
                      id='repeat_password'
                      type='password'
                      placeholder='***'
                    />
                    {apiErrors &&
                      apiErrors.hasOwnProperty('password_confirmation') &&
                      typeof apiErrors.password_confirmation[0] !==
                        'undefined' && (
                        <p className='text-red-500 text-12'>
                          {apiErrors.password_confirmation[0]}
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className='flex flex-col px-6 py-5 border-t border-slate-200'>
                <div className='flex self-end'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFeedbackModalOpen(false);
                    }}
                    className='btn border-slate-200 hover:border-slate-300 text-slate-600'
                    type='button'
                  >
                    Cancel
                  </button>

                  <button
                    disabled={isLoading ? true : undefined}
                    type='submit'
                    className='btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3'
                  >
                    {isLoading ? <LoadingSvg /> : 'Save'}
                  </button>
                </div>
              </div>
            </section>
          </Form>
        </Formik>
      </div>
    </ModalBasic>
  );
}

export default AddNewMemberModal;
