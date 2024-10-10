import React, { useState } from 'react';
import FormInterview from '../../InterviewNotification/FormInterview';
import { useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import { Button, Row, Col } from "reactstrap";
import SVG from "@/CommonComponent/SVG";

const StepOne: React.FC = () => {

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');  
  const [message, setMessage] = useState<string>('');  

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    setTitle(e.target.value);
  };

  const handleMessageChange = (value: string) => {  
    setMessage(value);
  };

  const saveToRedux = () => {
    dispatch(setFormValue({ name: 'title', value: title }));
    dispatch(setFormValue({ name: 'message', value: message }));
  };

  return (
    <>
      <FormInterview 
        onTitleChange={handleTitleChange} 
        onMessageChange={handleMessageChange} 
        saveToRedux={saveToRedux} 
      />
    </>
  );
};

export default StepOne;


