const botAvatar: string = 'https://i.gifer.com/no.gif';

export const gifsLinks: string[] = [
  'https://media.tenor.com/images/ac287fd06319e47b1533737662d5bfe8/tenor.gif',
  'https://i.gifer.com/no.gif',
  'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
  'http://www.reactiongifs.com/r/wnd1.gif',
];
export const imageLinks: string[] = [
  'https://picsum.photos/320/240/?image=357',
  'https://picsum.photos/320/240/?image=556',
  'https://picsum.photos/320/240/?image=339',
  'https://picsum.photos/320/240/?image=387',
  'https://picsum.photos/320/240/?image=30',
  'https://picsum.photos/320/240/?image=271',
];
const fileLink: string = 'http://google.com';
const homeText = 'Tapez "dme" pour si ça conserne le dossier médical, "login" si ça concerne la connection à votre compte, "compte" pour des informations relatives à votre compte';

export const botReplies = [
  {
    regExp: /([A,a]ide)|([H,h]elp)/g,
    answerArray: ['Salut quel est votre soucis ? ' + homeText, 'Oui ? ' + homeText, 'Je vous écoute... ' + homeText, 'Que puis je faire pour vous ? ' + homeText],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'WAFU',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([D,d]me)|(DME)/g,
    answerArray: ['Vous pouvez accéder au dossier d\'un patient en cliquant sur l\'icone de recherche située dans le coin supérieur droit de l\'application. Ensuite saisissez son téléphone puis tapez sur la touche entrée.'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'WAFU',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([L,l]ogin)|(LOGIN)/g,
    answerArray: ['Vous devez être connecté et avoir les droits necessaires pour accéder aux ressouces. Si vous n\'arrivez pas à vous connecter ou à accéder aux ressources contactez votre administrateur pour avoir les droits necessaires.'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([C,c]ompte)|(COMPTE)/g,
    answerArray: ['Vous pouvez modifier votre compte une fois connecté en cliquant sur votre Prénom affiché en haut à droite de l\'application. Il est conseilé de changer votre mot de passe par défaut lors de votre première connection.'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(.*)/g,
    answerArray: ['Salut! Besoin d\'aide? Tapez "aide" pour commencer', 'Hey! Essayez "aide"', 'Euh! j\'ai pas compris! tapez "aide"'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'WAFU',
        avatar: botAvatar,
      },
    },
  },
];
