import React, { useState, useEffect } from 'react';
import { LogOut, Plus, User, Search } from 'lucide-react';
import CustomerTable from './CustomerTable';
import CustomerModal from './CustomerModal';

const Dashboard = ({ onLogout }) => {
    const [customers, setCustomers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/customers');
            const data = await res.json();
            setCustomers(data);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };

    const handleSave = async (customerData) => {
        const url = editingCustomer
            ? `http://localhost:5000/api/customers/${editingCustomer.id}`
            : 'http://localhost:5000/api/customers';
        const method = editingCustomer ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customerData)
            });
            if (res.ok) {
                fetchCustomers();
                setIsModalOpen(false);
                setEditingCustomer(null);
            }
        } catch (err) {
            console.error('Error saving customer:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                const res = await fetch(`http://localhost:5000/api/customers/${id}`, { method: 'DELETE' });
                if (res.ok) fetchCustomers();
            } catch (err) {
                console.error('Error deleting customer:', err);
            }
        }
    };

    const filteredCustomers = customers.filter(c => {
        const searchLow = searchTerm.toLowerCase();
        const fullName = `${c.firstName} ${c.middleName || ''} ${c.lastName}`.toLowerCase();
        const mobileMatch = c.mobile && c.mobile.toString().includes(searchLow);
        const userIdMatch = (c.userId || c.id).toString().toLowerCase().includes(searchLow);
        const nameMatch = fullName.includes(searchLow);

        return nameMatch || mobileMatch || userIdMatch;
    });

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            onLogout();
        }
    };

    return (
        <div style={styles.dashboard}>
            {/* Sidebar */}
            <aside style={styles.sidebar} className="glass">
                <div style={styles.logo}>Dashbord</div>
                <nav style={styles.nav}>
                    <div style={{ ...styles.navItem, ...styles.activeNavItem }}>
                        <User size={20} /> Customers
                    </div>
                </nav>
                <button onClick={handleLogoutClick} style={styles.logoutBtn}>
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                <header style={styles.header}>
                    <div style={styles.searchBox}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search by Name, Mobile, or ID..."
                            style={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn-primary"
                        style={styles.addBtn}
                        onClick={() => { setEditingCustomer(null); setIsModalOpen(true); }}
                    >
                        <Plus size={20} /> Create New Customer
                    </button>
                </header>

                <section style={styles.content}>
                    <CustomerTable
                        customers={filteredCustomers}
                        onEdit={(c) => { setEditingCustomer(c); setIsModalOpen(true); }}
                        onDelete={handleDelete}
                    />
                </section>
            </main>

            {isModalOpen && (
                <CustomerModal
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setEditingCustomer(null); }}
                    onSave={handleSave}
                    initialData={editingCustomer}
                    customers={customers} // Pass customers for unique ID check
                />
            )}
        </div>
    );
};

const styles = {
    dashboard: {
        display: 'flex',
        height: '100vh',
        background: 'var(--bg-dark)',
    },
    sidebar: {
        width: '260px',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-color)',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--accent)',
        marginBottom: '40px',
        paddingLeft: '10px',
    },
    nav: {
        flex: 1,
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '12px',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'var(--transition)',
    },
    activeNavItem: {
        background: 'rgba(45, 212, 191, 0.1)',
        color: 'var(--accent)',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'transparent',
        color: '#ef4444',
        padding: '12px 16px',
        marginTop: 'auto',
    },
    main: {
        flex: 1,
        padding: '30px 40px',
        overflowY: 'auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '12px',
        padding: '10px 16px',
        gap: '10px',
        width: '400px',
    },
    searchInput: {
        background: 'transparent',
        border: 'none',
        color: 'white',
        outline: 'none',
        width: '100%',
    },
    addBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
};

export default Dashboard;
