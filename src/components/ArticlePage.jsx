import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import articles from '../articles_metadata.json';
import Editor from './Editor/Editor';

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [articleContent, setArticleContent] = useState(null);

  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      fetch(article.content_url)
        .then((res) => res.json())
        .then((data) => setArticleContent(data));
    }
  }, [article]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <Editor
      articleContent={articleContent}
      onBack={() => navigate('/')}
    />
  );
}
