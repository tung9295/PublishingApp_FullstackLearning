var configMongoose = require('./configMongoose');
var sessionRoutes = require('./routesSession');
const Article = configMongoose.Article;

const PublishingAppRoutes = [
  ...sessionRoutes,
  {
    route: 'articles.length',
    get: () => {
      const articlesCountInDB = 2;
      return {
        path: ['articles', 'length'],
        value: articlesCountInDB
      };
    }
  },
  {
    route: 'articles[{integers}]["id","articleTitle","articleContent"]',
    get: (pathSet) => {
      const articlesIndex = pathSet[1];
      const articlesArrayFromDB = [
        {
        'articleId': '987654',
        'articleTitle': 'BACKEND Lorem ipsum - article one',
        'articleContent': 'BACKEND Here goes the content of the article'
        },
        {
        'articleId': '123456',
        'articleTitle': 'BACKEND Lorem ipsum - article two',
        'articleContent': 'BACKEND Sky is the limit, the content goes here.'
        }
      ]; // That are our mocked articles from MongoDB
      let results = [];
      articlesIndex.forEach((index) => {
        const singleArticleObject = articlesArrayFromDB[index];
        const falcorSingleArticleResult = {
          path: ['articles', index],
          value: singleArticleObject
        };
        results.push(falcorSingleArticleResult);
      });
      return results;
    }
  }
];

// export default PublishingAppRoutes;
module.exports = PublishingAppRoutes;