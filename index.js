class Subject {
    #subscribers = [];

    subscribe(observer) {
        if (typeof observer === 'function' || 'next' in observer) {
            this.#subscribers.push(observer);

            return {
                unsubscribe: () => {
                    this.unsubscribe.call(this, observer);
                }
            };
        }

        throw Error('Invalid type of observer');
    }

    next(value) {
        for (const observer of this.#subscribers) {
            if ('next' in observer) {
                observer.next(value);
            } else {
                observer(value);
            }
        }
    }

    unsubscribe(observer) {
        const index = this.#subscribers.indexOf(observer);
        this.#subscribers.splice(index, 1);
    }

    log() {
        console.log(this.#subscribers);
    }
}

const observerFn1 = (v) => console.log('observerFn1 ', v);
const observerFn2 = (v) => console.log('observerFn2 ', v);

const observerObj1 = {
    next: (v) => console.log('observerObj1 ',v )
};

const observerObj2 = {
    next: (v) => console.log('observerObj2 ',v )
};

const count = new Subject();

count.subscribe(observerFn1);
const sub = count.subscribe(observerFn2);

count.subscribe(observerObj1);
count.subscribe(observerObj2);

count.next(1);
count.log();

sub.unsubscribe();
count.log();
count.next(1);

