import Management from '../pages/Management';

const privateRoutes = [
  {
    path: '/backend',
    component: Management,
    exact: true,
    role: 'user',
    backUrl: '/login'
  },
];

export default privateRoutes;