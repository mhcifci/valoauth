const axios = require("axios");
const regions = require("./configs/Regions");
const RequestConfig = require("./configs/RequestConfig");
const { Agent } = require("https");

const agent = new Agent({
  ciphers: [
    "TLS_CHACHA20_POLY1305_SHA256",
    "TLS_AES_128_GCM_SHA256",
    "TLS_AES_256_GCM_SHA384",
    "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
  ].join(":"),
  honorCipherOrder: true,
  minVersion: "TLSv1.2",
});

const parseTokensFromUrl = (uri) => {
  let url = new URL(uri);
  let params = new URLSearchParams(url.hash.substring(1));
  return {
    access_token: params.get("access_token"),
    id_token: params.get("id_token"),
  };
};

class authService {
  constructor() {
    this.user_agent = RequestConfig.user_agent;
    this.client_version = RequestConfig.client_version;
    this.client_platform = RequestConfig.client_platform;
  }

  async authorize(username, password) {
    // fetch session cookie
    const cookie = (
      await axios.post(
        "https://auth.riotgames.com/api/v1/authorization",
        {
          client_id: "play-valorant-web-prod",
          nonce: 1,
          redirect_uri: "https://playvalorant.com/opt_in",
          response_type: "token id_token",
          scope: "account openid",
        },
        {
          headers: {
            "User-Agent": this.user_agent,
          },
          httpsAgent: agent,
        }
      )
    ).headers["set-cookie"].find((elem) => /^asid/.test(elem));

    // fetch auth tokens
    var access_tokens = await axios.put(
      "https://auth.riotgames.com/api/v1/authorization",
      {
        type: "auth",
        username: username,
        password: password,
      },
      {
        headers: {
          Cookie: cookie,
          "User-Agent": this.user_agent,
        },
        httpsAgent: agent,
      }
    );

    // throw exception for auth_failure
    if (access_tokens.data?.error === "auth_failure") {
      throw new Error("auth_failure: username or password is incorrect.");
    }

    if (access_tokens.data?.error === "rate_limited") {
      throw new Error("rate_limited: please try again later.");
    }

    // update access token
    var tokens = parseTokensFromUrl(access_tokens.data.response.parameters.uri);
    const access_token = tokens.access_token;

    // fetch entitlements token
    const entitlements_token = (
      await axios.post(
        "https://entitlements.auth.riotgames.com/api/token/v1",
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      )
    ).data.entitlements_token;

    // update user_id from access_token
    const user_id = JSON.parse(
      Buffer.from(tokens.access_token.split(".")[1], "base64").toString()
    ).sub;

    return {
      access_token: access_token,
      entitlements_token: entitlements_token,
      user_id: user_id,
    };
  }
}
module.exports = authService;
