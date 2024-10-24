import { TabContent } from "reactstrap";
import InboxContent from "../../InboxContent";
// import SentContent from "../../SentContent";
// import StarredContent from "../../StarredContent";
// import DraftContent from "../../DraftContent";
// import TrashContent from "../../TrashContent";
// import WorkContent from "../../WorkContent";
// import PrivateContent from "../../PrivateContent";
import SupportContent from "../../SupportContent";
import AddLabelModal from "../../AddLabelModal";


const BroadCastContent: React.FC<{navId: string}> = ({navId}) => {

  return (
    <TabContent activeTab={navId} id="notifications-pills-tabContent">
        <InboxContent />
        {/*<SentContent />*/}
        {/*<StarredContent />*/}
        {/*<DraftContent />*/}
        {/*<TrashContent />*/}
        {/*<WorkContent />*/}
        {/*<PrivateContent />*/}
        <SupportContent />
        <AddLabelModal />
    </TabContent>
  )
}

export default BroadCastContent