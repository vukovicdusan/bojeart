const categoriesPerAuthorHandler = (cats, author) => {
  return cats && cats.filter((cat) => cat.author === author);
};

export default categoriesPerAuthorHandler;
