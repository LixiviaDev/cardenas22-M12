/* Type script singleton implementation from https://refactoring.guru/es/design-patterns/singleton/typescript/example */

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class Singleton {
    protected static instance: Singleton;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
     protected constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    // /**
    //  * Any singleton should define some business logic, which can be
    //  * executed on its instance.
    //  */
    // public someBusinessLogic() {
    //     // ...
    // }
}