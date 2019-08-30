import { AuthState } from "../reducers/auth";
import { ErrorState } from "../reducers/errors";

export interface Store {
    auth: AuthState;
    errors: ErrorState;
}
