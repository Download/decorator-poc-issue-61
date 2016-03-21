function universalDecorator(msg) {
	console.log('universalDecorator', msg);
	// handle invocation with parentheses
	// simulate default arguments
	if (msg === undefined) msg = 'Default message';
	return function(target) {
		target.msg = msg;
		return target;
	}
}
universalDecorator.call = function(ctx, target) {
	console.log('universalDecorator.call', ctx, target);
  // handle parentheses-less invocation
  return universalDecorator().call(ctx, target);
}


function testPoc() {
	// create a test subject
	var subject = {};

	// simulate decoration by factory invocation (with parentheses)
	universalDecorator('my message')(subject);
	console.assert(subject.msg == 'my message');

	// simulate no-arg decoration by factory invocation (with parentheses)
	universalDecorator()(subject);
	console.assert(subject.msg == 'Default message');

	// simulate no-arg decoration by decorator invocation (without parentheses)
	universalDecorator.call(undefined, subject);  // <== This is all we need. !!!
	// If the runtime calls the decorators via `.call` i.s.o directly, we can trap
	// the invocation and do whatever we want there. It enables userland code to
	// deal with the factory/decorator choice *without duck typing*
	console.assert(subject.msg == 'Default message');
}