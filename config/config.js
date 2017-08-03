const fromFile = require('./fromFile.js')
const getSafely = require('safe-access')
const credentials = require('./credentials.js')

const config = {
    conversation: {
        credentials: function() {
    		return credentials.conversation()
    	},

    	workspaceId: function() {
    		return fromFile.conversation.workspaceId()
    	},
    },

	discovery: {
	    credentials: function() {
            return credentials.discovery()
        },

        collectionId: function() {
            return fromFile.discovery.collectionId()
        },

        environmentId: function() {
            return fromFile.discovery.environmentId()
        }
	},

	rnr: {
	    credentials: function() {
            return credentials.rnr()
        },

        collectionName: function() {
            return fromFile.rnr.collectionName()
        },

        solrClusterId: function() {
            return fromFile.rnr.solrClusterId()
        },

        rankerId: function() {
            return fromFile.rnr.rankerId()
        }
	}
};

module.exports = config;