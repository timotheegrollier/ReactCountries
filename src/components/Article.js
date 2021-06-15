import React, { useState } from "react";
import axios from "axios";
import DeleteArticle from "./DeleteArticle";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate;
  };

  const data = {
    author: article.author,
    content: editContent ? editContent : article.content,
    date: article.date,
  };

  const handleEdit = () => {
    axios
      .put("https://dbtesttimo.herokuapp.com/articles/" + article.id, data)
      .then(() => {
        setIsEditing(false);
      });
  };

  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editContent ? editContent : article.content}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteArticle id={article.id} />
      </div>
    </div>
  );
};

export default Article;
