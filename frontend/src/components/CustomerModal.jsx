import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

const CustomerModal = ({ isOpen, onClose, onSave, initialData, customers }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        userId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        date: '',
        age: '',
        mobile: '',
        price: '',
        shirtSize: '',
        pantSize: '',
        address: ''
    });

    useEffect(() => {
        setError('');
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                userId: '',
                firstName: '',
                middleName: '',
                lastName: '',
                date: new Date().toISOString().split('T')[0],
                age: '',
                mobile: '',
                price: '',
                shirtSize: '',
                pantSize: '',
                address: ''
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mobile') {
            const cleaned = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: cleaned });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Unique ID check
        const isDuplicate = customers.some(c =>
            c.userId === formData.userId && (!initialData || c.id !== initialData.id)
        );

        if (isDuplicate) {
            setError('Error: This User ID already exists. Please use a unique ID.');
            return;
        }

        // Mobile validation
        if (formData.mobile.length !== 10) {
            setError('Error: Mobile number must be exactly 10 digits.');
            return;
        }

        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div className="glass animate-fade-in" style={styles.modal}>
                <div style={styles.header}>
                    <h2>{initialData ? 'Edit Customer' : 'Add New Customer'}</h2>
                    <button onClick={onClose} style={styles.closeBtn}><X size={24} /></button>
                </div>

                {error && <div style={styles.errorBanner}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.grid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>User ID (Unique)</label>
                            <input name="userId" value={formData.userId} onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>First Name</label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Middle Name</label>
                            <input name="middleName" value={formData.middleName} onChange={handleChange} style={styles.input} />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Last Name</label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Date</label>
                            <div style={styles.inputWrapper}>
                                <Calendar size={16} style={styles.inputIcon} />
                                <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.inputWithIcon} required />
                            </div>
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Age</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Mobile Number</label>
                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} style={styles.input} required />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Shirt Size</label>
                            <textarea name="shirtSize" value={formData.shirtSize} onChange={handleChange} style={styles.textarea} required />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Pant Size</label>
                            <textarea name="pantSize" value={formData.pantSize} onChange={handleChange} style={styles.textarea} required />
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Address</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} style={styles.textarea} required />
                    </div>
                    <div style={styles.footer}>
                        <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
                        <button type="submit" className="btn-primary" style={styles.submitBtn}>
                            {initialData ? 'Update Customer' : 'Add Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        width: '700px',
        padding: '30px',
        borderRadius: '24px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
    },
    errorBanner: {
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '0.9rem',
        marginBottom: '20px',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        fontWeight: '500',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    },
    closeBtn: {
        background: 'transparent',
        color: 'var(--text-secondary)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
    },
    input: {
        padding: '10px 14px',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--glass-border)',
        color: 'white',
        outline: 'none',
        width: '100%',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '12px',
        color: 'var(--text-secondary)',
        pointerEvents: 'none',
    },
    inputWithIcon: {
        padding: '10px 14px 10px 40px',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--glass-border)',
        color: 'white',
        outline: 'none',
        width: '100%',
        colorScheme: 'dark', // Ensures native calendar is dark-themed
    },
    textarea: {
        padding: '10px 14px',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--glass-border)',
        color: 'white',
        outline: 'none',
        minHeight: '80px',
        resize: 'vertical',
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '10px',
    },
    cancelBtn: {
        background: 'rgba(255, 255, 255, 0.05)',
        color: 'white',
        padding: '10px 20px',
    },
    submitBtn: {
        padding: '10px 24px',
    }
};

export default CustomerModal;
