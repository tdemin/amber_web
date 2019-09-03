export interface TaskRecord {
    id?: number;
    parent_id?: number;
    text?: string;
    status: number;
    last_mod?: number;
    /** TODO: Not implemented yet. */
    deadline?: number;
    /** TODO: Not implemented yet. */
    reminder?: number;
}

export class Task {
    ID: number;
    PID: number;
    Text: string;
    Completed: boolean;
    LastMod: number;
    /** Informational field for tasks that have been created offline, those are
     * to be pushed to the server at the next sync. */
    ToSync: boolean;
    /** Informational field for tasks that have been removed while offline.
     * These are still kept in the storage, and are purged on next sync, yet
     * are not displayed on the screen. */
    ToRemove: boolean;
    constructor() {
        this.ID = 0;
        this.PID = 0;
        this.Text = "";
        this.Completed = false;
        this.LastMod = Date.now();
        this.ToSync = false;
        this.ToRemove = false;
    }
    updateLastMod = () => (this.LastMod = Date.now());
    setID = (ID: number) => (this.ID = ID);
    setPID = (PID: number) => {
        this.PID = PID;
        this.updateLastMod();
    };
    setText = (text: string) => {
        this.Text = text;
        this.updateLastMod();
    };
    setCompleted = (status: boolean) => {
        this.Completed = status;
        this.updateLastMod();
    };
}
