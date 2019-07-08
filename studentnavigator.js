import React,{Component} from 'react';
import {Dimensions} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

import StudentHome from './Student/studentHome';
import StudentDetail from './Student/StudentDetail';
import StudentProfile from './Student/studentProfile';
import Organization from './Student/organizationChart';
import StudentSetting from './Student/setting';
import StudentEdit from './Student/StudentEdit';
import AdminProfile from './Admin/AdminProfile';
import StudentSearch from './Student/StudentSearch';
import drawerMenu from './UI/drawerMenu';

export const sHomeStack = StackNavigator({
    StudentHome:StudentHome,
    StudentDetail:StudentDetail,
},{
    initialRouteName:'StudentHome',
});


export const sProfileStack = StackNavigator({
    StudentProfile:StudentProfile,
    StudentEdit:StudentEdit,
},{
    initialRouteName:'StudentProfile',
});



export const sOrganizationStack = StackNavigator({
    Organization:Organization,
    AdminProfile:AdminProfile,
},{
    initialRouteName:'Organization',
});

export const StudentDrawer=DrawerNavigator({
    StudentHome:StudentHome,
    StudentSearch:StudentSearch,
    sHomeStack:sHomeStack,
    sProfileStack:sProfileStack,
    sOrganizationStack:sOrganizationStack,
    sSetting:StudentSetting,
},{
    contentComponent:drawerMenu,
    drawerWidth:Dimensions.get('window').width-100,
    drawerPosition:'right',
});
/*
export const Drawer = StackNavigator({
    StudentLogin:StudentLogin,
    StudentDrawer:StudentDrawer,
},{
    initialRouteName:StudentLogin,
});*/

export default StudentDrawer;
