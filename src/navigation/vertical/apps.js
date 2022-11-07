import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User } from 'react-feather'

export default [
  {
    header: 'Apps & Pages'
  },
  {
    id: 'email',
    title: 'Comptes',
    icon: <Mail size={20} />,
    navLink: '/accounts/list'
  },
  {
    id: 'emailStandard',
    title: 'Comptes standards',
    icon: <Mail size={20} />,
    navLink: '/standard-accounts/list'
  },
  {
    id: 'emailPhysic',
    title: 'Trésorerie physique',
    icon: <Mail size={20} />,
    navLink: '/physical-treasury-accounts/list'
  },

  {
    id: 'logicalAccounts',
    title: 'Trésorerie logique',
    icon: <Mail size={20} />,
    navLink: '/logical-treasury-accounts/list'
  },
  
  {
    id: 'chat',
    title: 'Budgets',
    icon: <MessageSquare size={20} />,
    navLink: '/budgets/list'
  },
  {
    id: 'currency',
    title: 'Devises',
    icon: <CheckSquare size={20} />,
    navLink: '/currencies/list'
  },
  {
    id: 'exploitation',
    title: 'Exploitations',
    icon: <ShoppingCart size={20} />,
    navLink: '/exploitations/list'
  },
  {
    id: 'operation',
    title: 'Opérations',
    icon: <Circle size={20} />,
    children: [
      {
        id: 'operationList',
        title: 'Liste',
        icon: <Circle size={12} />,
        navLink: '/operations/list'
      },
      {
        id: 'operationCalendar',
        title: 'Calendrier',
        icon: <Circle size={12} />,
        navLink: '/operations/calendar'
      }
    ]
    //navLink: '/operations/list'
  }
  //begin comment
  /* {
    id: 'calendar',
    title: 'Calendar',
    icon: <Calendar size={20} />,
    navLink: '/apps/calendar'
  },
  {
    id: 'invoiceApp',
    title: 'Invoice',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'invoiceList',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/list'
      },
      {
        id: 'invoicePreview',
        title: 'Preview',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/preview'
      },
      {
        id: 'invoiceEdit',
        title: 'Edit',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/edit'
      },
      {
        id: 'invoiceAdd',
        title: 'Add',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/add'
      }
    ]
  },
  {
    id: 'eCommerce',
    title: 'eCommerce',
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: 'shop',
        title: 'Shop',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/shop'
      },
      {
        id: 'detail',
        title: 'Details',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/product-detail'
      },
      {
        id: 'wishList',
        title: 'Wish List',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/wishlist'
      },
      {
        id: 'checkout',
        title: 'Checkout',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/checkout'
      }
    ]
  },
  {
    id: 'users',
    title: 'User',
    icon: <User size={20} />,
    children: [
      {
        id: 'list',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/apps/user/list'
      },
      {
        id: 'view',
        title: 'View',
        icon: <Circle size={12} />,
        navLink: '/apps/user/view'
      },
      {
        id: 'edit',
        title: 'Edit',
        icon: <Circle size={12} />,
        navLink: '/apps/user/edit'
      }
    ] 
  } */
  //end comment
]
