function handleUserAgent(req, res, next) {
	return Block.begin(process, next);
	
	function process() {
		return jsonifyRequest(req).force(withRequest);	
	}
	
	function withRequest(requestObj) {
		var r=validators.UserAgentRecord(requestObj, {fix:true});
		if (!r.valid) {
			res.writeHead(400);
			return res.end('Invalid request object: ' + r.reason);
		}
		
		var uar=r.object;
		if (uar.token) {
			// Verify
			//return handler.verifyUserAgent(uar);
			throw new Error('verifyUserAgent not yet implemented');
		} else {
			// Create
			uar.token=null;
			uar.type='auth';	// TODO: Maybe support unauth in the future?
			return handler.createUserAgent(uar).force(withUserAgent);
		}
	}
	
	function withUserAgent(userAgent) {
		var r=validators.UserAgentRecord(userAgent, {fix:true});
		return respondJson(r.object, res);
	}
}
