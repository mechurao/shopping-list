import Base from "../components/Base";
import OverviewNavbar from "../components/UI/Navbars/OverviewNavbar";

function Overview() {

    return(<Base navbar={<OverviewNavbar username={'test'}/>}
                 content={<>

                 </>
                 }
    />);

}
export default Overview;