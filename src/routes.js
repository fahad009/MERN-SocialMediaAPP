import React from 'react';

const Toaster = React.lazy(() => import(`./views/notifications/toaster/Toaster`));
const Stories = React.lazy(() => import(`./views/base/Stories`));
const AddStory = React.lazy(() => import(`./views/base/AddStory`));
const AddSeason = React.lazy(() => import(`./views/base/AddSeason`));
const AddEpisode = React.lazy(() => import(`./views/base/AddEpisode`));
const EditStory = React.lazy(() => import(`./views/base/EditStory`));
const EditEpisode = React.lazy(() => import(`./views/base/EditEpisode`));
const GenericAssets = React.lazy(() => import(`./views/base/GenericAssets`));
const EditScenes = React.lazy(() => import(`./views/base/EditScenes`));
const PushNotifications = React.lazy(() => import(`./views/pages/utils/PushNotifications`));
const GenrePicker = React.lazy(() => import(`./views/pages/utils/GenrePicker`));

const Breadcrumbs = React.lazy(() => import(`./views/base/breadcrumbs/Breadcrumbs`));
const Cards = React.lazy(() => import(`./views/base/cards/Cards`));
const Carousels = React.lazy(() => import(`./views/base/carousels/Carousels`));
const Collapses = React.lazy(() => import(`./views/base/collapses/Collapses`));


const Jumbotrons = React.lazy(() => import(`./views/base/jumbotrons/Jumbotrons`));
const ListGroups = React.lazy(() => import(`./views/base/list-groups/ListGroups`));
const Navbars = React.lazy(() => import(`./views/base/navbars/Navbars`));
const Navs = React.lazy(() => import(`./views/base/navs/Navs`));
const Paginations = React.lazy(() => import(`./views/base/paginations/Pagnations`));
const Popovers = React.lazy(() => import(`./views/base/popovers/Popovers`));
const ProgressBar = React.lazy(() => import(`./views/base/progress-bar/ProgressBar`));
const Switches = React.lazy(() => import(`./views/base/switches/Switches`));

const Tabs = React.lazy(() => import(`./views/base/tabs/Tabs`));
const Tooltips = React.lazy(() => import(`./views/base/tooltips/Tooltips`));
const BrandButtons = React.lazy(() => import(`./views/buttons/brand-buttons/BrandButtons`));
const ButtonDropdowns = React.lazy(() => import(`./views/buttons/button-dropdowns/ButtonDropdowns`));
const ButtonGroups = React.lazy(() => import(`./views/buttons/button-groups/ButtonGroups`));
const Buttons = React.lazy(() => import(`./views/buttons/buttons/Buttons`));
const Charts = React.lazy(() => import(`./views/charts/Charts`));
const Dashboard = React.lazy(() => import(`./views/dashboard/Dashboard`));
const CoreUIIcons = React.lazy(() => import(`./views/icons/coreui-icons/CoreUIIcons`));
const Flags = React.lazy(() => import(`./views/icons/flags/Flags`));
const Brands = React.lazy(() => import(`./views/icons/brands/Brands`));
const Alerts = React.lazy(() => import(`./views/notifications/alerts/Alerts`));
const Badges = React.lazy(() => import(`./views/notifications/badges/Badges`));
const Modals = React.lazy(() => import(`./views/notifications/modals/Modals`));
const Colors = React.lazy(() => import(`./views/theme/colors/Colors`));
const Typography = React.lazy(() => import(`./views/theme/typography/Typography`));
const Widgets = React.lazy(() => import(`./views/widgets/Widgets`));
const Users = React.lazy(() => import(`./views/users/Users`));
const User = React.lazy(() => import(`./views/users/User`));
const Admin_Profile = React.lazy(() => import(`./views/users/Admin_Profile`));
const Payments = React.lazy(() => import(`./views/users/Payments`));
const CreatorPayments = React.lazy(() => import(`./views/logs/CreatorPayments`));
const Creator_Profile = React.lazy(() => import(`./views/users/Creator_Profile`));
const InAppPurchases = React.lazy(() => import(`./views/logs/InAppPurchases`));
const Creator_InAppPurchases = React.lazy(() => import(`./views/logs/Creator_InAppPurchases`));
const Creator_Payments = React.lazy(() => import(`./views/logs/Creator_Payments`));
const UserLanding = React.lazy(() => import(`./views/UserLanding`));
const AccountLinkRefresh = React.lazy(() => import(`./views/users/AccountLinkRefresh`));

const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/dashboard', exact: true, name: 'Dashboard', component: Stories, allowed: ['admin_dicota']},
    {path: '/add-story', exact: true, name: 'Add Story', component: AddStory, allowed: ['admin_dicota', 'creator']},
    {path: '/add-season', exact: true, name: 'Add Season', component: AddSeason, allowed: ['admin_dicota', 'creator']},
    {
        path: '/add-episode',
        exact: true,
        name: 'Add Episode',
        component: AddEpisode,
        allowed: ['admin_dicota', 'creator']
    },
    {path: '/edit-story', exact: true, name: 'Edit Book', component: EditStory, allowed: ['admin_dicota', 'creator']},
    {
        path: '/edit-episode',
        exact: true,
        name: 'Edit Episode',
        component: EditEpisode,
        allowed: ['admin_dicota', 'creator']
    },
    {path: '/profile', exact: true, name: 'Users', component: Admin_Profile, allowed: ['admin_dicota']},
    {path: '/creator-requests', exact: true, name: 'Creator Requests', component: Users, allowed: ['admin_dicota']},
    {path: '/payments', exact: true, name: 'Payments', component: Payments, allowed: ['admin_dicota']},
    {path: '/generic-assets', exact: true, name: 'Generic Assets', component: GenericAssets, allowed: ['admin_dicota']},
    {path: '/edit-scenes', exact: true, name: 'Edit Scenes', component: EditScenes, allowed: ['admin_dicota']},
    {
        path: '/logs/in-app-purchases',
        exact: true,
        name: 'In App Purchases - Logs',
        component: InAppPurchases,
        allowed: ['admin_dicota']
    },
    {
        path: '/logs/creator-payments',
        exact: true,
        name: 'Creator Payments - Log',
        component: CreatorPayments,
        allowed: ['admin_dicota']
    },
    {
        path: '/utils/push-notifications',
        exact: true,
        name: 'Utilities - Push Notifications',
        component: PushNotifications,
        allowed: ['admin_dicota']
    },
    {
        path: '/utils/genre-picker-ab',
        exact: true,
        name: 'Utilities - Genre Picker',
        component: GenrePicker,
        allowed: ['admin_dicota']
    },
    // { path: '/theme', name: 'Theme', component: Colors, exact: true }, // -------------------
    // { path: '/theme/colors', name: 'Colors', component: Colors },
    // { path: '/theme/typography', name: 'Typography', component: Typography },
    // { path: '/base', name: 'Base', component: Cards, exact: true },
    // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
    // { path: '/base/cards', name: 'Cards', component: Cards },
    // { path: '/base/carousels', name: 'Carousel', component: Carousels },
    // { path: '/base/collapses', name: 'Collapse', component: Collapses },
    // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
    // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
    // { path: '/base/navbars', name: 'Navbars', component: Navbars },
    // { path: '/base/navs', name: 'Navs', component: Navs },
    // { path: '/base/paginations', name: 'Paginations', component: Paginations },
    // { path: '/base/popovers', name: 'Popovers', component: Popovers },
    // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
    // { path: '/base/switches', name: 'Switches', component: Switches },
    // { path: '/base/tabs', name: 'Tabs', component: Tabs },
    // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
    // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
    // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
    // { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
    // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
    // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
    // { path: '/charts', name: 'Charts', component: Charts },
    { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons, allowed: ['creator'] },
    {path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons, allowed: ['creator']},
    // {path: '/icons/flags', name: 'Flags', component: Flags},
    // {path: '/icons/brands', name: 'Brands', component: Brands},
    // {path: '/notifications', name: 'Notifications', component: Alerts, exact: true},
    // {path: '/notifications/alerts', name: 'Alerts', component: Alerts},
    // {path: '/notifications/badges', name: 'Badges', component: Badges},
    // {path: '/notifications/modals', name: 'Modals', component: Modals},
    // {path: '/notifications/toaster', name: 'Toaster', component: Toaster},
    // {path: '/widgets', name: 'Widgets', component: Widgets}, // ---------------------
    // {path: '/users/:id', exact: true, name: 'User Details', component: User},
    {path: '/creator/dashboard', exact: true, name: 'Dashboard', component: Stories, allowed: ['creator']},
    {
        path: '/creator/profile',
        exact: true,
        name: 'My Profile',
        component: Creator_Profile,
        allowed: ['creator']
    },
    {
        path: '/creator/logs/in-app-purchases',
        exact: true,
        name: 'In App Purchases - Logs',
        component: Creator_InAppPurchases,
        allowed: ['creator']
    },
    {
        path: '/creator/logs/payments',
        exact: true,
        name: 'Payments - Log',
        component: Creator_Payments,
        allowed: ['creator']
    },
    {
        path: '/user-landing',
        exact: true,
        name: 'Welcome - Litty',
        component: UserLanding,
        allowed: ['user']
    }
];

export default routes;
