import PeoplesIcon from "@rsuite/icons/Peoples";
import SentToUserIcon from "@rsuite/icons/SentToUser";
import { Panel } from "rsuite";
import { useUser } from "../../Contexts/UserContext";

const PanelUser= () => {
  const { userData, remainingUsers } = useUser();
  return (
    <div>
      <Panel shaded bordered className="m-4 bg-white">
        <div className="lg:flex lg:flex-row gap-10 xs:gap-3">
          <div className="flex items-center gap-2">
            <PeoplesIcon className="text-lg" />
            <h5 className="text-black">
              Total Registered Users: {userData.length}
            </h5>
          </div>
          <div className="flex items-center gap-2">
            <SentToUserIcon className="text-lg" />
            <h5 className="text-black">Remaining Users: {remainingUsers}</h5>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default PanelUser;