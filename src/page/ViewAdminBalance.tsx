import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios, { AxiosError } from 'axios';  // Import AxiosError from axios
import '../styles/ViewAdminBalance.css';

const ViewAdminBalance: React.FC = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('BNB');
    const [balance, setBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Function to fetch balance from the API
    const fetchBalance = async () => {
        try {
            setLoading(true); // Set loading to true when starting the API call

            // Call the API to fetch balance
            const response = await axios.get('http://localhost/smartrainmakers/pages/viewadminbalance_GET.php'); // Ensure correct path

            console.log('API Response:', response.data);  // Log the API response for debugging

            // Handle the response
            if (response.data.status === 'success') {
                setBalance(parseFloat(response.data.total_balance)); // Set the balance from the response
            } else {
                setError('Failed to fetch balance: ' + response.data.message); // Set error message
            }
        } catch (error: unknown) {  // Explicitly type the error as `unknown`
            if (axios.isAxiosError(error)) {  // Check if the error is an AxiosError
                console.error('Error fetching balance:', error.response || error.message); // Log the error details
                setError('Error fetching balance. Please try again later.'); // Set error message
            } else {
                // If it's not an AxiosError, handle it differently (generic error)
                console.error('Unknown error:', error);
                setError('Error fetching balance. Please try again later.');
            }
        } finally {
            setLoading(false); // Set loading to false after the API call finishes
        }
    };

    // Fetch balance when the component mounts
    useEffect(() => {
        fetchBalance();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Handle currency selection change (dropdown is not tied to the API, just for UI)
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
    };

    return (
        <div className="container mt-4">
            <div className="view-balance-container">
                <h1 className="text-center balance-amount">
                    {loading ? (
                        <span>Loading...</span> // Show loading text while the API call is in progress
                    ) : error ? (
                        <span style={{ color: 'red' }}>{error}</span> // Show error message if fetching fails
                    ) : (
                        // Display the balance once data is loaded
                        `Balance: $ ${balance.toFixed(2)}`
                    )}
                </h1>

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
