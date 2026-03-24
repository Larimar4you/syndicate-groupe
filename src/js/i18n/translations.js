import { SUPPORTED_LANGUAGE } from './constants.js';

/**
 * Translation dictionary.
 * @type {Readonly<Record<string, Record<string, unknown>>>}
 */
export const TRANSLATIONS = Object.freeze({
  [SUPPORTED_LANGUAGE.EN]: {
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
