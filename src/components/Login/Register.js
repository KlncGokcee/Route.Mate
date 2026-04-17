import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        // Şifre kontrolü
        if (formData.password.length < 8) {
            setError('Şifre en az 8 karakter olmalıdır!');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor!');
            setIsLoading(false);
            return;
        }

        try {
            // Simüle edilmiş kayıt işlemi
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess('Kayıt işlemi başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
            // 2 saniye sonra giriş sayfasına yönlendir
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
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
                    <div className="card login-card register-card">
                        <div className="card-header text-center bg-mycolor text-white">
                            <h3><i className="fas fa-user-plus me-2"></i>Kayıt Ol</h3>
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
                                    <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="Kullanıcı adınızı girin"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-posta Adresi</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="E-posta adresinizi girin"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Şifre</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Şifrenizi girin"
                                            required
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Şifre Tekrar</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Şifrenizi tekrar girin"
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
                                                Kayıt Yapılıyor...
                                            </>
                                        ) : (
                                            'Kayıt Ol'
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

export default Register; 