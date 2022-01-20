import Management from '../pages/Management';

const privateRoutes = [
  {
    path: '/management',
    component: Management,
    exact: true,
    role: 'user',
    backUrl: '/login'
  },
];

export default privateRoutes;