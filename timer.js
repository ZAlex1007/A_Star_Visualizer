let Timer = function(callback, delay) {
    let timerId, start;
    this.remaining=delay

    this.pause = function() {
        window.clearTimeout(timerId);
        timerId = null;
        this.remaining -= Date.now() - start;
    };

    this.resume = function() {
        if (timerId) {
            return;
        }

        start = Date.now();
        timerId = window.setTimeout(callback, this.remaining);
    };

    this.resume();
};