import { SUPPORTED_LANGUAGE } from './constants.js';

/**
 * Translation dictionary.
 * @type {Readonly<Record<string, Record<string, unknown>>>}
 */
export const TRANSLATIONS = Object.freeze({
  [SUPPORTED_LANGUAGE.EN]: {
    header: {
      navigation: {
        label: 'Primary navigation',
        about: 'About us',
        lessons: 'Our lessons',
        teachers: 'Teachers',
        reviews: 'Reviews',
        contact: 'Contact us',
      },
      mobileNavigation: {
        label: 'Mobile navigation',
      },
      menu: {
        open: 'Open menu',
        close: 'Close menu',
      },
      language: {
        switcherLabel: 'Language switcher',
        selectEn: 'Switch to English',
        selectUa: 'Switch to Ukrainian',
        en: 'EN',
        ua: 'UA',
      },
    },
    hero: {
      title: {
        before: 'Discover the joy of learning',
        marker: 'English',
        after: 'with us!',
      },
      actions: {
        apply: 'Leave an application',
        scrollDown: 'Scroll down',
      },
    },
    proposal: {
      hiddenTitle: 'Proposal to leave an application',
      text: {
        before: 'Master the',
        marker: 'Language',
        after: 'with Our English Package!',
      },
      card: {
        title: 'Power of English',
        action: 'Leave an application',
        imageAlt: 'Stack of colorful 3D rendered books',
        features: {
          first:
            'Dive into captivating lessons designed to stimulate your curiosity.',
          second:
            "Learn in a nurturing setting where every student's progress matters.",
          third:
            'Experience the satisfaction of real progress as your language skills and confidence grow with every session.',
        },
      },
    },
    about: {
      title: {
        before: 'About',
        marker: 'Us',
      },
      subtitle:
        'We are dedicated to providing engaging and effective English language courses in a supportive and stimulating learning environment',
      items: {
        first: 'Expert, innovative teaching staff',
        second: 'Wide range of course levels and options',
        third: 'Multicultural learning environment',
        fourth: 'Comprehensive language support services',
      },
      imageAlt: 'English learning memoji',
    },
    lessons: {
      title: {
        before: 'Our',
        marker: 'lessons',
      },
      description:
        'Our lessons are carefully structured and interactive, designed to promote rapid language acquisition through practical tasks and real-world scenarios',
      cards: {
        practice: {
          name: 'Practice',
          price: '40$',
          period: '/ month',
          description:
            'This plan offers an opportunity for learners to engage in collaborative language exercises and group activities, boosting their conversational skills and confidence in using English.',
        },
        standard: {
          name: 'Standard',
          price: '70$',
          period: '/ month',
          description:
            'Our standard package provides a balanced learning approach that covers all key areas of English language — reading, writing, listening, and speaking. It is a set of basic knowledge and skills.',
        },
        individual: {
          name: 'Individual',
          price: '99$',
          period: '/ month',
          description:
            "We offer a tailored learning experience with individualized instruction that focuses on a learner's specific language goals and challenges, offering personal feedback.",
        },
      },
      button: 'Leave an application',
    },
    teachers: {
      title: {
        before: 'Meet our',
        marker: 'teachers',
      },
      description:
        'Discover our team of dedicated educators, committed to guiding you on your journey to English proficiency with personalized and engaging instruction',
      cards: {
        maria: {
          name: 'Maria',
          avatarAlt: 'Avatar of Maria',
          description:
            'A seasoned linguist and our primary specialist in beginner-level instruction, Maria brings warmth and patience to every class',
        },
        artem: {
          name: 'Artem',
          avatarAlt: 'Avatar of Artem',
          description:
            'With his innovative teaching techniques and a focus on interactive learning, Artem excels in keeping students engaged and motivated',
        },
        ilona: {
          name: 'Ilona',
          avatarAlt: 'Avatar of Ilona',
          description:
            'A specialist in advanced English, Ilona provides intensive instruction, ensuring students gain confidence in complex language tasks',
        },
        volodymyr: {
          name: 'Volodymyr',
          avatarAlt: 'Avatar of Volodymyr',
          description:
            'Our expert in English for specific purposes, Volodymyr tailors his approach to meet individual career and industry-specific language needs',
        },
      },
    },
    application: {
      title: {
        before: 'Leave an',
        marker: 'application',
      },
      subtitle:
        "Please use the form below to contact us. Enter your name, email, and message and we'll get back to you shortly.",
      imageAlt: 'Girl studying online',
      stats: {
        text: 'of our online English language lessons! This journey has been full of discovery, growth and unforgettable moments, and we are happy to share this joyful event with you.',
      },
      form: {
        placeholders: {
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          comment: 'Comment',
        },
        teacherLegend: 'Choose a teacher',
        teacherNames: {
          maria: 'Maria',
          artem: 'Artem',
          ilona: 'Ilona',
          volodymyr: 'Volodymyr',
        },
        submit: 'Send',
        privacy: {
          before: 'By clicking on "Send" button, you agree to our',
          link: 'Privacy Policy',
          after:
            'and allow Promodo to use this information for marketing purposes.',
        },
      },
    },
    reviews: {
      title: {
        before: 'What our',
        marker: 'students',
        after: 'say',
      },
      description:
        'Hear from our students about their learning journey with us, as they share their experiences, progress, and the transformative impact.',
      role: {
        student: 'Student',
      },
      names: {
        anna: 'Anna',
        mykhailo: 'Mykhailo',
        victoria: 'Victoria',
      },
      navigation: {
        previous: 'Previous review',
        next: 'Next review',
        pagination: 'Reviews pagination',
      },
      items: {
        anna: 'My experience at the language school has been nothing short of amazing. The teachers are dedicated and the learning environment is stimulating. I feel more confident in my English skills.',
        mykhailo:
          'The school offers a great balance of language theory and practical exercises. The personalized feedback from the teachers has helped me improve my weak areas.',
        victoria:
          "I love the dynamic and interactive teaching methods used here. It's a great place to learn English in a fun and effective way. I have definitely seen a big improvement in my language skills.",
      },
    },
  },
  [SUPPORTED_LANGUAGE.UA]: {
    header: {
      navigation: {
        label: 'Основна навігація',
        about: 'Про нас',
        lessons: 'Наші уроки',
        teachers: 'Викладачі',
        reviews: 'Відгуки',
        contact: 'Контакти',
      },
      mobileNavigation: {
        label: 'Мобільна навігація',
      },
      menu: {
        open: 'Відкрити меню',
        close: 'Закрити меню',
      },
      language: {
        switcherLabel: 'Перемикач мови',
        selectEn: 'Перемкнути на англійську',
        selectUa: 'Перемкнути на українську',
        en: 'EN',
        ua: 'UA',
      },
    },
    hero: {
      title: {
        before: 'Відкрийте радість вивчення',
        marker: 'англійської',
        after: 'разом з нами!',
      },
      actions: {
        apply: 'Залишити заявку',
        scrollDown: 'Прокрутити вниз',
      },
    },
    proposal: {
      hiddenTitle: 'Пропозиція залишити заявку',
      text: {
        before: 'Опануйте',
        marker: 'мову',
        after: 'з нашим пакетом англійської!',
      },
      card: {
        title: 'Сила англійської',
        action: 'Залишити заявку',
        imageAlt: 'Стос кольорових 3D-книг',
        features: {
          first: 'Пориньте в захопливі уроки, що пробуджують цікавість.',
          second:
            'Навчайтеся в підтримувальному середовищі, де важливий прогрес кожного студента.',
          third:
            'Відчуйте справжнє задоволення від прогресу, коли мовні навички та впевненість зростають із кожним заняттям.',
        },
      },
    },
    about: {
      title: {
        before: 'Про',
        marker: 'нас',
      },
      subtitle:
        'Ми прагнемо надавати захопливі та ефективні курси англійської мови в підтримувальному й стимулювальному навчальному середовищі.',
      items: {
        first: 'Експертний та інноваційний викладацький склад',
        second: 'Широкий вибір рівнів і форматів навчання',
        third: 'Мультикультурне навчальне середовище',
        fourth: 'Комплексна підтримка у вивченні мови',
      },
      imageAlt: 'Мемоджі про вивчення англійської',
    },
    lessons: {
      title: {
        before: 'Наші',
        marker: 'уроки',
      },
      description:
        'Наші уроки ретельно структуровані та інтерактивні — вони створені для швидкого засвоєння мови через практичні завдання та реальні ситуації.',
      cards: {
        practice: {
          name: 'Практика',
          price: '40$',
          period: '/ місяць',
          description:
            'Цей план дає можливість навчатись у групі: виконувати спільні мовні вправи та активності, які розвивають розмовні навички та впевненість у використанні англійської.',
        },
        standard: {
          name: 'Стандарт',
          price: '70$',
          period: '/ місяць',
          description:
            'Стандартний пакет забезпечує збалансований підхід до навчання, охоплюючи всі ключові аспекти англійської: читання, письмо, аудіювання та говоріння. Це база знань і навичок.',
        },
        individual: {
          name: 'Індивідуальний',
          price: '99$',
          period: '/ місяць',
          description:
            'Ми пропонуємо персоналізоване навчання з індивідуальними заняттями, які зосереджені на конкретних мовних цілях і труднощах студента з особистим зворотним звʼязком.',
        },
      },
      button: 'Залишити заявку',
    },
    teachers: {
      title: {
        before: 'Познайомтеся з нашими',
        marker: 'викладачами',
      },
      description:
        'Познайомтеся з командою відданих викладачів, які супроводжують вас на шляху до впевненого володіння англійською через персоналізоване та захопливе навчання.',
      cards: {
        maria: {
          name: 'Марія',
          avatarAlt: 'Аватар Марії',
          description:
            'Досвідчена лінгвістка та головна спеціалістка з навчання початківців, Марія додає кожному заняттю тепла й терпіння.',
        },
        artem: {
          name: 'Артем',
          avatarAlt: 'Аватар Артема',
          description:
            'Завдяки інноваційним методикам і фокусу на інтерактиві Артем уміє підтримувати високу залученість і мотивацію студентів.',
        },
        ilona: {
          name: 'Ілона',
          avatarAlt: 'Аватар Ілони',
          description:
            'Фахівчиня з просунутого рівня англійської, Ілона проводить інтенсивне навчання, яке допомагає впевнено працювати зі складними мовними завданнями.',
        },
        volodymyr: {
          name: 'Володимир',
          avatarAlt: 'Аватар Володимира',
          description:
            'Експерт з англійської для спеціальних цілей, Володимир адаптує підхід під карʼєрні та галузеві потреби кожного студента.',
        },
      },
    },
    application: {
      title: {
        before: 'Залиште',
        marker: 'заявку',
      },
      subtitle:
        'Скористайтеся формою нижче, щоб звʼязатися з нами. Вкажіть імʼя, email і повідомлення, і ми невдовзі відповімо.',
      imageAlt: 'Дівчина навчається онлайн',
      stats: {
        text: 'наших онлайн-уроків англійської! Цей шлях був сповнений відкриттів, зростання та незабутніх моментів, і ми раді ділитися цією подією з вами.',
      },
      form: {
        placeholders: {
          name: 'Імʼя',
          email: 'Email',
          phone: 'Телефон',
          comment: 'Коментар',
        },
        teacherLegend: 'Оберіть викладача',
        teacherNames: {
          maria: 'Марія',
          artem: 'Артем',
          ilona: 'Ілона',
          volodymyr: 'Володимир',
        },
        submit: 'Надіслати',
        privacy: {
          before: 'Натискаючи кнопку "Надіслати", ви погоджуєтеся з нашою',
          link: 'Політикою конфіденційності',
          after:
            'та дозволяєте Promodo використовувати цю інформацію в маркетингових цілях.',
        },
      },
    },
    reviews: {
      title: {
        before: 'Що кажуть наші',
        marker: 'студенти',
        after: '',
      },
      description:
        'Дізнайтесь, як проходить навчальний шлях наших студентів: їхній досвід, прогрес і результати, які справді змінюють рівень англійської.',
      role: {
        student: 'Студент',
      },
      names: {
        anna: 'Анна',
        mykhailo: 'Михайло',
        victoria: 'Вікторія',
      },
      navigation: {
        previous: 'Попередній відгук',
        next: 'Наступний відгук',
        pagination: 'Пагінація відгуків',
      },
      items: {
        anna: 'Мій досвід у мовній школі був справді чудовим. Викладачі віддані своїй справі, а навчальне середовище мотивує. Я відчуваю значно більшу впевненість у своїй англійській.',
        mykhailo:
          'Школа дає відмінний баланс між теорією мови та практичними вправами. Персональний фідбек від викладачів допоміг мені суттєво підтягнути слабкі місця.',
        victoria:
          'Мені подобаються динамічні й інтерактивні методи викладання. Це чудове місце, щоб вивчати англійську легко та ефективно. Я точно бачу великий прогрес у своїх мовних навичках.',
      },
    },
  },
});
