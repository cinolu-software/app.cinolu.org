import { Row } from "reactstrap";
import {selectAuth} from "@/Redux/Reducers/AuthSlice";
import {useSelector} from "react-redux";
import {imageBaseUrl} from "@/services/axios";


export const UserFormHead = () => {

  const {user} = useSelector(selectAuth);

  return (
    <Row className="mb-2">
      <div className="profile-title">
        <div className="d-flex">
          <img className="img-70 rounded-circle" alt="" src={user?.profile ? `${imageBaseUrl}/profiles/${user?.profile}` : `/assets/images/avtar/avatar.jpg`} />
          <div className="flex-grow-1">
            <h4 className="mb-1 text-uppercase">
              {`${user?.name}`}
            </h4>
          </div>
        </div>
      </div>
    </Row>
  );
};
