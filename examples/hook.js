var Block = require('..').Block;

function blackBox() {
    process.nextTick(function() {
        setTimeout(function() {
            throw new Error;
        }, 1);
    });
}

Block.begin(function() {
    blackBox();
}, function(err) {
    console.log('YAY! The exception is caught:', err);
});