async function fetchGraphQL(query) {
    let response = await fetch("https://api.spacex.land/graphql", {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "sec-fetch-mode": "cors"
        },
        body: `{\"query\":${JSON.stringify(query)},\"variables\":null}`,
        method: "POST",
        mode: "cors",
        credentials: "omit"
      });
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    let decoded = await response.json();
    return decoded;
  }
  


const fetchAllApi = async () => {
    let apiLaunchesGql = require("./query.gql");
    let coresGql = require("./cores.gql");
    let queries = [apiLaunchesGql, coresGql];
    return Promise.all(queries.map(fetchGraphQL)).then(values => {
        let launches = values[0].data.launches;
        let cores = values[1].data.cores;
        return {launches, cores};
    });
};

export default fetchAllApi;