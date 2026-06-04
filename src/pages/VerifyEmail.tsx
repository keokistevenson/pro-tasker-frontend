import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

function VerifyEmail() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleVerify(e: React.FormEvent) {
        e.preventDefault();

        try {
            setError("");
            setMessage("");

            const response = await fetch(`${API_BASE_URL}/users/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Email verification failed.");
            }

            setMessage(data.message || "Email verified successfully.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Email verification failed.");
        }
    }

    async function handleResend() {
        try {
            setError("");
            setMessage("");

            const response = await fetch(`${API_BASE_URL}/users/resend-verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not resend verification code.");
            }

            setMessage(data.message || "A new verification code has been sent.");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Could not resend verification code."
            );
        }
    }

    return (
        <main>
            <h1>Verify Email</h1>
            <p>Enter the verification code sent to your email address.</p>

            {error && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}

            {message && <p className="success">{message}</p>}

            <form onSubmit={handleVerify}>
                <div>
                    <label htmlFor="verify-email">Email</label>
                    <input
                        id="verify-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="verification-code">Verification Code</label>
                    <input
                        id="verification-code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        maxLength={6}
                    />
                </div>

                <button type="submit">Verify Email</button>
                <button type="button" onClick={handleResend}>
                    Resend Code
                </button>
            </form>

            <p>
                Already verified? <Link to="/login">Log in</Link>
            </p>
        </main>
    );
}

export default VerifyEmail;