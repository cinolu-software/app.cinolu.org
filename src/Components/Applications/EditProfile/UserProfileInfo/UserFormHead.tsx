import { Row } from "reactstrap";
import {imageBaseUrl} from "@/services/axios";
import { useAppSelector} from "@/Redux/Hooks";


export const UserFormHead = () => {

  const {user} = useAppSelector(state => state.auth);

  return (
    <Row className="mb-2">
      <div className="profile-title">
        <div className="d-flex">
          <img className="profile-info" alt="" src={user?.profile ? `${imageBaseUrl}/profiles/${user?.profile}` : `/assets/images/avtar/avatar.jpg`} />
          <div className="flex-grow-1">
            <h4 className="mb-1 text-uppercase">
              {user?.name}
            </h4>
          </div>
        </div>
      </div>
    </Row>
  );
};
