import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email'))
  },
  {
    path: '/apps/email/:folder',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/label/:label',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/:filter',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/chat',
    appLayout: true,
    className: 'chat-application',
    component: lazy(() => import('../../views/apps/chat'))
  },
  {
    path: '/apps/todo',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo'))
  },
  {
    path: '/apps/todo/:filter',
    appLayout: true,
    exact: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/todo/tag/:tag',
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/calendar',
    component: lazy(() => import('../../views/apps/calendar'))
  },
  {
    path: '/apps/invoice/list',
    component: lazy(() => import('../../views/apps/invoice/list'))
  },
  {
    path: '/apps/invoice/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/invoice/preview'
    }
  },
  {
    path: '/apps/invoice/preview',
    exact: true,
    component: () => <Redirect to='/apps/invoice/preview/4987' />
  },
  {
    path: '/apps/invoice/edit/:id',
    component: lazy(() => import('../../views/apps/invoice/edit')),
    meta: {
      navLink: '/apps/invoice/edit'
    }
  },
  {
    path: '/apps/invoice/edit',
    exact: true,
    component: () => <Redirect to='/apps/invoice/edit/4987' />
  },
  {
    path: '/apps/invoice/add',
    component: lazy(() => import('../../views/apps/invoice/add'))
  },
  {
    path: '/apps/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/apps/invoice/print'))
  },
  {
    path: '/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/shop'))
  },
  {
    path: '/apps/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  },
  {
    path: '/apps/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/apps/ecommerce/product-detail'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/checkout'))
  },
  {
    path: '/apps/user/list',
    component: lazy(() => import('../../views/apps/user/list'))
  },
  {
    path: '/apps/user/edit',
    exact: true,
    component: () => <Redirect to='/apps/user/edit/1' />
  },
  {
    path: '/apps/user/edit/:id',
    component: lazy(() => import('../../views/apps/user/edit')),
    meta: {
      navLink: '/apps/user/edit'
    }
  },
  {
    path: '/apps/user/view',
    exact: true,
    component: () => <Redirect to='/apps/user/view/1' />
  },
  {
    path: '/apps/user/view/:id',
    component: lazy(() => import('../../views/apps/user/view')),
    meta: {
      navLink: '/apps/user/view'
    }
  },

 /*  {
    path: '/apps/user/list',
    component: lazy(() => import('../../views/apps/user/list'))
  } */

  //raoul's routes
  //accounts
  {
    path: '/accounts/list',
    component: lazy(() => import('../../views_fp/accounts/list'))
  },
  {
    path: '/account/edit',
    exact: true,
    component: () => <Redirect to='accounts/edit/1' />
  },
  {
    path: '/account/edit/:id',
    component: lazy(() => import('../../views_fp/accounts/edit')),
    meta: {
      navLink: 'account/edit'
    }
  },
  {
    path: '/account/view',
    exact: true,
    component: () => <Redirect to='account/view/1' />
  },
  {
    path: '/apps/account/view/:id',
    component: lazy(() => import('../../views_fp/accounts/view')),
    meta: {
      navLink: '/apps/account/view'
    }
  },

  //budgets
  {
    path: '/budgets/list',
    component: lazy(() => import('../../views_fp/budgets/list'))
  },
  {
    path: '/budget/edit',
    exact: true,
    component: () => <Redirect to='/budgets/edit/1' />
  },
  {
    path: '/budget/edit/:id',
    component: lazy(() => import('../../views_fp/budgets/edit')),
    meta: {
      navLink: '/budget/edit'
    }
  },
  {
    path: '/budget/view',
    exact: true,
    component: () => <Redirect to='/budget/view/1' />
  },
  {
    path: '/budget/view/:id',
    component: lazy(() => import('../../views_fp/budgets/view')),
    meta: {
      navLink: '/budget/view'
    }
  },

  //exploitation
  {
    path: '/exploitations/list',
    component: lazy(() => import('../../views_fp/exploitations/list'))
  },
  {
    path: '/exploitation/edit',
    exact: true,
    component: () => <Redirect to='/exploitations/edit/1' />
  },
  {
    path: '/exploitation/edit/:id',
    component: lazy(() => import('../../views_fp/exploitations/edit')),
    meta: {
      navLink: '/exploitation/edit'
    }
  },
  {
    path: '/exploitation/view',
    exact: true,
    component: () => <Redirect to='/exploitation/view/1' />
  },
  {
    path: '/exploitation/view/:id',
    component: lazy(() => import('../../views_fp/exploitations/view')),
    meta: {
      navLink: '/exploitation/view'
    }
  },

   //operation
   {
    path: '/operations/list',
    component: lazy(() => import('../../views_fp/operations/list'))
  },
  {
    path: '/operation/edit',
    exact: true,
    component: () => <Redirect to='/operations/edit/1' />
  },
  {
    path: '/operation/edit/:id',
    component: lazy(() => import('../../views_fp/operations/edit')),
    meta: {
      navLink: '/operation/edit'
    }
  },
  {
    path: '/operation/view',
    exact: true,
    component: () => <Redirect to='/operation/view/1' />
  },
  {
    path: '/operation/view/:id',
    component: lazy(() => import('../../views_fp/operations/view')),
    meta: {
      navLink: '/operation/view'
    }
  },

  //currencies
  {
    path: '/currencies/list',
    component: lazy(() => import('../../views_fp/currencies/list'))
  }
  /* {
    path: '/currency/edit',
    exact: true,
    component: () => <Redirect to='/currencies/edit/1' />
  },
  {
    path: '/currency/edit/:id',
    component: lazy(() => import('../../views_fp/currencies/edit')),
    meta: {
      navLink: '/currency/edit'
    }
  },
  {
    path: '/currency/view',
    exact: true,
    component: () => <Redirect to='/currency/view/1' />
  },
  {
    path: '/currency/view/:id',
    component: lazy(() => import('../../views_fp/currencies/view')),
    meta: {
      navLink: '/currency/view'
    }
  } */

  
]

export default AppRoutes
