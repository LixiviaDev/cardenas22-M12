import { useParams } from "react-router-dom"

export default function UserRoleManagement() {
    const {userId} = useParams(); 
    
    return(<>
        <h1>User Role Management</h1>
        <p>user {userId}</p>
    </>)
}