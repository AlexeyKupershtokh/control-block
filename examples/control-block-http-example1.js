request: function(options) {
	var future=new Future();
	
	var req=http.request(options, function(res) {
		var text='';
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			text+=chunk;
		});
		res.on('end', Block.guard(function() {
			future.resolve(new CouchResponse(res, text));
		}));
		res.on('error', Block.errorHandler());
	});
	req.on('error', Block.errorHandler());
	req.end();

	return future;
}
