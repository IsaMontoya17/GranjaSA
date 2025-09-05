import { Outlet } from 'react-router-dom'
import CustomNavbar from '../navbar/CustomNavbar';

function Layout() {
    return (
        <div>
            <CustomNavbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout