import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Login.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            // Simüle edilmiş şifre sıfırlama işlemi
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 col-lg-4">
                    <div className="card login-card forgot-password-card">
                        <div className="card-header text-center bg-mycolor text-white">
                            <h3><i className="fas fa-key me-2"></i>Şifremi Unuttum</h3>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger mb-3">{error}</div>
                            )}
                            {success && (
                                <div className="alert alert-success mb-3">{success}</div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-posta Adresi</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="E-posta adresinizi girin"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Gönderiliyor...
                                            </>
                                        ) : (
                                            'Şifre Sıfırlama Bağlantısı Gönder'
                                        )}
                                    </button>
                                </div>
                            </form>
                            <div className="mt-3 text-center">
                                <Link to="/" className="text-decoration-none text-black">
                                    Giriş Sayfasına Dön
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 