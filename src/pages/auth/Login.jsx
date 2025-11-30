import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/forms/InputField";
import Button from "../../components/ui/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Utiliser authService quand l'API sera prête
    if (email && password) {
      localStorage.setItem("token", "mock-token");
      navigate("/dashboard");
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200/90">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
