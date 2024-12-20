import UserService from "@/services/UserService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const UserLoginForm: React.FC = () => {
    const { t } = useTranslation("common");

    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);


    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!username || username.trim() === "") {
            setUsernameError("Username is required");
            result = false;
        }

        if (!password && password.trim() === "") {
            setPasswordError("Password is required");
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

        const user = { username, password };
        const response = await UserService.loginUser(user);

        if (response.status === 200) {
            setStatusMessages([{ message: `Login successful. Redirecting to homepage...`, type: "success" }]);

            const user = await response.json();
            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    token: user.token,
                    username: user.username,
                    role: user.role,
                })
            );


            setTimeout(() => {
                router.push("/");
            }, 2000);
        };
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
                            {t("Username")}:
                        </label>
                        <input
                            id="nameInput"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className={`form-control ${usernameError ? "is-invalid" : ""}`}
                        />
                        {usernameError && (
                            <div className="invalid-feedback">{usernameError}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label fw-semibold">
                            {t("Password")}:
                        </label>
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className={`form-control ${passwordError ? "is-invalid" : ""}`}
                        />
                        {usernameError && (
                            <div className="invalid-feedback">{passwordError}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">
                        {t("login.button")}
                    </button>
                </form>
            </div>
        </>
    );
};

export default UserLoginForm;
