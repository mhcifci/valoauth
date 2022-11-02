const axios = require('axios').default;

class ValorantChecker {
    constructor(user_id, access_token, entitlements_token, national = "EU") {
        this.user_id = user_id;
        this.access_token = access_token;
        this.entitlements_token = entitlements_token;
        this.national = national;

        this.config = {
            headers: {
                "X-Riot-Entitlements-JWT": this.entitlements_token,
                "Authorization": this.access_token
            }
        };
        this.APIURL = 'https://pd.' + this.national + '.a.pvp.net/';
    }

    async getDailyStore() {
        try {
            const use = "store/v2/storefront/";
            const response = await axios.get(this.APIURL+use, this.config);
            return response;
        } catch (error) {
            return error;
        }
      }

}

module.exports = ValorantChecker ;
