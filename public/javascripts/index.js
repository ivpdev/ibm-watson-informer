let history = [];

let $watsonSays = $('#watsonSays')
let $messageHistory = $('#history')
let $input = $('#youSay');

function sendMessage(msg) {
	return $.post('chat', {
		message: msg
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



$('#youSay').on('keydown', function(e) {
	if (e.originalEvent.key==='Enter') {
		
		let msg = $input.val();

		history.push({
			author: 'user',
			text: msg
		})

		updateHistoryHtml()

		$input.val('');

		sendMessage(msg).then(function(watsonResponse) {
			history.push({
				author: 'Watson',
				text: watsonResponse
			})

			updateHistoryHtml()


			//$watsonSays.html(watsonResponse);
		});
	}
});


