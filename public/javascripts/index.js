let history = [];

let $messageHistory = $('#history')
let $input = $('#youSay');

var context = null;

function sendMessage(msg) {
	return $.post('chat', {
		message: msg,
		context: JSON.stringify(context)
	});
}

function renderHistory(history) {
	let result = ''
	history.forEach(msg => {
		let msgHtml = ''
		if (msg.author === 'Watson') {
			result += '<li class="msg-from-watson"><b>Watson:</b> ' + msg.text + '</li>' 
		} else {
			result += '<li class="msg-from-user"><b>You:</b> ' + msg.text + '</li>' 
		}
	})

	return result;
}

function updateHistoryHtml() {
	var historyHtml = renderHistory(history)

	$messageHistory.html(historyHtml)
}

function addToHistory(entry) {
    history.push(entry)
    updateHistoryHtml()
}


$('#youSay').on('keydown', function(e) {
	if (e.originalEvent.key==='Enter') {
		
		let msg = $input.val();

        addToHistory({
            author: 'user',
            text: msg
        })

		$input.val('');

		sendMessage(msg).then(function(response) {
		    addToHistory({
                author: 'Watson',
                text: response.text
            })

            context = response.context
		});
	}
});


