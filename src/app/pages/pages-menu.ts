import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'ASSISTANCE',
    group: true,
  },
  {
    title: 'Chat',
    icon: 'message-circle-outline',
    link: '/pages/help/chat',
  },
  {
    title: 'A PROPOS',
    group: true,
  },
  {
    title: 'WAFU',
    icon: 'home-outline',
    link: '/pages/wafu',
  },
];

export const MENU_ITEMS_USER: NbMenuItem[] = [
  {
    title: 'Tableau de bord',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  // {
  //   title: 'Dossier',
  //   icon: 'home-outline',
  //   link: '/pages/dossier',
  // },
  {
    title: 'ASSISTANCE',
    group: true,
  },
  {
    title: 'Chat',
    icon: 'message-circle-outline',
    link: '/pages/help/chat',
  },
  // {
  //   title: 'Guide Utilisateur',
  //   icon: 'message-circle-outline',
  //   link: '/pages/help/chat',
  // },
  {
    title: 'A PROPOS',
    group: true,
  },
  {
    title: 'WAFU',
    icon: 'home-outline',
    link: '/pages/wafu',
  },
];

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  {
    title: 'Tableau de bord',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  // {
  //   title: 'Dossier',
  //   icon: 'home-outline',
  //   link: '/pages/dossier',
  // },
  {
    title: 'GESTION',
    group: true,
  },
  {
    title: 'Gérer les utilisateurs',
    icon: 'home-outline',
    link: '/pages/users/inputs',
  },
  {
    title: 'Historiques',
    icon: 'home-outline',
    link: '/pages/historique/inputs',
  },
  {
    title: 'ASSISTANCE',
    group: true,
  },
  {
    title: 'Chat',
    icon: 'message-circle-outline',
    link: '/pages/help/chat',
  },
  // {
  //   title: 'Guide Utilisateur',
  //   icon: 'message-circle-outline',
  //   link: '/pages/help/chat',
  // },
  {
    title: 'A PROPOS',
    group: true,
  },
  {
    title: 'WAFU',
    icon: 'home-outline',
    link: '/pages/wafu',
  },
];
