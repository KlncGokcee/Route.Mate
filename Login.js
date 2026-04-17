import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Simüle edilmiş giriş işlemi
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (formData.password !== "12345678") {
                setError('Hatalı kullanıcı adı veya şifre!');
            } else {
                // Başarılı giriş işlemleri burada yapılacak
                console.log('Giriş başarılı!');
            }
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
                    <div className="card login-card">
                        <div className="card-header text-center bg-mycolor text-white">
                            <h3><i className="fas fa-user-circle me-2"></i>Giriş Yap</h3>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger mb-3">{error}</div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Kullanıcı Adı veya E-posta</label>
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
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">Beni hatırla</label>
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
                                                Giriş Yapılıyor...
                                            </>
                                        ) : (
                                            'Giriş Yap'
                                        )}
                                    </button>
                                </div>
                            </form>
                            <div className="mt-3 text-center">
                                <Link to="/sifremi-unuttum" className="text-decoration-none text-black">
                                    Şifremi Unuttum?
                                </Link>
                                <div className="mt-2">
                                    <Link to="/kayit-ol" className="text-decoration-none text-black">
                                        Kayıt Olun
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <p>Bizi takip edin</p>
                <a href="#" className="btn btn-social mx-1" style={{backgroundColor: '#3b5998'}}>
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="btn btn-social mx-1" style={{backgroundColor: '#1da1f2'}}>
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="btn btn-social mx-1" style={{backgroundColor: '#405de6'}}>
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="btn btn-social mx-1" style={{backgroundColor: '#ff0000'}}>
                    <i className="fab fa-youtube"></i>
                </a>
            </div>
        </div>
    );
};

export default Login; 