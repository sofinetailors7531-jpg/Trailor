import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <div className="login-page" style={styles.container}>
            <div className="glass login-card animate-fade-in" style={styles.card}>
                <h1 style={styles.title}>Login</h1>
                <p style={styles.subtitle}>Elegance in every stitch</p>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            style={styles.input}
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            style={styles.input}
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, #1a1a1f 0%, #0a0a0c 100%)',
    },
    card: {
        width: '400px',
        padding: '40px',
        borderRadius: '24px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '8px',
        color: '#00ffee', /* Vibrant Neon Teal */
        letterSpacing: '-1px',
        textShadow: '0 0 20px rgba(0, 255, 238, 0.4)',
    },
    subtitle: {
        color: 'var(--text-secondary)',
        marginBottom: '32px',
        fontSize: '0.9rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        textAlign: 'left',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
    },
    input: {
        padding: '12px 16px',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--glass-border)',
        color: 'white',
        outline: 'none',
        transition: 'var(--transition)',
    },
    button: {
        marginTop: '10px',
        padding: '14px',
        fontSize: '1rem',
    }
};

export default Login;
