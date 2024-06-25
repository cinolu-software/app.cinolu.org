import { Row } from "reactstrap";
import {selectAuth} from "@/Redux/Reducers/AuthSlice";
import {useSelector} from "react-redux";
import {imageBaseUrl} from "@/services/axios";


export const UserFormHead = () => {

  const auth = useSelector(selectAuth);

  return (
    <Row className="mb-2">
      <div className="profile-title">
        <div className="d-flex">
          <img className="img-70 rounded-circle" alt="" src={`${imageBaseUrl}/profiles/${auth?.user?.profile}`} />
          <div className="flex-grow-1">
            <h4 className="mb-1 text-uppercase">
              {`${auth?.user?.name}-${auth?.user?.first_name}`}
            </h4>
            <p>{`${auth?.user?.last_name}`}</p>
          </div>
        </div>
      </div>
    </Row>
  );
};
