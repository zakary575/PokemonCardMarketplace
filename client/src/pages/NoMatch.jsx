import { useRouteError } from "react-router-dom";

const NoMatch = () => {
    const error = useRouteError()
    console.error(error)
    return (
        <div>
            <h1>404 Page Not Found</h1>
        </div>
    );
};

export default NoMatch;
