const axios = require("axios");
const regions = require("./configs/Regions");
const RequestConfig = require("./configs/RequestConfig");


class apiService {
  constructor(
    region = regions.Europe,
    user_id,
    access_token,
    entitlements_token
  ) {
    this.region = region;
    this.user_id = user_id;
    this.access_token = access_token;
    this.entitlements_token = entitlements_token;
    this.user_agent = RequestConfig.user_agent;
    this.client_version = RequestConfig.client_version;
    this.client_platform = RequestConfig.client_platform
  }

  getPlayerDataServiceUrl(region) {
    return `https://pd.${region}.a.pvp.net`;
  }

  getPartyServiceUrl(region) {
    return `https://glz-${region}-1.${region}.a.pvp.net`;
  }

  getSharedDataServiceUrl(region) {
    return `https://shared.${region}.a.pvp.net`;
  }

  generateRequestHeaders(extraHeaders = {}) {
    // generate default headers
    const defaultHeaders = {
      Authorization: `Bearer ${this.access_token}`,
      "X-Riot-Entitlements-JWT": this.entitlements_token,
      "X-Riot-ClientVersion": this.client_version,
      "X-Riot-ClientPlatform": Buffer.from(
        JSON.stringify(this.client_platform)
      ).toString("base64"),
    };

    // merge in extra headers
    return {
      ...defaultHeaders,
      ...extraHeaders,
    };
  }

  
  getConfig(region = this.region) {
    return axios.get(
      this.getSharedDataServiceUrl(region) + "/v1/config/" + region
    );
  }

  getContent() {
    return axios.get( 
      this.getSharedDataServiceUrl(this.region) + "/content-service/v2/content",
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getEntitlements(playerId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/store/v1/entitlements/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getMatch(matchId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/match-details/v1/matches/${matchId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getParty(partyId) {
    return axios.get(
      this.getPartyServiceUrl(this.region) + `/parties/v1/parties/${partyId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getPartyByPlayer(playerId) {
    return axios.get(
      this.getPartyServiceUrl(this.region) + `/parties/v1/players/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getCompetitiveLeaderboard(seasonId, startIndex = 0, size = 510) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/mmr/v1/leaderboards/affinity/${this.region}/queue/competitive/season/${seasonId}?startIndex=${startIndex}&size=${size}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getPlayerLoadout(playerId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/personalization/v2/players/${playerId}/playerloadout`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  } 


  // player exp and level

  getPlayerExperience(playerId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) + 
        `/account-xp/v1/players/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  } 

  getPlayerMMR(playerId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) + `/mmr/v1/players/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getPlayerMatchHistory(playerId, startIndex = 0, endIndex = 10) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/match-history/v1/history/${playerId}?startIndex=${startIndex}&endIndex=${endIndex}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getPlayerCompetitiveHistory(playerId, startIndex = 0, endIndex = 10) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/mmr/v1/players/${playerId}/competitiveupdates?startIndex=${startIndex}&endIndex=${endIndex}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getPlayerAccountXp(playerId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/account-xp/v1/players/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getPlayerWallet(playerId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/store/v1/wallet/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getPlayerStoreFront(playerId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/store/v2/storefront/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getStoreOfferPrice(){
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/store/v1/offers/`,
      {
        headers: this.generateRequestHeaders(),
      }
    ); 
  }


  getPlayers(playerId) {
    return axios.put(
      this.getPlayerDataServiceUrl(this.region) + "/name-service/v2/players",
      [
        `${playerId}`
      ],
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getSession(playerId) {
    return axios.get(
      this.getPartyServiceUrl(this.region) + `/session/v1/sessions/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getContractDefinitions() {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        "/contract-definitions/v2/definitions",
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getStoryContractDefinitions() {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        "/contract-definitions/v2/definitions/story",
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getStoreOffers() {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) + `/store/v1/offers`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getContract(playerId) {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/contracts/v1/contracts/${playerId}`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getItemUpgradesV2() {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/contract-definitions/v2/item-upgrades`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }

  getItemUpgradesV3() {
    return axios.get(
      this.getPlayerDataServiceUrl(this.region) +
        `/contract-definitions/v3/item-upgrades`,
      {
        headers: this.generateRequestHeaders(),
      }
    );
  }
}

module.exports = apiService;
