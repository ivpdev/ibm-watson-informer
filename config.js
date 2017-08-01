const fs = require('fs')

var configJson = null

try {
	configJson = JSON.parse(fs.readFileSync('./config.json').toString())
} catch(e) {
	console.info('Could not load config.json file. Trying to get config from other place')
}

const defaultCredentials = {
    username: 'a',
    password: 'b'
}

const fromConfigJson = {
	conversation: {
	    credentials: function() {
	        return configJson && configJson.watsonConversation.credentials
	    },

	    workspaceId: function() {
	        return configJson && configJson.watsonConversation.workspaceId
	    }
	},

	discovery: {
	    credentials: function() {
            return configJson && configJson.watsonDiscovery.credentials
        },

	    collectionId: function() {
            return configJson && configJson.watsonDiscovery.collectionId
	    },

	    environmentId: function() {
            return configJson && configJson.watsonDiscovery.environmentId
	    }
	},

	rnr: {
	    credentials() {
            return configJson && configJson.watsonRetreiveAndRank.credentials
        },

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

let fromBluemixEnv = {
    conversation: {
        credentials: function() {
            console.log('! process.env.VCAP_SERVICES')
            console.log(process.env.VCAP_SERVICES)

            return defaultCredentials
        },

        workspaceId: function() {
            return null
        }

    },

    discovery: {

    },

    rnr: {

    }

}

let config = {
    conversation: {
        credentials: function() {
    		return fromConfigJson.conversation.credentials() || fromBluemixEnv.conversation.credentials()
    	},

    	workspaceId: function() {
    		return fromConfigJson.conversation.workspaceId() || fromConfigJson.conversation.workspaceId()
    	},
    },

	discovery: {
	    credentials: function() {
            return fromConfigJson.discovery.credentials() || defaultCredentials
        },

        collectionId: function() {
            return fromConfigJson.discovery.collectionId()
        },

        environmentId: function() {
            return fromConfigJson.discovery.environmentId()
        }
	},

	rnr: {
	    credentials: function() {
            return fromConfigJson.rnr.credentials() || defaultCredentials
        },

        collectionName: function() {
            return fromConfigJson.rnr.collectionName()
        },

        solrClusterId: function() {
            return fromConfigJson.rnr.solrClusterId()
        },

        rankerId: function() {
            return fromConfigJson.rnr.rankerId()
        }
	}
};


module.exports = config;