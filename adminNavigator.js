import {Dimensions} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

import AdminHome from './Admin/AdminHome';
import AdminDetail from './Admin/AdminDetail';
import AdminEditDetail from './Admin/AdminEditDetail';
import AdminSetting from './Admin/setting';
import AdminHistory from './Admin/AdminHistory';
import AdminProfile from './Admin/AdminProfile';
import AdminReport from './Admin/AdminReport';
import AdminCreate from './Admin/AdminCreate';
import Organization from './Student/organizationChart';
import drawerMenuAdmin from './UI/drawerMenuAdmin';
import AdminUpdate from './Admin/AdminUpdate';
import AdminSearch from './Admin/AdminSearch';

export const aHomeStack = StackNavigator({
    AdminHome:AdminHome,
    AdminDetail:AdminDetail,
    AdminCreate:AdminCreate,
    
},{
    initialRouteName:'AdminHome',
});

export const aHistoryStack = StackNavigator({
    AdminHistory:AdminHistory,
    AdminReport:AdminReport,
    AdminUpdate:AdminUpdate,
    AdminEditDetail:AdminEditDetail,
},{
    initialRouteName:'AdminHistory',
});

export const aOrganizationStack = StackNavigator({
    Organization:Organization,
    AdminProfile:AdminProfile,
    //AdminEditChart:AdminEditChart,
},{
    initialRouteName:'Organization',
});

export const AdminDrawer=DrawerNavigator({
    AdminHome:AdminHome,
    AdminSearch:AdminSearch,
    aHomeStack:aHomeStack,
    aHistoryStack:aHistoryStack,
    aOrganizationStack:aOrganizationStack,
    aSetting:AdminSetting,
},{
    contentComponent:drawerMenuAdmin,
    drawerWidth:Dimensions.get('window').width-100,
    drawerPosition:'right',
});

export default AdminDrawer;
