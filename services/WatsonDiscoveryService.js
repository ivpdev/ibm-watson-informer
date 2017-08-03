let DiscoveryV1 = require('watson-developer-cloud/discovery/v1')
let config = require('../config/config.js')

let credentials = config.discovery.credentials()
let collectionId = config.discovery.collectionId()
let environmentId = config.discovery.environmentId()

var discovery = new DiscoveryV1({
  username: credentials.username,
  password: credentials.password,
  version_date: DiscoveryV1.VERSION_DATE_2017_04_27
});

let WatsonDiscoveryService = {
    getSoftwareUsedWithWatson: function() {
        return new Promise((resolve, reject) => {
                discovery.query({
                       environment_id: environmentId,
                       collection_id: collectionId,
                       aggregation: 'term(enriched_Title.entities.text,count:100)',
                       filter: 'enriched_Title.entities.type:"Technology"'
                       //query: ''
                     }, function(err, response) {
                           if (err) {
                             console.error(err)
                           } else {
                             resolve(response.aggregations[0].results.map(a => a.key).join(',')) }})});}}

module.exports = WatsonDiscoveryService;