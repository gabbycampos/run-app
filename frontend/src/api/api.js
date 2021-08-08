import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class RunAppApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${RunAppApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get current user information. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  // get one run
  static async getRun(id) {
    let res = await this.request(`runs/${id}`);
    return res;
  }
  // get users runs
  static async getRuns() {
    let res = await this.request(`runs/`);
    return res;
  }

  // delete run
  static async deleteRun(id) {
    let res = await this.request(`runs/${id}`, "delete");
    return res;
  }

  // save a run
  static async saveRun(data) {
    let res = await this.request(`timer/}`, data, "post");
    return res;
  }

}


export default RunAppApi;