import axios from "axios";

export const getBook = (prams) => {
  return new Promise((reslove, reject) => {
    return axios({
      method: "GET",
      url: "graphql/api",
      data: {
        operationName: "fetchAllBook",
        query: `query fetchAllBook {
                    books: allBooks {
                    title: name
                    rate
                    price
                    url: image
                    }
                }`,
        variables: {},
      },
    });
  });
};
