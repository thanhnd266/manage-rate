import { checkPermission } from "../../helpers/checkPermission";
import ErrorPage from "../ErrorPage";

const ProtectedRoute = ({ requirePermission, userPermission, children }) => {
    const hasValidated = checkPermission(userPermission, requirePermission);

    if(hasValidated) {
        return children;
    }

    return <ErrorPage code={401} title="Không có quyền" description="Bạn không có quyền truy cập vào trang này!" />

    // if (userRole.includes(requireRole) || requireRole === "*" || userRole.includes("*")) {
    //     return children
    // }
    // return <div>Khong co quyen truy cap</div>
}

export default ProtectedRoute