var Block = require('..').Block;

Block.begin(function() {
    process.nextTick(Block.guard(function() {
        throw new Error;
    }));
}, function(err) {
    console.log('Exception caught:', err);
});