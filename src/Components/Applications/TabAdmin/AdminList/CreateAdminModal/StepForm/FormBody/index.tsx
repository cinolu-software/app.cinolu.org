import {Row} from 'reactstrap';
import FormLeftSideBar from "./FormLeftSideBar";
import FormTabContent from "./FormTabContent";

const FormBody = () => {
    return (
        <Row className={'g-xl-5 g-3'}>
            <FormLeftSideBar/>
            <FormTabContent/>
        </Row>
    )
}

export default FormBody;