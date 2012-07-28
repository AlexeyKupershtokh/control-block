try {
    process.nextTick(function() {
        throw new Error;
    });
} catch (err) {
    console.log('Exception caught:', err);
}