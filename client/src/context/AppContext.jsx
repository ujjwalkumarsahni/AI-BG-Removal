import { useActionState, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [credit, setCredit] = useState(null);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);
    const [processType, setProcessType] = useState('remove-bg');
    const navigate = useNavigate();

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

    const removeBg = async (image) => {
        try {
            if (!isSignedIn) {
                return openSignIn()
            }
            setProcessType("remove-bg");
            setImage(image);
            setResultImage(false)

            navigate('/result')

            const token = await getToken()
            const formData = new FormData()
            if (image) formData.append('image', image);

            const { data } = await axios.post(
                `${backendUrl}/api/image/remove-bg`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ send as Authorization
                    },
                }
            );

            if (data.success) {
                setResultImage(data.resultImage)
                data.creditBalance && setCredit(data.creditBalance)
            } else {
                toast.error(data.message)
                data.creditBalance && setCredit(data.creditBalance)
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    const removeText = async (image) => {
        try {
            if (!isSignedIn) {
                return openSignIn()
            }
            setProcessType("remove-text");
            setImage(image);
            setResultImage(false)

            navigate('/result')

            const token = await getToken()
            const formData = new FormData()
            if (image) formData.append('image', image);

            const { data } = await axios.post(
                `${backendUrl}/api/image/remove-text`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ send as Authorization
                    },
                }
            );

            if (data.success) {
                setResultImage(data.resultImage)
                data.creditBalance && setCredit(data.creditBalance)
            } else {
                toast.error(data.message)
                data.creditBalance && setCredit(data.creditBalance)
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    const reimagine = async (image) => {
        try {
            if (!isSignedIn) {
                return openSignIn()
            }
            setProcessType("reimagine");
            setImage(image);
            setResultImage(false)

            navigate('/result')

            const token = await getToken()
            const formData = new FormData()
            if (image) formData.append('image', image);

            const { data } = await axios.post(
                `${backendUrl}/api/image/reimagine`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ send as Authorization
                    },
                }
            );

            if (data.success) {
                setResultImage(data.resultImage)
                data.creditBalance && setCredit(data.creditBalance)
            } else {
                toast.error(data.message)
                data.creditBalance && setCredit(data.creditBalance)
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    

    const value = {
        credit,
        setCredit,
        loadCreditsData,
        backendUrl,
        isSignedIn,
        getToken,
        openSignIn,
        removeBg,
        removeText,
        reimagine,
        resultImage,
        image,
        setProcessType,
        processType
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
