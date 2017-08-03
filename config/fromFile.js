const fs = require('fs')
const getSafely = require('safe-access')

var configJson = null

const CONFIG_JSON_FILE = './config/config.json'

try {
	configJson = JSON.parse(fs.readFileSync(CONFIG_JSON_FILE).toString())
} catch(e) {
	console.info('Could not load config.json file. Trying to get config from other place')
}

const fromFile = {
	conversation: {
	    workspaceId: function() {
	        return configJson && configJson.watsonConversation.workspaceId
	    }
	},

	discovery: {
	    collectionId: function() {
            return configJson && configJson.watsonDiscovery.collectionId
	    },

	    environmentId: function() {
            return configJson && configJson.watsonDiscovery.environmentId
	    }
	},

	rnr: {
        collectionName: function() {
            return configJson && configJson.watsonRetreiveAndRank.collectionName
        },

        solrClusterId: function() {
            return configJson && configJson.watsonRetreiveAndRank.solrClusterId
        },

        rankerId: function() {
            return configJson && configJson.watsonRetreiveAndRank.rankerId
        }
	}
}

module.exports = fromFile