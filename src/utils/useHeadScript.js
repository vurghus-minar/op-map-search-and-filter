import { useEffect } from 'react';

const useHeadScript = url => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.head.appendChild(script);

    }, [url]);
};

export default useHeadScript;