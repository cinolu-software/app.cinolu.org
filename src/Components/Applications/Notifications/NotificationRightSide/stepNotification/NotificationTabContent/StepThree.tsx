import React from 'react';
import { useAppSelector, useAppDispatch } from '@/Redux/Hooks';
import { sendNotification } from '@/Redux/Reducers/NotifcationSlice/notificationSlice';
import CommonButton from '../CommonButton';

const StepThree = () => {
  const { title, message } = useAppSelector(state => state.notifications);
  const dispatch = useAppDispatch();

  const handleSendNotification = async () => {
    if (title && message) {
      const notificationId = await dispatch(sendNotification({ title, message }));

    }
  };

  return (
      <div>
        <CommonButton disabled={!title || !message} onClick={handleSendNotification}>
          Envoyer la notification
        </CommonButton>
      </div>
  );
};

export default StepThree;
