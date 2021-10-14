import {apiEndpoint} from "./config"
async function fetchRequest(method, endpoint, body) {
    if(typeof endpoint === "string"){
    try {
      const response = await fetch(`${apiEndpoint}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
         // authorization: `Bearer ${await this.props.authService.getAccessToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);

      //this.setState({ error });
    }
}
  }
  export {fetchRequest};