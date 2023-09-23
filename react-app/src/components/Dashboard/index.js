import TaskComponent from "../Task/TaskComponent"
import './dashboard.css'

function Dashboard (){

    return (
        <>
        <div className="componentTitle">Task</div>
            < TaskComponent />

        <div className="componentTitle">Appointments</div>

   
        <div className="componentTitle">Messages</div>




        </>
    )
}
export default Dashboard
