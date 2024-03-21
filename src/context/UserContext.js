import {
    createContext,
    useContext,
    useReducer,
} from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        UserId: "null",
        user: {},
    };

    const UserReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    UserId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    return (
        <UserContext.Provider value={{ data: state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
