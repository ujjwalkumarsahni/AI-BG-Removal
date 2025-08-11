import { useActionState} from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [credit, setCredit] = useState(null);

    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();

    const loadCreditsData = async () => {
        if (!isSignedIn) {
            toast.error("Please sign in to view credits");
            return;
        }

        try {
            // Clerk returns a signed JWT here
            const token = await getToken();

            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            if (data.success) {
                setCredit(data.credits);
                console.log("Credits:", data.credits);
            } else {
                toast.error(data.message || "Failed to load credits");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    

    const value = {
        credit,
        setCredit,
        loadCreditsData,
        backendUrl,
        isSignedIn,
        getToken,
        openSignIn,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
