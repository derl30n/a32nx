class A32NX_MessageQueue {
    constructor(fmgc) {
        this._fmgc = fmgc;
        this._queue = [];
    }

    resetQueue() {
        this._queue = [];
    }

    addMessage(message) {
        if (message.isTypeTwo && this._tryAddToQueueOrUpdateQueuePosition(message.text)) {
            // Before adding message to queue, check other messages in queue for validity
            for (let i = 0; i < this._queue.length; i++) {
                if (this._queue[i].isResolved(this)) {
                    this._queue.splice(i, 1);
                }
            }
            this._queue.unshift(message);
            if (this._queue.length > 5) {
                this._queue.splice(5, 1);
            }
            this.updateDisplayedMessage();
        }
    }

    removeMessage(value) {
        for (let i = 0; i < this._queue.length; i++) {
            if (this._queue[i].text === value) {
                this._queue[i].onClear(this);
                this._queue.splice(i, 1);
                if (i === 0) {
                    // this._fmgc.mcdu.scratchpad.removeMessage(value);
                    this._fmgc.scratchpad.removeMessage(value);
                    this.updateDisplayedMessage();
                }
                break;
            }
        }
    }

    updateDisplayedMessage() {
        if (this._queue.length > 0) {
            const message = this._queue[0];
            if (message.isResolved(this)) {
                this._queue.splice(0, 1);
                return this.updateDisplayedMessage();
            }

            this._fmgc.setScratchpadMessage(message);
        }
    }

    _tryAddToQueueOrUpdateQueuePosition(value) {
        if (!value) {
            return false;
        }
        for (let i = 0; i < this._queue.length; i++) {
            if (this._queue[i].text === value) {
                if (i !== 0) {
                    this._queue.unshift(this.messageQueue[i]);
                    this._queue.splice(i + 1, 1);
                    this.updateDisplayedMessage();
                }
                return false;
            }
        }
        return true;
    }
}
