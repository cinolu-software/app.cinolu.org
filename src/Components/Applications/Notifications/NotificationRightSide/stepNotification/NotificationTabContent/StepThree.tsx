import React from 'react';
import { useAppSelector, useAppDispatch } from '@/Redux/Hooks';
import { Button, Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { createNotification } from "@/Redux/Reducers/NotifcationSlice/notificationSlice";  
import SVG from "@/CommonComponent/SVG"; 

const StepThree: React.FC = () => {
  const dispatch = useAppDispatch();


  const { formValue } = useAppSelector((state) => state.notifications);
  const { title, message, attachment } = formValue;
  const { selectedUser} = useAppSelector((state) => state.notifications)

 
  const isReadyToSend = title.trim() !== '' && message.trim() !== '';

  const handleSendNotification = () => {

    if (isReadyToSend) {
      dispatch(createNotification({
        title,
        message,
        recipients: [selectedUser?.id],
        attachment: attachment || null
      }));
    }
  };


  return (
    <div>

      <Card className="mt-4 me-2">
        <CardBody>
          <CardTitle tag="h5">Aperçu de la Notification</CardTitle>
          {isReadyToSend ? (
            <>
              <CardText><strong>Titre :</strong> {title}</CardText>
              <CardText><strong>Message :</strong> {message}</CardText>
            </>
          ) : (
            <CardText className="text-muted">Veuillez remplir le titre et le message pour voir un aperçu.</CardText>
          )}
        </CardBody>
      </Card>


      <Row className="mt-4">
        <Col md="6">
          <Button 
            color="primary" 
            className="btn-square" 
            onClick={handleSendNotification}
            disabled={!isReadyToSend}  
          >
            <div className="d-flex align-items-center gap-sm-2 gap-1">
              {"Envoyer la notification"}
              <SVG iconId="send-icon" />
            </div>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default StepThree;

