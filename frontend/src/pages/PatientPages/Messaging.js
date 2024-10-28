import ProCard from '../../components/MuiComponents/card';
import CareTeam from '../../components/MuiComponents/careTeam';
import "./PatientPagesStyles/Messaging.css";

const Messaging = () =>{
    return (
        <>

        <h2>Professionals</h2>
          <div className="cards">
          
            <ProCard />
            <ProCard />
            <ProCard />
            <ProCard />

         </div>
         <CareTeam />

      </>
    );
}

export default Messaging