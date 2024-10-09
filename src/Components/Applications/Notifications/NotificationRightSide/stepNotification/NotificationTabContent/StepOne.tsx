import React, {useCallback, useMemo} from 'react';
import {Col, Form, Input, Label, Row} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setFormValue } from '@/Redux/Reducers/NotifcationSlice/notificationSlice';
import SimpleMdeReact from 'react-simplemde-editor';
import FormInterview from '../../InterviewNotification/FormInterview';

const StepOne = () => {
  return (
    <>
      <FormInterview/>
    </>
  )
}

export default StepOne