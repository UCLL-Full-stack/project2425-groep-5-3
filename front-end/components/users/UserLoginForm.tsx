import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        //reset errors and status messages
        setUsernameError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!username || username.trim() === "") {
            // set error here
            setUsernameError("Username is required");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        setStatusMessages([{ message: `Login successful. Redirecting to homepage...`, type: "success" }]);

        sessionStorage.setItem("loggedInUser", username);

        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    return (
        <>
            <div className="container mt-5 p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "400px" }}>
                <h3 className="text-center mb-4 fw-bold text-primary">Login</h3>

                {statusMessages && (
                    <div className="mb-3">
                        <ul className="list-unstyled text-center">
                            {statusMessages.map(({ message, type }, index) => (
                                <li
                                    key={index}
                                    className={classNames("fw-semibold", {
                                        "text-danger": type === "error",
                                        "text-success": type === "success",
                                    })}
                                >
                                    {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label fw-semibold">
                            Username:
                        </label>
                        <input
                            id="nameInput"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className={`form-control ${usernameError ? "is-invalid" : ""}`}
                            placeholder="Enter your username"
                        />
                        {usernameError && (
                            <div className="invalid-feedback">{usernameError}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default UserLoginForm;
