import { StackNavigator} from 'react-navigation';

import StudentLogin from './Studentlogin';
import AdminLogin from './AdminLogin';
import studentDrawer from './studentnavigator';
import adminDrawer from './adminNavigator';

export const navigator = StackNavigator({
    StudentLogin:StudentLogin,
    AdminLogin:AdminLogin,
    studentDrawer:studentDrawer,
    adminDrawer:adminDrawer,
    StudentLogout:StudentLogin,
    AdminLogout:AdminLogin,
},{
    headerMode:'none'
});

export default navigator;