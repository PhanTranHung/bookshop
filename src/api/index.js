import axios from "axios";

// console.log(process.env)
axios.defaults.baseURL = process.env.REACT_APP_SERVER;
// debugger;
export const getBook = (authorID = [], categoryID = []) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "graphql/api",
      data: {
        operationName: "FindBook",
        query: `query FindBook($authorsID: [ID], $categoriesID: [ID]) {
                  books: allBooks(
                    where: {
                      AND: {
                        author_some: { id_in: $authorsID }
                        category_some: { id_in: $categoriesID }
                      }
                    }
                  ) {
                    id
                    title: name
                    price
                    rate
                    cover: image
                    author{
                      id
                      name
                      penname
                    }
                    category {
                      id
                      name
                      alias
                    }
                  }
                }`,
        variables: {
          authorsID: authorID.length > 0 ? authorID : undefined,
          categoriesID: categoryID.length > 0 ? categoryID : undefined,
        },
      },
    })
      .then((res) => resolve(res.data.data.books))
      .catch((error) => reject(error));
  });
};

export const findBookByKeyword = (keyword) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "graphql/api",
      data: {
        operationName: "findBookByKeyword",
        query: `query findBookByKeyword($keyword: String) {
                  books: allBooks(where: { name_contains: $keyword }) {
                    title: name
                    id
                    rate
                    price
                    category{
                      id
                      name
                      alias
                    }
                    author{
                      id
                      name
                      penname
                    }
                    cover: image
                  }
                  authors: allAuthors(
                    where: { OR: { name_contains: $keyword, penname_contains: $keyword } }
                    first: 4
                  ) {
                    id
                    name
                    penname
                    cover
                  }
                }`,
        variables: {keyword},
      },
    })
      .then((res) => resolve(res.data.data))
      .catch((error) => reject(error));
  });
};

export const getCategory = (prams) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "graphql/api",
      data: {
        operationName: "Category",
        query: `query Category {
                  categories: allCategories {
                    value: id
                    label: name
                    alias
                  }
                }`,
        variables: {},
      },
    })
      .then((res) => resolve(res.data.data.categories))
      .catch((error) => reject(error));
  });
};

export const getAuthor = (prams) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "graphql/api",
      data: {
        operationName: "GetAuthors",
        query: `query GetAuthors {
                  authors: allAuthors {
                    label: name
                    value: id
                    id
                    name
                    penname
                    cover
                  }
                }`,
        variables: {},
      },
    })
      .then((res) => resolve(res.data.data.authors))
      .catch((error) => reject(error));
  });
};
export const getFamousAuthor = getAuthor;
