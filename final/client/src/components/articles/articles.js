import React from 'react';
import Article from './components/article';

import { Row } from 'antd';

const articles = props => {
  const articles = [...props.articles].map(article => (
    <Article
      key={article.id}
      title={article.title}
      text={article.text}
      icon={article.icon}
    />
  ));

  return (
    <div className="bgcolor1 pt-60 pb-60  cbp-fbscroller" id="cbp-fbscroller">
      <div className="container">
        <Row role="article">{articles}</Row>
      </div>
    </div>
  );
};

export default articles;
