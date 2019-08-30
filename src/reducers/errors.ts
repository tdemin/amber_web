import Actions from "../actions/list";
import { ErrorAction } from "../typings/actions";

export interface ErrorState {
    error: boolean;
    text: string;
}

export const errorReducer = (
    state: ErrorState = {
        error: false,
        text: "",
    },
    action: ErrorAction
): ErrorState => {
    switch (action.type) {
        case Actions.Error:
            return {
                error: true,
                text: action.text,
            };
        case Actions.Success:
            return {
                error: false,
                text: "",
            };
        default:
            return state;
    }
};
