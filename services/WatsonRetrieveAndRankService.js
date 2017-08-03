const RetrieveAndRankV1 = require('watson-developer-cloud/retrieve-and-rank/v1');
const config = require('../config/config.js')
const request = require('request');

const solrClusterId = config.rnr.solrClusterId()
const collectionName = config.rnr.collectionName()
const rankerId = config.rnr.rankerId()

const URL_BASE = 'https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/'
const URL_SOLR_CLUSTER = URL_BASE + 'solr_clusters/' + solrClusterId + '/'
const formattingParams = '&wt=json&fl=id,body'
const URL_SELECT =  URL_SOLR_CLUSTER + 'solr/' + collectionName + '/fcselect?ranker_id=' + rankerId + formattingParams

const credentials = config.rnr.credentials()

const WatsonRetrieveAndRankService = {
    query: function(query) {
        const url = URL_SELECT + '&q=' + encodeURI(query)

        return new Promise((resolve, reject) => {
                       request(url, function (error, response, body) {
                          resolve(JSON.parse(body)) })
                       .auth(credentials.username, credentials.password, false) })}}

module.exports = WatsonRetrieveAndRankService;