import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../styles/ViewAdminBalance.css';

const ViewAdminBalance: React.FC = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('BNB');

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
    };

    return (
        <div className="container mt-4">
            <div className="view-balance-container">
                <h1 className="text-center balance-amount">$ {selectedCurrency === 'BNB' ? '0.00' : '0.00'}</h1>
                
                <Form>
                    <Form.Group>
                        <Form.Label className="d-block text-center">Select Currency</Form.Label>
                        <select
                            value={selectedCurrency}
                            onChange={handleCurrencyChange}
                            className="custom-dropdown d-block mx-auto w-50"
                        >
                            <option value="BNB">BNB</option>
                            <option value="USDT">USDT</option>
                        </select>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default ViewAdminBalance;
