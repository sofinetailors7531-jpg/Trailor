import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const CustomerTable = ({ customers, onEdit, onDelete }) => {
    return (
        <div className="glass" style={styles.container}>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.thRow}>
                        <th style={styles.th}>User ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Mobile</th>
                        <th style={styles.th}>Shirt Size</th>
                        <th style={styles.th}>Pant Size</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c.id} style={styles.tr}>
                            <td style={styles.td}>{c.userId || c.id}</td>
                            <td style={styles.td}>{`${c.firstName} ${c.lastName}`}</td>
                            <td style={styles.td}>{c.mobile}</td>
                            <td style={styles.td}>{c.shirtSize}</td>
                            <td style={styles.td}>{c.pantSize}</td>
                            <td style={styles.td}>₹{c.price}</td>
                            <td style={styles.td}>
                                <div style={styles.actions}>
                                    <button onClick={() => onEdit(c)} style={styles.actionBtn}>
                                        <Edit2 size={16} color="var(--accent)" />
                                    </button>
                                    <button onClick={() => onDelete(c.id)} style={styles.actionBtn}>
                                        <Trash2 size={16} color="#ef4444" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan="7" style={styles.noData}>No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        borderRadius: '16px',
        overflow: 'hidden',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
    },
    thRow: {
        background: 'rgba(255, 255, 255, 0.05)',
    },
    th: {
        padding: '16px 20px',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        fontWeight: '600',
        borderBottom: '1px solid var(--border-color)',
    },
    tr: {
        borderBottom: '1px solid var(--border-color)',
        transition: 'var(--transition)',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.02)',
        }
    },
    td: {
        padding: '16px 20px',
        fontSize: '0.9rem',
    },
    actions: {
        display: 'flex',
        gap: '12px',
    },
    actionBtn: {
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '8px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noData: {
        padding: '40px',
        textAlign: 'center',
        color: 'var(--text-secondary)',
    }
};

export default CustomerTable;
